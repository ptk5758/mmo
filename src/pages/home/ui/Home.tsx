import { StyleSheet, View } from 'react-native'
import { getPlaceList, Place, PlaceBoard } from '../../../features/place'
import { PlaceMap } from '../../../features/place-map'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Region } from 'react-native-maps'
import { useFocusEffect } from '@react-navigation/native'

function Home() {
    /**
     * 선택 장소
     */
    const [place, setPlace] = useState<Place | null>(null)
    const [placeList, setPlaceList] = useState<Place[]>([])

    const handlePlace = (place: Place) => {
        setPlace(place)
    }

    const region = useMemo<Region | undefined>(() => {
        if (!place) {
            return
        }
        // TODO : latitudeDelta 계산 해서 넣기?
        return { ...place.coordinate, latitudeDelta: 0.01, longitudeDelta: 0.01 }
    }, [place])

    useFocusEffect(
        useCallback(() => {
            getPlaceList()
                .then(setPlaceList)
                .catch(e => {
                    console.error(e)
                    setPlaceList([])
                })
        }, []),
    )

    return (
        <View style={styles.container}>
            <PlaceMap region={region} placeList={placeList} />
            <PlaceBoard onPressPlace={handlePlace} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
})

export default Home
