import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StyleSheet, Text, View } from 'react-native'
import { RootStackParamList } from '../../../app'
import MapView, { Marker } from 'react-native-maps'

type PlaceFormProps = NativeStackScreenProps<RootStackParamList, 'placeForm'>

function PlaceForm({ route }: PlaceFormProps) {
    const { coordinate } = route.params
    return (
        <View style={styles.page}>
            <View style={styles.location}>
                <MapView
                    style={styles.locationMap}
                    initialRegion={{
                        ...coordinate,
                        latitudeDelta: 0.005, // zoom 관련
                        longitudeDelta: 0.005, // zoom 관련
                    }}
                    zoomEnabled={false}
                    rotateEnabled={false}
                    scrollEnabled={false}
                    pitchEnabled={false}
                >
                    <Marker title="선택 한 장소" coordinate={coordinate} />
                </MapView>
            </View>
            <View style={styles.content}>
                <Text>Form 영역</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    location: {
        // flex: 1,
        height: 200,
    },
    locationMap: {
        flex: 1,
    },
    content: {},
})
export default PlaceForm
