import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useState } from 'react'
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { RootStackParamList } from '../../../app'
import { createPlace } from '../../../features/place'
import { PlaceGeoFenceSection, PlaceInputSection, PlaceNotificationSection, PlaceTrackingSection } from './sections'

type PlaceFormProps = NativeStackScreenProps<RootStackParamList, 'placeForm'>

function PlaceForm({ route }: PlaceFormProps) {
    const { coordinate, placeId } = route.params
    /**
     * 수정 모드 인지 flag
     */
    const isModify = Boolean(placeId)
    const actionText = isModify ? '수정' : '등록'
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [radiusMeters, setRadiusMeters] = useState<number>(150)
    const [notificationTitle, setNotificationTitle] = useState<string>('근처에 도착했어요')
    const [notificationMessage, setNotificationMessage] = useState<string>('설정한 장소 반경 안에 들어왔어요.')
    const [isEnabled, setIsEnabled] = useState<boolean>(true)
    const [autoMarkVisited, setAutoMarkVisited] = useState<boolean>(false)

    const handleButtonClick = () => {
        const data = {
            name,
            description,
            radiusMeters,
            notificationTitle,
            notificationMessage,
            isEnabled,
            autoMarkVisited,
        }
        // console.log(data)
        isModify ? update(placeId!, data) : save(data)
    }

    const save = (data: {
        name: string
        description: string
        radiusMeters: number
        notificationTitle: string
        notificationMessage: string
        isEnabled: boolean
        autoMarkVisited: boolean
    }) => {
        const place = createPlace({
            name: data.name,
            description: data.description,
            coordinate,
            radiusMeters: data.radiusMeters,
            notification: {
                notificationTitle: data.notificationTitle,
                notificationMessage: data.notificationMessage,
            },
            isEnabled: data.isEnabled,
            autoMarkVisitedOnFirstEntry: data.autoMarkVisited,
        })
        Alert.alert('장소 등록 완료', place.id)
    }
    const update = (_placeId: string, _data: any) => {
        console.log('Update')
    }

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
                    <Pressable
                        accessibilityRole="button"
                        style={({ pressed }) => [styles.submitButton, pressed && styles.submitButtonActive]}
                        onPress={handleButtonClick}
                    >
                        <Text style={styles.submitButtonText}>장소 {actionText}</Text>
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
    submitButtonActive: {
        backgroundColor: '#0F6947',
        transform: [{ translateY: 1 }],
    },
    submitButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
})

export default PlaceForm
