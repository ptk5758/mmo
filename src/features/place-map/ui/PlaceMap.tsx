import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Crosshair, MapPinPlus, X } from 'lucide-react-native/icons'
import MapView, { MapPressEvent, Marker as MarkerComponent, Region } from 'react-native-maps'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../../app'
import { Coordinate } from '../../../shared/model/types'
import { Place } from '../../place/model/types'
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

interface Marker {
    title: string
    description?: string
    coordinate: Coordinate
}

interface PlaceMapProps {
    onPressRegister?: (marker: Marker) => void
    region?: Region
    placeList: Place[]
}

function PlaceMap({ onPressRegister, region = DEFAULT_MAP_REGION, placeList }: PlaceMapProps) {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    const [target, setTarget] = useState<Marker | null>(null)
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
            <MapView style={styles.map} region={region} onPress={handleMapClick}>
                {placeList.map((place, index) => {
                    return (
                        <MarkerComponent
                            key={index}
                            title={place.name}
                            description={place.description}
                            coordinate={place.coordinate}
                            stopPropagation={true}
                        />
                    )
                })}
                {target && <TargetMarker {...target} />}
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

function TargetMarker({ coordinate }: Marker) {
    return (
        <MarkerComponent centerOffset={{ x: -10, y: -77 }} coordinate={coordinate} stopPropagation={true}>
            <View accessibilityLabel="선택한 위치" style={styles.targetMarker}>
                <View style={styles.targetLabel}>
                    <Text style={styles.targetLabelText}>선택 위치</Text>
                </View>

                <View style={styles.targetPin}>
                    <View style={styles.targetPinCore}>
                        <Crosshair color="#FFFFFF" size={21} strokeWidth={2.4} />
                    </View>
                    <View style={styles.targetPinTip} />
                </View>
            </View>
        </MarkerComponent>
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
    targetMarker: {
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingTop: 4,
    },
    targetLabel: {
        marginBottom: 5,
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#DCEAE2',
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        shadowColor: '#243D31',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.14,
        shadowRadius: 4,
        elevation: 3,
    },
    targetLabelText: {
        color: '#315044',
        fontSize: 11,
        fontWeight: '700',
    },
    targetPin: {
        alignItems: 'center',
        shadowColor: '#173E2D',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.24,
        shadowRadius: 5,
        elevation: 5,
    },
    targetPinCore: {
        width: 42,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        borderWidth: 3,
        borderColor: '#FFFFFF',
        borderRadius: 21,
        backgroundColor: '#16845B',
    },
    targetPinTip: {
        width: 13,
        height: 13,
        marginTop: -8,
        borderRightWidth: 3,
        borderBottomWidth: 3,
        borderColor: '#FFFFFF',
        backgroundColor: '#16845B',
        transform: [{ rotate: '45deg' }],
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
