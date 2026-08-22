import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Section } from '../../../../shared/ui/section'

const RADIUS_OPTIONS = [50, 100, 150, 300, 500]

type PlaceGeoFenceSectionProps = {
    radiusMeters: number
    onChangeRadius: (value: number) => void
}

function PlaceGeoFenceSection({ radiusMeters, onChangeRadius }: PlaceGeoFenceSectionProps) {
    return (
        <Section num={2} title="알림 반경" style={localStyles.section}>
            <View style={localStyles.card}>
                <View style={localStyles.header}>
                    <Text style={localStyles.label}>장소로부터</Text>
                    <Text style={localStyles.value}>{radiusMeters} m</Text>
                </View>
                <View style={localStyles.options}>
                    {RADIUS_OPTIONS.map(radius => {
                        const selected = radius === radiusMeters

                        return (
                            <Pressable
                                key={radius}
                                accessibilityRole="radio"
                                accessibilityState={{ checked: selected }}
                                onPress={() => onChangeRadius(radius)}
                                style={[localStyles.option, selected && localStyles.selectedOption]}
                            >
                                <Text style={[localStyles.optionText, selected && localStyles.selectedOptionText]}>{radius}m</Text>
                            </Pressable>
                        )
                    })}
                </View>
            </View>
        </Section>
    )
}

const localStyles = StyleSheet.create({
    section: {
        marginTop: 29,
    },
    card: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#E3E8E3',
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 13,
    },
    label: {
        color: '#18211D',
        fontSize: 13,
        fontWeight: '700',
    },
    value: {
        color: '#16845B',
        fontSize: 18,
        fontWeight: '800',
    },
    options: {
        flexDirection: 'row',
        gap: 6,
    },
    option: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 9,
        borderRadius: 10,
        backgroundColor: '#EFF1EF',
    },
    selectedOption: {
        backgroundColor: '#E8F4ED',
    },
    optionText: {
        color: '#718079',
        fontSize: 11,
        fontWeight: '600',
    },
    selectedOptionText: {
        color: '#16845B',
        fontWeight: '800',
    },
})

export default PlaceGeoFenceSection
