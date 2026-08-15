import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { PlaceBoard } from '../../../features/place';
import { PlaceMap } from '../../../features/place-map';

function Home() {
  return (
    <View style={styles.container}>
      <PlaceMap/>
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
