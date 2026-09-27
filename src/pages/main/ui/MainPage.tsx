import { View } from 'react-native'
import MapView, { LatLng, MapPressEvent, Marker, PoiClickEvent } from 'react-native-maps'

function MainPage() {
    const handlePress = ({ nativeEvent }: MapPressEvent) => {
        const { action } = nativeEvent
        if (action === 'marker-press') {
            onMarkerClcik()
        } else if (action === 'press') {
            onEmptyClick(nativeEvent.coordinate)
        } else {
            throw new Error('500 map press action type error')
        }
    }
    const handlePoiClick = (e: PoiClickEvent) => {
        onEmptyClick(e.nativeEvent.coordinate)
    }
    const onEmptyClick = (coordinate: LatLng) => {
        console.log('Empty click', coordinate)
    }
    const onMarkerClcik = () => {
        console.log('마커 클릭!!! TODO')
    }
    return (
        <View style={{ flex: 1 }}>
            <MapView
                provider="google"
                style={{ flex: 1 }}
                googleMapId="a08ebbcb736da7887a8bac93"
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={handlePress}
                onPoiClick={handlePoiClick}
            >
                <Marker
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                ></Marker>
            </MapView>
        </View>
    )
}

export default MainPage
// AIzaSyAw4IkKFbfxu5v1E21zUOKqA0yPbfeH45U
