import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { RootStackParamList } from '../../../app'
import { PlaceGeoFenceSection, PlaceInputSection, PlaceNotificationSection, PlaceTrackingSection } from './sections'

type PlaceFormProps = NativeStackScreenProps<RootStackParamList, 'placeForm'>

function PlaceForm({ route }: PlaceFormProps) {
    const { coordinate } = route.params
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [radiusMeters, setRadiusMeters] = useState(150)
    const [notificationTitle, setNotificationTitle] = useState('근처에 도착했어요')
    const [notificationMessage, setNotificationMessage] = useState('설정한 장소 반경 안에 들어왔어요.')
    const [isEnabled, setIsEnabled] = useState(true)
    const [autoMarkVisited, setAutoMarkVisited] = useState(false)

    return (
        <ScrollView style={styles.page} contentContainerStyle={styles.pageContent} keyboardShouldPersistTaps="handled">
            <View style={styles.location}>
                <MapView
                    style={styles.locationMap}
                    initialRegion={{
                        ...coordinate,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                    zoomEnabled={false}
                    rotateEnabled={false}
                    scrollEnabled={false}
                    pitchEnabled={false}
                >
                    <Marker title="선택한 장소" coordinate={coordinate} />
                </MapView>
            </View>
            <View style={styles.content}>
                <PlaceInputSection name={name} description={description} onChangeName={setName} onChangeDescription={setDescription} />
                <PlaceGeoFenceSection radiusMeters={radiusMeters} onChangeRadius={setRadiusMeters} />
                <PlaceNotificationSection
                    title={notificationTitle}
                    message={notificationMessage}
                    onChangeTitle={setNotificationTitle}
                    onChangeMessage={setNotificationMessage}
                />
                <PlaceTrackingSection
                    isEnabled={isEnabled}
                    autoMarkVisited={autoMarkVisited}
                    onChangeEnabled={setIsEnabled}
                    onChangeAutoMarkVisited={setAutoMarkVisited}
                />
                <View style={styles.action}>
                    <Pressable style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>장소 등록 & 수정</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    page: { flex: 1, backgroundColor: '#F6F5EF' },
    pageContent: { paddingBottom: 32 },
    location: { height: 200 },
    locationMap: { flex: 1 },
    content: { paddingHorizontal: 20 },
    action: { marginTop: 29 },
    submitButton: {
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        backgroundColor: '#16845B',
    },
    submitButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
})

export default PlaceForm
