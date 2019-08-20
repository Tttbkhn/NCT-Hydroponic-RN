import { createBottomTabNavigator, createDrawerNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import InfoStackScreen from './InfoStackScreen';
import ControlScreen from './ControlScreen';
import DetailsScreen from './DetailsScreen';

const CropBottomNavigator = createMaterialTopTabNavigator({
  Info: InfoStackScreen,
  Control: ControlScreen,
  Details: DetailsScreen,
// }, {
//   drawerPosition: 'right'
});

export default CropBottomNavigator;
