import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { RotateCcw } from 'lucide-react-native'
import MapView, { MapPressEvent, Marker, Region } from 'react-native-maps'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
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
    coordinate: {
        latitude: number
        longitude: number
    }
}

function PlaceMap() {
    const [placeList, setPlaceList] = useState<Place[]>([])
    const insets = useSafeAreaInsets()

    const handleMapClick = (e: MapPressEvent) => {
        const { coordinate } = e.nativeEvent

        setPlaceList(prev => [
            ...prev,
            {
                title: `Title ${prev.length + 1}`,
                description: `description ${prev.length + 1}`,
                coordinate,
            },
        ])
    }

    const handleReset = () => setPlaceList([])

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                onPress={handleMapClick}
                initialRegion={DEFAULT_MAP_REGION}
            >
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
            </MapView>

            <View
                pointerEvents="box-none"
                style={[styles.actionLayer, { top: insets.top + 12 }]}
            >
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="지도에 추가한 장소 초기화"
                    disabled={placeList.length === 0}
                    hitSlop={8}
                    onPress={handleReset}
                    style={({ pressed }) => [
                        styles.action,
                        placeList.length === 0 && styles.actionDisabled,
                        pressed && styles.actionPressed,
                    ]}
                >
                    <RotateCcw color="#16845B" size={17} strokeWidth={2.2} />
                    <Text style={styles.actionText}>초기화</Text>
                </Pressable>
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
        // backgroundColor: 'red'
    },
    action: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        height: 42,
        borderRadius: 21,
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        shadowColor: '#243D31',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.16,
        shadowRadius: 7,
    },
    actionDisabled: {
        opacity: 0.45,
    },
    actionPressed: {
        opacity: 0.75,
    },
    actionText: {
        color: '#16845B',
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
