import { PropsWithChildren } from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'

type SectionProps = {
    num?: number | string
    title: string
    style?: StyleProp<ViewStyle>
}

function Section({
    num,
    title,
    children,
    style,
}: PropsWithChildren<SectionProps>) {
    return (
        <View style={[styles.section, style]}>
            <View style={styles.top}>
                {num && (
                    <View style={styles.num_wrap}>
                        <Text style={styles.num}>{num}</Text>
                    </View>
                )}
                <View style={styles.title}>
                    <Text style={styles.title_text}>{title}</Text>
                </View>
            </View>
            <View style={styles.content}>{children}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        width: '100%',
        marginTop: 29,
    },
    top: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 15,
    },
    num_wrap: {
        width: 23,
        height: 23,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#E8F4ED',
    },
    num: {
        color: '#16845B',
        fontSize: 11,
        fontWeight: '700',
    },
    title: {
        flexShrink: 1,
    },
    title_text: {
        color: '#18211D',
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: -0.35,
    },
    content: {
        width: '100%',
    },
})
export default Section
