/**
 * https://www.npmjs.com/package/@react-native-community/geolocation#watchposition
 */
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useRef, useState } from 'react'
import { Alert, Linking, Pressable, StyleSheet, Text, View } from 'react-native'
import { RadioTower } from 'lucide-react-native/icons'
import type { Place } from '../model/types'
import PlaceBoardItem from './PlaceBoardItem'
import { getPlaceList } from '../model/place'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import Geolocation from '@react-native-community/geolocation'

type PlaceBoardProps = {
    onPressPlace?: (place: Place) => void
}

function PlaceBoard({ onPressPlace }: PlaceBoardProps) {
    const bottomSheetRef = useRef<BottomSheet>(null)
    const [placeList, setPlaceList] = useState<Place[]>([])

    useFocusEffect(
        // 렌더링 이슈로 useCallback 으로 줘야 한다함
        useCallback(() => {
            getPlaceList().then(setPlaceList)
        }, []),
    )

    const [isTracking, setIsTracking] = useState<boolean>(false)
    const activePlaceCount = placeList.filter(place => place.isEnabled).length
    const canStartTracking = activePlaceCount > 0

    const watchIdRef = useRef<number | null>(null)

    const handleTracking = async () => {
        if (!canStartTracking) return

        // 이미 추적 중 일 경우
        if (isTracking) {
            setIsTracking(false)
            if (watchIdRef.current) {
                Geolocation.clearWatch(watchIdRef.current)
            }

            return
        }

        const watchId = Geolocation.watchPosition(
            response => {
                console.log(response)
            },
            error => {
                Alert.alert('위치 권한이 필요해요', '장소 진입을 확인하려면 설정에서 위치 권한을 허용해 주세요.', [
                    { text: '취소', style: 'cancel' },
                    { text: '설정 열기', onPress: () => void Linking.openSettings() },
                ])
                Geolocation.clearWatch(watchId)
                return
            },
            {
                distanceFilter: 1, // distanceFilter(m) - 이전 위치에서 이 거리를 초과하면 새 위치를 반환합니다. 위치를 필터링하지 않으려면 0으로 설정하십시오. 기본값은 100m입니다.
            },
        )

        console.log('Watch ID' + watchId)
        if (!watchId) {
            throw new Error('Runtime Error Watch Id null error')
        }

        watchIdRef.current = watchId
        setIsTracking(true)
    }

    return (
        <BottomSheet ref={bottomSheetRef} index={0} snapPoints={['20%', '45%', '80%']}>
            <BottomSheetView style={styles.contentContainer}>
                <View style={[styles.trackingCard, isTracking && styles.trackingCardActive]}>
                    <View style={[styles.trackingIcon, isTracking && styles.trackingIconActive]}>
                        <RadioTower color={isTracking ? '#FFFFFF' : '#16845B'} size={22} strokeWidth={2.2} />
                    </View>

                    <View style={styles.trackingCopy}>
                        <View style={styles.trackingTitleRow}>
                            {isTracking && <View style={styles.statusDot} />}
                            <Text style={styles.trackingTitle}>{isTracking ? '장소 추적 중' : '장소 추적'}</Text>
                        </View>
                        <Text numberOfLines={1} style={styles.trackingDescription}>
                            {isTracking
                                ? `${activePlaceCount}개 장소의 진입을 확인하고 있어요`
                                : canStartTracking
                                ? `${activePlaceCount}개 장소를 백그라운드에서 확인해요`
                                : '알림이 켜진 장소를 먼저 등록해 주세요'}
                        </Text>
                    </View>

                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={isTracking ? '장소 추적 종료' : '장소 추적 시작'}
                        accessibilityState={{ disabled: !canStartTracking }}
                        disabled={!canStartTracking}
                        onPress={handleTracking}
                        style={({ pressed }) => [
                            styles.trackingButton,
                            isTracking && styles.trackingButtonStop,
                            !canStartTracking && styles.trackingButtonDisabled,
                            pressed && styles.trackingButtonPressed,
                        ]}
                    >
                        <Text style={[styles.trackingButtonText, isTracking && styles.trackingButtonStopText]}>
                            {isTracking ? '추적 종료' : '추적 시작'}
                        </Text>
                    </Pressable>
                </View>
                <View style={styles.placeContent}>
                    {placeList.length > 0 ? (
                        <View style={styles.list}>
                            {placeList.map(place => (
                                <PlaceBoardItem key={place.id} place={place} onPress={onPressPlace} />
                            ))}
                        </View>
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyTitle}>등록된 장소가 없어요</Text>
                            <Text style={styles.emptyDescription}>지도에서 알림을 받을 장소를 추가해 보세요.</Text>
                        </View>
                    )}
                </View>
            </BottomSheetView>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 8,
    },
    trackingCard: {
        minHeight: 82,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 14,
        paddingVertical: 13,
        borderWidth: 1,
        borderColor: '#DDE9E2',
        borderRadius: 20,
        backgroundColor: '#F4FAF7',
    },
    trackingCardActive: {
        borderColor: '#A7D5BF',
        backgroundColor: '#ECF8F1',
    },
    trackingIcon: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        backgroundColor: '#DDF1E6',
    },
    trackingIconActive: {
        backgroundColor: '#16845B',
    },
    trackingCopy: {
        flex: 1,
        minWidth: 0,
    },
    trackingTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statusDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: '#20A66A',
    },
    trackingTitle: {
        color: '#18211D',
        fontSize: 14,
        fontWeight: '800',
    },
    trackingDescription: {
        marginTop: 5,
        color: '#64736C',
        fontSize: 11,
    },
    trackingButton: {
        minWidth: 78,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        borderRadius: 12,
        backgroundColor: '#16845B',
    },
    trackingButtonStop: {
        borderWidth: 1,
        borderColor: '#D8E1DC',
        backgroundColor: '#FFFFFF',
    },
    trackingButtonDisabled: {
        backgroundColor: '#C7CECA',
    },
    trackingButtonPressed: {
        opacity: 0.72,
        transform: [{ translateY: 1 }],
    },
    trackingButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '800',
    },
    trackingButtonStopText: {
        color: '#59655F',
    },
    placeContent: {
        marginTop: 12,
    },
    list: {
        gap: 11,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 48,
    },
    emptyTitle: {
        color: '#18211D',
        fontSize: 16,
        fontWeight: '700',
    },
    emptyDescription: {
        marginTop: 8,
        color: '#718079',
        fontSize: 13,
        textAlign: 'center',
    },
})

export type { PlaceBoardProps }
export default PlaceBoard
