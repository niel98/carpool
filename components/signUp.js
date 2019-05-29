import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, Alert, Picker, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import Spinner from 'react-native-spinkit';
// import console = require('console');

const {width: WIDTH} = Dimensions.get('window');

export default class SignUp extends React.Component{

    fireusers = firebase.database().ref('/Users');
    
    constructor(props) {
        super(props);
        this.state= {
            emailS: '',
            username: '',
            type: 'driver',
            passwordS: '',
            conPasswordS: '',
            loading: false
        }
    }

     

    onSignUpPress = () => {

        this.setState({
            loading: true,
        })
        
        if (this.state.passwordS != this.state.conPasswordS) {
            Alert.alert('Passwords do not match!');
            return;
        }

        // this.setState({loading: true})

        firebase.auth().createUserWithEmailAndPassword(this.state.emailS, this.state.passwordS)
            .then(() => {

                this.setState({
                    loading: false,
                })

                this.fireusers.child(firebase.auth().currentUser.uid).set({

                    username: this.state.username,
                    type: this.state.type

                }).then(()=>{

                    Alert.alert('Sign Up successful!');
                    this.props.navigation.navigate('login'); 

                }, err=> {
                    this.setState({
                        loading: false,
                    })
                    Alert.alert(err.message);
                })
            }, (error) => {
                Alert.alert(error.message)
            })

            //add newly signed user to database.
            // if (this.state.type == 'driver') {
            //     firebase.database().ref('Users/').child('Drivers').push().set({
                    
            //     })
            // } else {
            //     firebase.database().ref('Users/').child('Passengers').push().set({
            //         username: this.state.username,
            //         type: this.state.type
            //     })
            // }
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
                <Text style={styles.headerS}>
                SIGNUP
            </Text>

                <TextInput
                style={styles.emailInputS}
                placeholder={'email'}
                underlineColorAndroid= 'transparent'
                value={this.props.emailS}
                onChangeText={emailS => this.setState({emailS})}
                />

                <TextInput
                style={styles.Username}
                placeholder={'username'}
                underlineColorAndroid= 'transparent'
                value={this.props.username}
                onChangeText={username => this.setState({username})}
                />

                <Picker
                selectedValue={this.state.type}
                style={{
                height: 50,
                width: 100,
                color: '#fff'
                 }}
                onValueChange={(itemValue, itemIndex) => this.setState({type: itemValue})}>
                <Picker.Item label="Driver" value="driver" />
                <Picker.Item label="Passenger" value="passenger" />
                </Picker>
                    {console.log(this.state.type)}

                <TextInput
                style={styles.passInputS}
                placeholder={'Password'}
                underlineColorAndroid= 'transparent'
                secureTextEntry= {true}
                value={this.props.passwordS}
                onChangeText={passwordS => this.setState({passwordS})}
                />

                <TextInput
                style={styles.conPassInputS}
                placeholder={'Confirm Password'}
                underlineColorAndroid= 'transparent'
                secureTextEntry= {true}
                value={this.props.conPasswordS}
                onChangeText={conPasswordS => this.setState({conPasswordS})}
                />

                <TouchableOpacity style={styles.signUpbtn}
                onPress={this.onSignUpPress.bind(this)}>
                    <Text style={styles.signUpTxt}>SignUp</Text>
                </TouchableOpacity>

                <Text style={styles.refSignIn}
                onPress={() => this.props.navigation.navigate('login')}>
                    Sign In
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
    },
    headerS: {
            fontSize: 25
    },
    emailInputS: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: '#000',
        color: '#ff1a53',
        marginHorizontal: 25
    },
    Username: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: '#000',
        color: '#ff1a53',
        marginHorizontal: 25
    },
    passInputS: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: '#000',
        color: '#ff1a53',
        marginHorizontal: 25
    },

    conPassInputS: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: '#000',
        color: '#ff1a53',
        marginHorizontal: 25
    },
    signUpbtn: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        backgroundColor: '#ff1a53',
        justifyContent: 'center',
        marginTop: 20
    },
    signUpTxt: {
        color: "#fff",
        fontSize: 16,
        textAlign: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    refSignIn: {
        color: '#fff',
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center'
    }
  });
