import { StyleSheet } from 'react-native'

const sectionStyles = StyleSheet.create({
    section: {
        marginTop: 29,
    },
    field: {
        marginBottom: 17,
    },
    fieldHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 7,
    },
    label: {
        color: '#18211D',
        fontSize: 12,
        fontWeight: '700',
    },
    meta: {
        color: '#98A29C',
        fontSize: 10,
        fontWeight: '600',
    },
    input: {
        minHeight: 48,
        paddingHorizontal: 14,
        paddingVertical: 13,
        borderWidth: 1,
        borderColor: '#E3E8E3',
        borderRadius: 14,
        color: '#18211D',
        backgroundColor: '#FFFFFF',
        fontSize: 14,
    },
    multilineInput: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
})

export default sectionStyles
