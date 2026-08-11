import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { PlaceBoard } from '../../../features/place';

function Home() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <PlaceBoard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
export default Home;
