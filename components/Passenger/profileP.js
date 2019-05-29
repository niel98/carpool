import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Button, Container, Header, Content, Left } from 'native-base';

export default class ProfileP extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Profile</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
    },
})