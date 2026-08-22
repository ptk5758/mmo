import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { MapPinPlus, X } from 'lucide-react-native/icons'
import MapView, { MapPressEvent, Marker, Region } from 'react-native-maps'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../app'
import { Coordinate } from '../../../shared/model/types'
/**
 * 기본 지도 초기화 장소
 * 울산 시청 좌표
 */
const DEFAULT_MAP_REGION: Region = {
    latitude: 35.5389435,
    latitudeDelta: 0.01, // zoom 관련
    longitude: 129.3119449,
    longitudeDelta: 0.01, // zoom 관련
}

interface Place {
    title: string
    description?: string
    coordinate: Coordinate
}

interface PlaceMapProps {
    onPressRegister?: (place: Place) => void
}

function PlaceMap({ onPressRegister }: PlaceMapProps) {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const [target, setTarget] = useState<Place | null>(null)
    const [placeList, setPlaceList] = useState<Place[]>([])
    const insets = useSafeAreaInsets()

    const handleMapClick = (e: MapPressEvent) => {
        const { coordinate } = e.nativeEvent
        setTarget({ title: '선택한 장소', coordinate })
    }

    const handleCancel = () => setTarget(null)

    const handleRegister = () => {
        if (!target) return

        onPressRegister?.(target)

        navigation.navigate('placeForm', { coordinate: target.coordinate })
    }

    const isTargetSelected = target !== null

    return (
        <View style={styles.container}>
            <MapView style={styles.map} onPress={handleMapClick} initialRegion={DEFAULT_MAP_REGION}>
                {placeList.map((place, index) => {
                    return (
                        <Marker
                            key={index}
                            title={place.title}
                            description={place.description}
                            coordinate={place.coordinate}
                            stopPropagation={true}
                        />
                    )
                })}
                {target && <Marker title={target.title} coordinate={target.coordinate} stopPropagation={true} />}
            </MapView>

            <View pointerEvents="box-none" style={[styles.actionLayer, { top: insets.top + 12 }]}>
                <View style={[styles.actionGroup, !isTargetSelected && styles.actionGroupDisabled]}>
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="선택한 장소 취소"
                        disabled={!isTargetSelected}
                        hitSlop={8}
                        onPress={handleCancel}
                        style={({ pressed }) => [styles.cancelAction, pressed && styles.actionPressed]}
                    >
                        <X color="#65736C" size={18} strokeWidth={2.2} />
                        <Text style={styles.cancelActionText}>취소</Text>
                    </Pressable>

                    <View style={styles.divider} />

                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="선택한 장소 등록"
                        disabled={!isTargetSelected}
                        hitSlop={8}
                        onPress={handleRegister}
                        style={({ pressed }) => [styles.registerAction, pressed && styles.actionPressed]}
                    >
                        <MapPinPlus color="#FFFFFF" size={18} strokeWidth={2.2} />
                        <Text style={styles.registerActionText}>장소 등록</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    actionLayer: {
        position: 'absolute',
        right: 16,
        zIndex: 2,
        elevation: 5,
    },
    actionGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 46,
        overflow: 'hidden',
        borderRadius: 23,
        backgroundColor: '#FFFFFF',
        shadowColor: '#243D31',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.16,
        shadowRadius: 7,
    },
    actionGroupDisabled: {
        opacity: 0.38,
    },
    actionPressed: {
        opacity: 0.75,
    },
    cancelAction: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 14,
    },
    cancelActionText: {
        color: '#65736C',
        fontSize: 13,
        fontWeight: '700',
    },
    divider: {
        width: 1,
        height: 22,
        backgroundColor: '#E6E9E5',
    },
    registerAction: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 16,
        backgroundColor: '#16845B',
    },
    registerActionText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '700',
    },
    map: {
        flex: 1,
    },
})
export default PlaceMap

/**
 * 
 *  e.nativeEvent
 * ```json {
    "coordinate": {
        "latitude": 35.191055824605236,
        "longitude": 128.5893055853238
    },
    "position": {
        "x": 231,
        "y": 382
    },
    "action": "press",
    "target": 14,
    "timeStamp": 178129228.861125
}
    ```
 */
