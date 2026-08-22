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
