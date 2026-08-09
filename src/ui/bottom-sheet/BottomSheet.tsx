import type { ReactNode } from 'react';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type BottomSheetProps = {
  children: ReactNode;
  title?: string;
  count?: number;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  collapsedHeight?: number;
  expandedHeight?: number;
  showHeader?: boolean;
  scrollEnabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * 지도 위에 표시하는 고정 높이 BottomSheet.
 *
 * 애니메이션과 드래그 제스처는 의도적으로 포함하지 않았다. `expanded`를
 * 전달하면 controlled component로, 생략하면 `defaultExpanded`를 초기값으로
 * 사용하는 uncontrolled component로 동작한다.
 */
function BottomSheet({
  children,
  title = '내 장소',
  count,
  expanded,
  defaultExpanded = false,
  onExpandedChange,
  collapsedHeight = 302,
  expandedHeight = 598,
  showHeader = true,
  scrollEnabled = true,
  style,
}: BottomSheetProps) {
  const insets = useSafeAreaInsets();
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpanded = expanded ?? internalExpanded;

  const toggleExpanded = () => {
    const nextExpanded = !isExpanded;

    if (expanded === undefined) {
      setInternalExpanded(nextExpanded);
    }

    onExpandedChange?.(nextExpanded);
  };

  return (
    <View
      style={[
        styles.sheet,
        {
          height: isExpanded ? expandedHeight : collapsedHeight,
          paddingBottom: Math.max(24, insets.bottom),
        },
        style,
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={isExpanded ? '바텀 시트 접기' : '바텀 시트 펼치기'}
        accessibilityState={{ expanded: isExpanded }}
        hitSlop={12}
        onPress={toggleExpanded}
        style={styles.grabberButton}
      >
        <View style={styles.grabber} />
      </Pressable>

      {showHeader ? (
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{title}</Text>
            {count !== undefined ? (
              <Text style={styles.count}>{count}개</Text>
            ) : null}
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={toggleExpanded}
            hitSlop={8}
          >
            <Text style={styles.toggleText}>
              {isExpanded ? '접기' : '전체보기'}
            </Text>
          </Pressable>
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
    </View>
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
  grabberButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 30,
    paddingHorizontal: 12,
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

export type { BottomSheetProps };
export default BottomSheet;
