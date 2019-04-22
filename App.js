import React from 'react';
import {
  StyleSheet
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { Avatar } from 'react-native-elements';
import InfoStackScreen from './components/InfoStackScreen';
import HomeScreen from './components/HomeScreen';
import UserScreen from './components/UserScreen';
import ContactScreen from './components/ContactScreen';
import ControlScreen from './components/ControlScreen';

export default class App extends React.Component {
  componentDidMount() {
    console.log('hello');
  }

  render() {
    return (
      <AppContainer />
    );
  }
}
const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  const IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Home') {
    // iconName = `ios-home${focused ? '' : '-outline'}`;
    iconName = 'ios-home';
    // We want to add badges to home tab icon
  } else if (routeName === 'Info') {
    iconName = 'ios-information-circle';
  } else if (routeName === 'Control') {
    iconName = 'ios-construct';
  } else if (routeName === 'User') {
    iconName = 'ios-contact';
  } else iconName = 'ios-call';

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Info: InfoStackScreen,
  Control: ControlScreen,
  User: UserScreen,
  Contact: ContactScreen
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => getTabBarIcon(navigation, focused, tintColor),
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
});


TabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  const headerTitle = routeName;
  return {
    headerTitle
  };
};

const StackNavigator = createStackNavigator({
  MyTab: {
    screen: TabNavigator,
  },
},
{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: (
      <Avatar
        rounded
        icon={{ name: 'user', type: 'font-awesome', color: 'white' }}
        onPress={() => console.log('Works!')}
        activeOpacity={0.7}
        overlayContainerStyle={{ backgroundColor: '#f4511e' }}
        containerStyle={{ marginRight: 5 }}
      />
    )
  },
});

const AppContainer = createAppContainer(StackNavigator);

// styles = StyleSheet.create({
//   home: {
//     alignItems: 'center',
//     flex: 1,
//     justifyContent: 'center'
//   }
// });
