/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Router } from './src/app'
import Geolocation from '@react-native-community/geolocation'
import { LocationContextProvider } from './src/app/context/LocationContext'

Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'always',
    enableBackgroundLocationUpdates: true,
})

function App() {
    return (
        <GestureHandlerRootView style={styles.container}>
            <SafeAreaProvider>
                <LocationContextProvider>
                    <Router />
                </LocationContextProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default App
