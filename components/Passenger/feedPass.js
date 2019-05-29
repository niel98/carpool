import React from 'react';
import { View, Image, StyleSheet, TextInput } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { createDrawerNavigator, createAppContainer, DrawerItems, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import HomeP from './homeP';
import SettingsP from './settingsP';
import ProfileP from './profileP';

export default class FeedPass extends React.Component {
    render() {
        return(
            <DrawerNav />   
        )
    }
}

const DashboardTabNavigator = createBottomTabNavigator({
    Home: { screen: HomeP },
    Settings: { screen: SettingsP },
    Profile: { screen: ProfileP }
},
{
    navigationOptions: ({navigation}) => {
        const { routeName } = navigation.state.routes
        [navigation.state.index];
        return {
            headerTitle: routeName
        }
    }
})

const DashBoardStackNavigator = createStackNavigator({
    DashBoardTabVavigator: DashboardTabNavigator
},
{
    defaultNavigationOptions: ({navigation}) => {
        return {
            headerLeft: <Icon style={{paddingLeft: 10}} name= 'md-menu' size={30}
            onPress= {() => navigation.openDrawer()}/>
        }
    }
})


const Drawer = createDrawerNavigator({
    HomeDash: {
        screen: DashBoardStackNavigator
    }
 }
)

const DrawerNav = createAppContainer(Drawer);

// export default DrawerNav;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
})