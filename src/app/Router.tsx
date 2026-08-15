import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStaticNavigation } from '@react-navigation/native'
import { Home } from '../pages/home'
import { Coordinate } from '../shared/model/types'

export type RootStackParamList = {
    home: undefined
    placeForm: { coordinate: Coordinate }
}

const rootStack = createNativeStackNavigator<RootStackParamList>({
    screens: {
        home: {
            screen: Home,
            options: {
                headerShown: false,
            },
        },
        placeForm: {
            screen: () => <></>,
            options: {
                title: '장소 등록 & 수정',
            },
        },
    },
})

const Navigation = createStaticNavigation(rootStack)

function Router() {
    return <Navigation />
}

export default Router
