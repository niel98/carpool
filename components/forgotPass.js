import React from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';

const {width: WIDTH} = Dimensions.get('window');

export default class ForgotPass extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            emailF: '',
            loading: false,
        }
    }

    onPasswordResetPress = () => {
        this.setState({
            loading: true
        })
        firebase.auth().sendPasswordResetEmail(this.state.emailF)
        .then(() => {
                this.setState({
                    loading: false
                })
            Alert.alert('A link to reset your password has been sent to your email!');
            this.props.navigation.navigate('login')

        }, (error) => {
            this.setState({
                loading: false
            })
            Alert.alert(error.message);
        })
    }

    render() {
        return(

            this.state.loading ?

            <View style={{flex: 1,
                alignItems: 'center',
                justifyContent: 'center'}}
            >
                <ActivityIndicator
                style= {styles.horizontal} 
                animating= {this.state.loading} 
                size="small" 
                color="#ff1a53" />
            </View>
            :

            <View style={styles.container}>

                <TextInput
                style={styles.forgotInput}
                placeholder={'email'}
                underlineColorAndroid= 'transparent'
                value={this.props.emailF}
                onChangeText= {emailF => this.setState({emailF})}/>

                <TouchableOpacity style={styles.resetbtn}
                onPress={this.onPasswordResetPress.bind(this)}>
                    <Text style={styles.resetTxt}>Reset Password</Text>
                </TouchableOpacity>

                <Text style={styles.reflogin}
                onPress={() => this.props.navigation.navigate('login')}>
                    Back to login
                </Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    forgotInput: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: '#000',
        color: '#ff1a53',
        marginHorizontal: 25
    },
    resetbtn: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        backgroundColor: '#ff1a53',
        justifyContent: 'center',
        marginTop: 20
    },
    resetTxt: {
        color: "#fff",
        fontSize: 16,
        textAlign: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    reflogin: {
        color: '#fff',
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center'
    }
})