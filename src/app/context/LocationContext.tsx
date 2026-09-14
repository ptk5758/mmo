import Geolocation from '@react-native-community/geolocation'
import { createContext, type PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from 'react'

/** true: 추적 중, false: 위치 권한 또는 위치 조회 실패, null: 추적 전/종료 */
type TrackingStatus = true | false | null
type GeoPosition = Parameters<Parameters<typeof Geolocation.watchPosition>[0]>[0]

type LocationContextValue = {
    status: TrackingStatus
    position: GeoPosition | null
    startTracking: () => void
    stopTracking: () => void
}

const LocationContext = createContext<LocationContextValue | null>(null)

function LocationContextProvider({ children }: PropsWithChildren) {
    const [status, setStatus] = useState<TrackingStatus>(null)
    const [position, setPosition] = useState<GeoPosition | null>(null)
    const watchIdRef = useRef<number | null>(null)
    const generationRef = useRef(0)

    const stopTracking = useCallback(() => {
        generationRef.current += 1
        if (watchIdRef.current !== null) {
            Geolocation.clearWatch(watchIdRef.current)
            watchIdRef.current = null
        }
        setStatus(null)
        setPosition(null)
    }, [])

    const startTracking = useCallback(() => {
        if (watchIdRef.current !== null) return

        const generation = ++generationRef.current
        const watchId = Geolocation.watchPosition(
            nextPosition => {
                if (generation === generationRef.current) {
                    setPosition(nextPosition)
                    setStatus(true)
                }
            },
            () => {
                if (generation !== generationRef.current) return
                generationRef.current += 1
                if (watchIdRef.current !== null) {
                    Geolocation.clearWatch(watchIdRef.current)
                    watchIdRef.current = null
                }
                setPosition(null)
                setStatus(false)
            },
            { distanceFilter: 1 },
        )
        watchIdRef.current = watchId
        setStatus(true)
    }, [])

    useEffect(() => () => {
        generationRef.current += 1
        if (watchIdRef.current !== null) Geolocation.clearWatch(watchIdRef.current)
    }, [])

    return (
        <LocationContext.Provider value={{ status, position, startTracking, stopTracking }}>
            {children}
        </LocationContext.Provider>
    )
}

function useLocationContext(): LocationContextValue {
    const value = useContext(LocationContext)
    if (!value) throw new Error('useLocationContext must be used within LocationContextProvider')
    return value
}

export { LocationContextProvider, useLocationContext }
export type { TrackingStatus }
