import { Text, TextInput, View } from 'react-native'
import { Section } from '../../../../shared/ui/section'
import styles from './styles'

type PlaceInputSectionProps = {
    name: string
    description: string
    onChangeName: (value: string) => void
    onChangeDescription: (value: string) => void
}

function PlaceInputSection({ name, description, onChangeName, onChangeDescription }: PlaceInputSectionProps) {
    return (
        <Section num={1} title="장소 정보" style={styles.section}>
            <View style={styles.field}>
                <View style={styles.fieldHeader}>
                    <Text style={styles.label}>장소 이름</Text>
                    <Text style={styles.meta}>{name.length}/20</Text>
                </View>
                <TextInput
                    value={name}
                    onChangeText={onChangeName}
                    maxLength={20}
                    placeholder="예: 우리 집, 회사"
                    placeholderTextColor="#A5ADA8"
                    style={styles.input}
                />
            </View>
            <View style={styles.field}>
                <View style={styles.fieldHeader}>
                    <Text style={styles.label}>설명</Text>
                    <Text style={styles.meta}>선택</Text>
                </View>
                <TextInput
                    value={description}
                    onChangeText={onChangeDescription}
                    placeholder="장소를 기억할 수 있는 설명"
                    placeholderTextColor="#A5ADA8"
                    style={styles.input}
                />
            </View>
        </Section>
    )
}

export default PlaceInputSection
