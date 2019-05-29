import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, Alert, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import * as firebase from 'firebase';
import Spinner from 'react-native-loading-spinner-overlay';
import {Constants} from 'expo';


const {width: WIDTH} = Dimensions.get('window');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCcnYxHhc7px0vDtQ1Ky3g8OuOmDbTS6wU",
    authDomain: "carpool-49b31.firebaseapp.com",
    databaseURL: "https://carpool-49b31.firebaseio.com",
    projectId: "carpool-49b31",
    storageBucket: "carpool-49b31.appspot.com",
    messagingSenderId: "260325670922"
    };
    
    firebase.initializeApp(config);

export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state= {
            email: '',
            password: '',
            loading: false
        }
    }
    
    fireusers = firebase.database().ref('/Users');
    type;

    onLoginpress = () => {

        this.setState({
            loading: true,
        })    
        
        //Read db and check if user is a driver or a passenger

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                
                this.setState({
                    loading: false
                });

                this.fireusers.child(firebase.auth().currentUser.uid).once('value', snapshot => {
                    this.type = snapshot.val().type;
                    console.log(this.type)

                    if (snapshot.val().type == 'passenger') {

                        this.props.navigation.navigate('FeedP');
    
                    } else if (snapshot.val().type == 'driver') {
    
                        this.props.navigation.navigate('FeedD');
                    } else {
    
                    }

                })

                Alert.alert('Login successful!');
                

            }, (error) => {
                this.setState({
                    loading: false,
                })
                Alert.alert(error.message);
            })

    }

    render() {
        return (

            this.state.loading ?

            <View style={{flex: 1,
            alignItems: 'center',
            justifyContent: 'center'}}>

                <ActivityIndicator
                style= {styles.horizontal} 
                animating= {this.state.loading} 
                size="small" 
                color="#ff1a53" />

            </View>
            :

            <View style={styles.container}>

            <Text style={styles.header}>
                LOGIN
            </Text>

                <TextInput
                style={styles.emailInput}
                placeholder={'email'}
                underlineColorAndroid= 'transparent'
                value={this.props.email}
                onChangeText={email => this.setState({email})}
                />

                <TextInput
                style={styles.passInput}
                placeholder={'Password'}
                underlineColorAndroid= 'transparent'
                secureTextEntry= {true}
                value={this.props.password}
                onChangeText={password => this.setState({password})}
                />

                <TouchableOpacity style={styles.loginbtn}
                onPress={this.onLoginpress.bind(this)}>
                    <Text style={styles.loginTxt}>Login</Text>
                </TouchableOpacity>

                <Text style={styles.forgotTxt}
                onPress={() => this.props.navigation.navigate('ResetPass')}>
                    forgot Password? 
                </Text>

                <Text style={styles.refSign}
                onPress={() => this.props.navigation.navigate('SignUp')}>
                    Don't have an account? Sign Up here! 
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
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
    },
    header: {
        fontSize: 25
    },
    emailInput: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: '#000',
        color: '#ff1a53',
        marginHorizontal: 25
    },
    passInput: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: '#000',
        color: '#ff1a53',
        marginHorizontal: 25
    },
    loginbtn: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        backgroundColor: '#ff1a53',
        justifyContent: 'center',
        marginTop: 20
    },
    loginTxt: {
        color: "#fff",
        fontSize: 16,
        textAlign: 'center'
    },
    forgotTxt: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10,
        color: '#fff'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    refSign: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10,
        color: '#fff',
    }
  });
  