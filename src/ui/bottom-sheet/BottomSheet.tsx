import type { ReactNode } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { GestureDetector, usePanGesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scheduleOnRN } from 'react-native-worklets';

const VELOCITY_PROJECTION = 0.15;
const SPRING_CONFIG = {
  damping: 50,
  stiffness: 240,
};

type BottomSheetSnapState = 'expanded' | 'collapsed' | 'closed';

type BottomSheetProps = {
  children: ReactNode;
  title?: string;
  count?: number;
  collapsedHeight?: number;
  expandedHeight?: number;
  closedHeight?: number;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  onSnapChange?: (state: BottomSheetSnapState) => void;
  onPressViewAll?: () => void;
  showHeader?: boolean;
  scrollEnabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * 지도 위에 표시하는 드래그 가능한 BottomSheet UI.
 * grabber를 위아래로 드래그하면 접힘/펼침 위치에 스냅된다.
 */
function BottomSheet({
  children,
  title = '내 장소',
  count,
  collapsedHeight = 302,
  expandedHeight = 598,
  closedHeight = 48,
  defaultExpanded = false,
  onExpandedChange,
  onSnapChange,
  onPressViewAll,
  showHeader = true,
  scrollEnabled = true,
  style,
}: BottomSheetProps) {
  const insets = useSafeAreaInsets();
  const collapsedOffset = Math.max(0, expandedHeight - collapsedHeight);
  const safeClosedHeight = closedHeight + insets.bottom;
  const closedOffset = Math.max(
    collapsedOffset,
    expandedHeight - safeClosedHeight,
  );
  const translateY = useSharedValue(defaultExpanded ? 0 : collapsedOffset);
  const dragStartY = useSharedValue(translateY.value);

  const notifySnapChange = (state: BottomSheetSnapState) => {
    onExpandedChange?.(state === 'expanded');
    onSnapChange?.(state);
  };

  const panGesture = usePanGesture({
    activeOffsetY: [-5, 5],
    onBegin: () => {
      dragStartY.value = translateY.value;
    },
    onUpdate: event => {
      translateY.value = Math.min(
        closedOffset,
        Math.max(0, dragStartY.value + event.translationY),
      );
    },
    onDeactivate: event => {
      const projectedY = Math.min(
        closedOffset,
        Math.max(0, translateY.value + event.velocityY * VELOCITY_PROJECTION),
      );
      const expandedDistance = projectedY;
      const collapsedDistance = Math.abs(projectedY - collapsedOffset);
      const closedDistance = Math.abs(projectedY - closedOffset);

      let nextState: BottomSheetSnapState = 'expanded';
      let nextOffset = 0;

      if (
        collapsedDistance <= expandedDistance &&
        collapsedDistance <= closedDistance
      ) {
        nextState = 'collapsed';
        nextOffset = collapsedOffset;
      } else if (closedDistance < expandedDistance) {
        nextState = 'closed';
        nextOffset = closedOffset;
      }

      translateY.value = withSpring(nextOffset, SPRING_CONFIG);

      if (onExpandedChange || onSnapChange) {
        scheduleOnRN(notifySnapChange, nextState);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.sheet,
        style,
        {
          height: expandedHeight,
          paddingBottom: Math.max(24, insets.bottom),
        },
        animatedStyle,
      ]}
    >
      <GestureDetector gesture={panGesture}>
        <View style={styles.grabberArea}>
          <View style={styles.grabber} />
        </View>
      </GestureDetector>

      {showHeader ? (
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{title}</Text>
            {count !== undefined ? (
              <Text style={styles.count}>{count}개</Text>
            ) : null}
          </View>

          {onPressViewAll ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="내 장소 전체보기"
              onPress={onPressViewAll}
              hitSlop={8}
            >
              <Text style={styles.toggleText}>전체보기</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}

      <ScrollView
        bounces={false}
        contentContainerStyle={styles.content}
        nestedScrollEnabled
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 7,
    overflow: 'hidden',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: '#243D31',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.12,
    shadowRadius: 17,
    elevation: 12,
  },
  grabberArea: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  grabber: {
    width: 42,
    height: 5,
    backgroundColor: '#D8DDD9',
    borderRadius: 9,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  title: {
    color: '#18211D',
    fontSize: 21,
    fontWeight: '700',
    letterSpacing: -0.8,
  },
  count: {
    marginLeft: 6,
    color: '#718079',
    fontSize: 13,
  },
  toggleText: {
    color: '#16845B',
    fontSize: 14,
    fontWeight: '700',
  },
  content: {
    paddingBottom: 28,
  },
});

export type { BottomSheetProps, BottomSheetSnapState };
export default BottomSheet;
