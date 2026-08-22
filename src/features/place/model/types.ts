import { Coordinate } from '../../../shared/model/types'

export interface Notification {
    /** 진입 시 표시할 로컬 알림 제목 */
    notificationTitle: string
    /** 진입 시 표시할 로컬 알림 내용 */
    notificationMessage: string
}

export interface Place {
    /** 장소의 고유 식별자 */
    id: string

    /** 사용자가 지정한 장소 이름 */
    name: string

    /** 장소를 기억하기 위한 선택 설명 */
    description?: string

    /** 위도 경도 정보 */
    coordinate: Coordinate

    /** 진입 여부를 판단할 알림 반경(미터) */
    radiusMeters: number

    /** 알림 메시지 옵션 */
    notification: Notification

    /** 사용자가 이 장소의 위치 추적을 활성화했는지 여부 */
    isEnabled: boolean

    /** 최초 진입 시 방문 완료 상태를 자동으로 처리할지 여부 */
    autoMarkVisitedOnFirstEntry: boolean

    /** 장소 반경에 한 번이라도 진입했는지 여부 */
    hasEntered: boolean

    /** 최초 진입 시각(ISO 8601) */
    firstEnteredAt?: string

    /** 방문 완료 여부 */
    isVisited: boolean

    /** 방문 완료 시각(ISO 8601) */
    visitedAt?: string

    /** 마지막으로 로컬 알림을 표시한 시각(ISO 8601) */
    lastNotifiedAt?: string

    /** 장소를 생성한 시각(ISO 8601) */
    createdAt: string

    /** 장소 정보를 마지막으로 수정한 시각(ISO 8601) */
    updatedAt: string
}
