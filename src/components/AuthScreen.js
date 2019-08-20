import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';


const AuthScreen = createBottomTabNavigator({
  Login: LoginScreen,
  SignUp: SignUpScreen,
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

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  const IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Login') {
    // iconName = `ios-home${focused ? '' : '-outline'}`;
    iconName = 'ios-log-in';
    // We want to add badges to home tab icon
  } else iconName = 'ios-person-add';
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

export default AuthScreen;
