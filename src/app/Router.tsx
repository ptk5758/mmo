import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStaticNavigation } from '@react-navigation/native'
import { MainPage } from '../pages/main'

export type RootStackParamList = {
    main: undefined
    // home: undefined
    // placeForm: { coordinate: Coordinate; placeId?: string }
}


const rootStack = createNativeStackNavigator<RootStackParamList>({
    screens: {
        main: {
            screen: MainPage,
        },
        // home: {
        //     screen: Home,
        //     options: {
        //         headerShown: false,
        //     },
        // },
        // placeForm: {
        //     screen: PlaceForm,
        //     options: ({ route }) => ({
        //         title: route.params.placeId ? '장소 수정' : '장소 등록',
        //     }),
        // },
    },
})

const Navigation = createStaticNavigation(rootStack)

function Router() {
    return <Navigation />
}

export default Router
