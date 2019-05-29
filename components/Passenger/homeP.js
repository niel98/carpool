import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { MapView, Permissions, Location } from 'expo';

import { DestBtn  } from './destBtn';

export default class HomeP extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            region: null,
            hasLocationPermissions: false,
            locationResult: null
        };
    }

    componentDidMount() {
        this.getCurrentLocation();
    }

    _handleRegionChange = region => {
        console.log(region);
        this.setState({ region });
      };

    getCurrentLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION)
        if (status !== 'granted') {
            this.setState({
              locationResult: 'Permission to access location was denied',
            });
          } else {
            this.setState({ hasLocationPermissions: true });
          }

        let location = await Location.getCurrentPositionAsync({
            enabledHighAccuracy: true
        })
        this.setState({ locationResult: JSON.stringify(location) });

        this.setState({
            region: { 
                latitude: location.coords.latitude, 
                longitude: location.coords.longitude, 
                latitudeDelta: 0.0922, 
                longitudeDelta: 0.0421 
            }});
        };

        render() {
            return (
                <View style= {styles.container}>

                    <DestBtn/>
                    
                    <MapView
                    initialRegion = {this.state.region}
                    showsCompass = {true}
                    rotateEnabled = {false} 
                    showUserLocation = {true}
                    style = {{flex: 1}}
                    />
                    </View>
            )
        }

    }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
})