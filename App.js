import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Welcome from './components/welcome';
import Login from './components/login';
import SignUp from './components/signUp';
import FeedPass from './components/Passenger/feedPass';
import FeedDriver from './components/Driver/feedDriver';
import ForgotPass from './components/forgotPass';

export default class App extends React.Component {
  render() {
    return (
      <AppContainer/>
    )
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  welcome: { screen: Welcome },
  login: { screen: Login },
  SignUp: { screen: SignUp },
  FeedP: { screen: FeedPass },
  FeedD: { screen:  FeedDriver},
  ResetPass: { screen: ForgotPass }
})

const AppContainer= createAppContainer(AppSwitchNavigator);

// export default AppContainer;