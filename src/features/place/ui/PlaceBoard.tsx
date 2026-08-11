import { StyleSheet, Text, View } from 'react-native';
import { BottomSheet } from '../../../shared/ui/bottom-sheet';
import { mockPlaces } from '../mock/data';
import type { Place } from '../model/types';
import PlaceBoardItem from './PlaceBoardItem';

type PlaceBoardProps = {
  onPressPlace?: (place: Place) => void;
  onPressViewAll?: () => void;
};

function PlaceBoard({ onPressPlace, onPressViewAll }: PlaceBoardProps) {
  return (
    <BottomSheet
      title="내 장소"
      count={mockPlaces.length}
      onPressViewAll={onPressViewAll}
    >
      {mockPlaces.length > 0 ? (
        <View style={styles.list}>
          {mockPlaces.map(place => (
            <PlaceBoardItem
              key={place.id}
              place={place}
              onPress={onPressPlace}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>등록된 장소가 없어요</Text>
          <Text style={styles.emptyDescription}>
            지도에서 알림을 받을 장소를 추가해 보세요.
          </Text>
        </View>
      )}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 11,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 48,
  },
  emptyTitle: {
    color: '#18211D',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyDescription: {
    marginTop: 8,
    color: '#718079',
    fontSize: 13,
    textAlign: 'center',
  },
});

export type { PlaceBoardProps };
export default PlaceBoard;
