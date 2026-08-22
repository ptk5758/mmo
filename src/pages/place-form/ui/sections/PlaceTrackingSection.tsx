import { StyleSheet, Switch, Text, View } from 'react-native'
import { Section } from '../../../../shared/ui/section'

type Props = {
    isEnabled: boolean
    autoMarkVisited: boolean
    onChangeEnabled: (value: boolean) => void
    onChangeAutoMarkVisited: (value: boolean) => void
}

function PlaceTrackingSection({ isEnabled, autoMarkVisited, onChangeEnabled, onChangeAutoMarkVisited }: Props) {
    return (
        <Section num={4} title="추적 설정" style={styles.section}>
            <View style={styles.list}>
                <Option label="알림 활성화" description="백그라운드에서 위치를 확인해요" value={isEnabled} onChange={onChangeEnabled} />
                <Option
                    label="첫 방문 후 자동 완료"
                    description="한 번 알린 후 이 장소의 추적을 종료해요"
                    value={autoMarkVisited}
                    onChange={onChangeAutoMarkVisited}
                    divided
                />
            </View>
        </Section>
    )
}

function Option({
    label,
    description,
    value,
    onChange,
    divided = false,
}: {
    label: string
    description: string
    value: boolean
    onChange: (value: boolean) => void
    divided?: boolean
}) {
    return (
        <View style={[styles.option, divided && styles.divider]}>
            <View style={styles.copy}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
            <Switch value={value} onValueChange={onChange} trackColor={{ false: '#CDD2CE', true: '#16845B' }} thumbColor="#FFFFFF" />
        </View>
    )
}

const styles = StyleSheet.create({
    section: { marginTop: 29 },
    list: {
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E3E8E3',
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
    },
    option: {
        minHeight: 72,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 14,
        padding: 16,
    },
    divider: { borderTopWidth: 1, borderTopColor: '#E3E8E3' },
    copy: { flex: 1 },
    label: {
        marginBottom: 4,
        color: '#18211D',
        fontSize: 13,
        fontWeight: '700',
    },
    description: { color: '#718079', fontSize: 11, lineHeight: 16 },
})

export default PlaceTrackingSection
