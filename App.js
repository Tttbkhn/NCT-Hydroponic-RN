import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { Avatar } from 'react-native-elements';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import * as actions from './src/actions/index';
import InfoStackScreen from './src/components/InfoStackScreen';
import HomeScreen from './src/components/HomeScreen';
import UserScreen from './src/components/UserScreen';
import ContactScreen from './src/components/ContactScreen';
import ControlScreen from './src/components/ControlScreen';
import { persistor, store } from './src/store';
import AuthScreen from './src/components/AuthScreen';
import CropStackScreen from './src/components/CropStackScreen';

export default class App extends React.Component {
  componentDidMount() {
    console.log('hello');
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>

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
  } else if (routeName === 'Crop') {
    iconName = 'ios-information-circle';
  } else if (routeName === 'Control') {
    iconName = 'ios-construct';
  } else if (routeName === 'User') {
    iconName = 'ios-contact';
  } else iconName = 'ios-call';

  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  //   Info: InfoStackScreen,
  Crop: CropStackScreen,
  //   Control: ControlScreen,
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
  //   if (navigation.state.routes[1].routes.length > 1) {
  //     headerTitle = 'Hello';
  //   }
  //   if (store.getState().crop.isGoneToCrop) {
  //     headerTitle = 'Hello';
  //   } else headerTitle = routeName;
  //   return {
  //     headerTitle
  //   };
  return { headerTitle };
};

const StackNavigator = createStackNavigator({
  MyTab: {
    screen: TabNavigator,
  },
  Auth: AuthScreen
},
{
  defaultNavigationOptions: ({ navigation }) => ({
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
        onPress={() => navigation.navigate('Auth')}
        activeOpacity={0.7}
        overlayContainerStyle={{ backgroundColor: '#f4511e' }}
        containerStyle={{ marginRight: 5 }}
      />
    )
  }),
});

const mapStateToProps = state => ({
  userData: state.user.userData,
  isGoneToCrop: state.crop.isGoneToCrop,
});

// const mapDispatchToProps = dispatch => ({
//   goToCrop: bool => dispatch(actions.goToCrop(bool)),
// });

connect(mapStateToProps)(App);

const AppContainer = createAppContainer(StackNavigator);

// styles = StyleSheet.create({
//   home: {
//     alignItems: 'center',
//     flex: 1,
//     justifyContent: 'center'
//   }
// });
