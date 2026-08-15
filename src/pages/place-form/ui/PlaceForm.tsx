import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, View } from 'react-native'
import { RootStackParamList } from '../../../app'

type PlaceFormProps = NativeStackScreenProps<RootStackParamList, 'placeForm'>

function PlaceForm({ route }: PlaceFormProps) {
    const { coordinate } = route.params
    return (
        <View>
            <Text>장소 등록 & 수정</Text>
            <Text>
                {coordinate.latitude}
                {coordinate.longitude}
            </Text>
        </View>
    )
}
export default PlaceForm
