import { createStackNavigator } from 'react-navigation';
import PHScreen from './Info/PHScreen';
import SHScreen from './Info/SHScreen';
import InfoScreen from './Info/InfoScreen';

const InfoStackNavigator = createStackNavigator({
  Info: InfoScreen,
  PH: PHScreen,
  SoilHumidity: SHScreen,
  // Light: LightScreen,
  // EC: ECScreen,
  // Water: WaterScreen,
  // DHT: DHTScreen,
  // ActivityLog: ActivityLogScreen,
});

export default InfoStackNavigator;
