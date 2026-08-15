import { StyleSheet, View } from 'react-native'
import MapView, { MapPressEvent, Marker, Region } from 'react-native-maps'
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

function PlaceMap() {
    const handleMapClick = (e: MapPressEvent) => {
        const { coordinate } = e.nativeEvent
    }
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                onPress={handleMapClick}
                initialRegion={DEFAULT_MAP_REGION}
            >
                <Marker
                    title='울산_시청'
                    description='울산_시청_설명'
                    coordinate={{
                        latitude: 35.5389435,
                        longitude: 129.3119449,
                    }}
                />
            </MapView>
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
