import { Text, TextInput, View } from 'react-native'
import { Section } from '../../../../shared/ui/section'
import styles from './styles'

type Props = {
    title: string
    message: string
    onChangeTitle: (value: string) => void
    onChangeMessage: (value: string) => void
}

function PlaceNotificationSection({ title, message, onChangeTitle, onChangeMessage }: Props) {
    return (
        <Section num={3} title="알림 메시지" style={styles.section}>
            <View style={styles.field}>
                <View style={styles.fieldHeader}>
                    <Text style={styles.label}>알림 제목</Text>
                    <Text style={styles.meta}>{title.length}/30</Text>
                </View>
                <TextInput
                    value={title}
                    onChangeText={onChangeTitle}
                    maxLength={30}
                    placeholder="예: 근처에 도착했어요"
                    placeholderTextColor="#A5ADA8"
                    style={styles.input}
                />
            </View>
            <View style={styles.field}>
                <View style={styles.fieldHeader}>
                    <Text style={styles.label}>알림 내용</Text>
                    <Text style={styles.meta}>{message.length}/80</Text>
                </View>
                <TextInput
                    value={message}
                    onChangeText={onChangeMessage}
                    maxLength={80}
                    multiline
                    placeholder="알림에 표시할 내용을 입력해 주세요"
                    placeholderTextColor="#A5ADA8"
                    style={[styles.input, styles.multilineInput]}
                />
            </View>
        </Section>
    )
}

export default PlaceNotificationSection
