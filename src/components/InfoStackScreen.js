import { createStackNavigator, createAppContainer } from 'react-navigation';
import React, { Component } from 'react';
import PHScreen from './Info/PHScreen';
import HALScreen from './Info/HALScreen';
import InfoScreen from './Info/InfoScreen';
import ECScreen from './Info/ECScreen';
import TempScreen from './Info/TempScreen';
import ActivityLogScreen from './Info/ActivityLogScreen';

const InfoStackNavigator = createStackNavigator({
  Index: InfoScreen,
  PH: PHScreen,
  HumidityandLight: HALScreen,
  EC: ECScreen,
  Temperature: TempScreen,
  ActivityLog: ActivityLogScreen,
},
// {
//   defaultNavigationOptions: ({ navigation }) => {
//     const { routeName } = navigation.state;
//     let headerTitle;
//     if (routeName === 'SoilHumidity') {
//       headerTitle = 'Soil Humidity';
//     } else if (routeName === 'ActivityLog') {
//       headerTitle = 'Activity Log';
//     } else headerTitle = routeName;
//     return {
//       headerTitle,
//       headerTintColor: '#fff',
//       headerStyle: {
//         backgroundColor: '#2c75ea',
//         height: 35,
//       },
//       headerTitleContainerStyle: {
//         paddingBottom: 15,
//       },
//       headerLeftContainerStyle: {
//         paddingBottom: 15
//       }
//     };
//   }
// }
{
  defaultNavigationOptions: {
    header: null
  }
});

export default InfoStackNavigator;
