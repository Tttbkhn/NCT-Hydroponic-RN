import { createBottomTabNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';

const AuthScreen = createBottomTabNavigator({
  Login: LoginScreen,
  SignUp: SignUpScreen,
});

export default AuthScreen;
