import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BottomSheet } from '../../../shared/ui/bottom-sheet'
import type { Place } from '../model/types'
import PlaceBoardItem from './PlaceBoardItem'
import { getPlaceList } from '../model/place'

type PlaceBoardProps = {
    onPressPlace?: (place: Place) => void
    onPressViewAll?: () => void
}

function PlaceBoard({ onPressPlace, onPressViewAll }: PlaceBoardProps) {
    const [placeList, setPlaceList] = useState<Place[]>([])

    useFocusEffect(
        // 렌더링 이슈로 useCallback 으로 줘야 한다함
        useCallback(() => {
            getPlaceList().then(setPlaceList)
        }, []),
    )

    return (
        <BottomSheet title="내 장소" count={placeList.length} onPressViewAll={onPressViewAll}>
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
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
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
