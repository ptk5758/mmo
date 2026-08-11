import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import { Home } from '../pages/home';

export type RootStackParamList = {
    home: undefined
}

const rootStack = createNativeStackNavigator<RootStackParamList>({
  screens: {
    home: Home,
  },
});

const Navigation = createStaticNavigation(rootStack);

function Router() {
  return <Navigation />;
}

export default Router;
