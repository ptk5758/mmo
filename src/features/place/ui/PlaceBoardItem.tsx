import { MapPin } from 'lucide-react-native/icons'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import type { Place } from '../model/types'

type PlaceBoardItemProps = {
    place: Place
    onPress?: (place: Place) => void
}

function PlaceBoardItem({ place, onPress }: PlaceBoardItemProps) {
    const visitText = place.isVisited ? '방문 완료' : '방문 전'

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${place.name}, 반경 ${place.radiusMeters}미터, ${place.isEnabled ? '알림 켜짐' : '알림 꺼짐'}`}
            disabled={!onPress}
            onPress={() => onPress?.(place)}
            style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        >
            <View style={styles.iconContainer}>
                <MapPin color="#16845B" size={22} strokeWidth={2.2} />
            </View>

            <View style={styles.information}>
                <Text numberOfLines={1} style={styles.name}>
                    {place.name}
                </Text>
                <Text numberOfLines={1} style={styles.metadata}>
                    반경 {place.radiusMeters}m · {visitText}
                </Text>
            </View>

            <View style={[styles.badge, !place.isEnabled && styles.disabledBadge]}>
                <Text style={[styles.badgeText, !place.isEnabled && styles.disabledBadgeText]}>
                    {place.isEnabled ? '알림 켜짐' : '알림 꺼짐'}
                </Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 76,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 13,
        borderWidth: 1,
        borderColor: '#E6E9E5',
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
    },
    pressed: {
        borderColor: '#9FCDB8',
        backgroundColor: '#FAFCFB',
    },
    iconContainer: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#E8F4ED',
    },
    information: {
        flex: 1,
        minWidth: 0,
    },
    name: {
        color: '#18211D',
        fontSize: 15,
        fontWeight: '700',
    },
    metadata: {
        marginTop: 5,
        color: '#718079',
        fontSize: 12,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 10,
        backgroundColor: '#E7F5ED',
    },
    badgeText: {
        color: '#16845B',
        fontSize: 11,
        fontWeight: '700',
    },
    disabledBadge: {
        backgroundColor: '#EFF1EF',
    },
    disabledBadgeText: {
        color: '#7A817D',
    },
})

export type { PlaceBoardItemProps }
export default PlaceBoardItem
