import { createStackNavigator } from 'react-navigation';
import PHScreen from './Info/PHScreen';
import SHScreen from './Info/SHScreen';
import InfoScreen from './Info/InfoScreen';
import LightScreen from './Info/LightScreen';
import ECScreen from './Info/ECScreen';
import WaterScreen from './Info/WaterScreen';
import DHTScreen from './Info/DHTScreen';
import ActivityLogScreen from './Info/ActivityLogScreen';

const InfoStackNavigator = createStackNavigator({
  Index: InfoScreen,
  PH: PHScreen,
  SoilHumidity: SHScreen,
  Light: LightScreen,
  EC: ECScreen,
  DHT: DHTScreen,
  ActivityLog: ActivityLogScreen,
},
{
  defaultNavigationOptions: ({ navigation }) => {
    const { routeName } = navigation.state;
    let headerTitle;
    if (routeName === 'SoilHumidity') {
      headerTitle = 'Soil Humidity';
    } else if (routeName === 'ActivityLog') {
      headerTitle = 'Activity Log';
    } else headerTitle = routeName;
    return {
      headerTitle,
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#2c75ea',
        height: 35,
      },
      headerTitleContainerStyle: {
        paddingBottom: 15,
      },
      headerLeftContainerStyle: {
        paddingBottom: 15
      }
    };
  }
});

export default InfoStackNavigator;
