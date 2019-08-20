import { createStackNavigator, NavigationActions } from 'react-navigation';
import CropScreen from './CropScreen';
// import InfoStackScreen from './InfoStackScreen';
import CropBottomScreen from './CropBottomScreen';

const CropStackNavigator = createStackNavigator({
  Crop: CropScreen,
  CropDetails: CropBottomScreen
}, {
  defaultNavigationOptions: {
    header: null
  }
});

// CropStackNavigator.navigationOptions = ({ navigation }) => {
//   let tabBarVisible = true;
//   if (navigation.state.index > 0) {
//     tabBarVisible = false;
//   }

//   return {
//     tabBarVisible,
//   };
// };


export default CropStackNavigator;
