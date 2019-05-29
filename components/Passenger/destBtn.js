import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons';

const { WIDTH } = Dimensions.get('window');

export default class DestBtn extends React.Component {
    render() {
        return (
            <TouchableOpacity style= {styles.container}>
                <View style= {styles.leftCol}>
                    <Text style= {{fontSize: 8, }}>
                        ('/u25W0')
                    </Text>
                </View>
    
                <View style= {styles.centerCol}>
                    <Text style={{fontFamily: 'sans-serif-thin', fontSize: 21, color: '#545454'}}>
                    where to?
                    </Text>
                </View>
                    <Ionicons name='md-car' size={25} color='#000' style={{alignSelf: 'center'}}/>
                <View style= {styles.rightCol}>
    
                </View>
            </TouchableOpacity>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        zIndex: 9,
        position: 'absolute',
        flexDirection: 'row',
        width: WIDTH - 40,
        height: 60,
        top: 110,
        left: 20,
        borderRadius: 2,
        alignItems: 'center',
        shadowColor: '#000',
        elevation: 7,
        shadowRadius: 5,
        shadowOpacity: 1.0,
    },
    leftCol: {
        flex: 1,
        alignItems: 'center'
    },
    centerCol: {
        flex: 4
    },
    rightCol: {
        flex: 1,
        borderLeftWidth: 1,
        borderColor: '#ededed'
    }
})