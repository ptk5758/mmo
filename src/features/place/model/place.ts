import { storage } from '../../../shared/lib/storage'
import type { Place } from './types'
import uuid from 'react-native-uuid'

export type CreatePlaceInput = Pick<
    Place,
    'name' | 'description' | 'coordinate' | 'radiusMeters' | 'notification' | 'isEnabled' | 'autoMarkVisitedOnFirstEntry'
>

/**
 * 새 장소를 생성합니다.
 *
 * 진입 및 방문 관련 상태는 장소 생성 시점의 초기값으로 설정됩니다.
 */
export function createPlace(input: CreatePlaceInput): Place {
    const id = uuid.v4()
    const now = new Date().toISOString()

    return {
        id,
        name: input.name,
        description: input.description,
        coordinate: { ...input.coordinate },
        radiusMeters: input.radiusMeters,
        notification: { ...input.notification },
        isEnabled: input.isEnabled,
        autoMarkVisitedOnFirstEntry: input.autoMarkVisitedOnFirstEntry,
        hasEntered: false,
        isVisited: false,
        createdAt: now,
        updatedAt: now,
    }
}

// Storage 접근 Ke
const SCHEMA_NAME = 'place'

export async function getPlaceList(): Promise<Place[]> {
    const serializedData = (await storage.getItem(SCHEMA_NAME)) ?? ''

    let data
    try {
        data = JSON.parse(serializedData)
    } catch (e) {
        data = null
    }

    if (!Array.isArray(data)) {
        return []
    }

    return data
}

export async function savePlaceList(placeList: Place[]): Promise<void> {
    await storage.setItem(SCHEMA_NAME, JSON.stringify(placeList))
}

export async function addPlace(place: Place): Promise<void> {
    const list = await getPlaceList()
    await savePlaceList([...list, place])
}
