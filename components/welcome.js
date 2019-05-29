import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import * as firebase from 'firebase';

const {width: WIDTH} = Dimensions.get('window');

export default class Welcome extends React.Component {

  static navigationOptions= {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      authentication: false,
    }
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authentication: true
        })
      } else {
        this.setState({
          authentication: false
        })
      }
    })
  }

  render() {
    // if (!this.state.authentication) {
    //   return <Welcome />
    // } else {
    //   this.fireusers.child(firebase.auth().currentUser.uid).once('value', snapshot => {
    //     this.type = snapshot.val().type;
    //     console.log(this.type)

    //     if (snapshot.val().type == 'passenger') {

    //         this.props.navigation.navigate('FeedP');

    //     } else if (snapshot.val().type == 'driver') {

    //         this.props.navigation.navigate('FeedD');
    //     } else {

    //     }

    // })
    // }
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeTxt}>C A R P O O L</Text>

        <TouchableOpacity style={styles.loginbtn}
        onPress={() => this.props.navigation.navigate('login')}>
            <Text style={styles.loginTxt}>Login</Text>
            </TouchableOpacity>

        <TouchableOpacity style={styles.signUpbtn}
        onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={styles.signUpTxt}>SignUp</Text>
            </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff1a53',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeTxt: {
    color: '#fff',
    marginBottom: 15,
    fontSize: 20,
    paddingBottom: 250
  },
  loginbtn: {
    width: WIDTH - 55,
    height: 45,
    backgroundColor: '#000',
    borderRadius: 45,
    justifyContent: 'center',
    fontSize: 16,
    marginTop: 20
  },
  signUpbtn: {
    width: WIDTH - 55,
    height: 45,
    backgroundColor: '#000',
    borderRadius: 45,
    justifyContent: 'center',
    fontSize: 16,
    marginTop: 20
  },
  loginTxt: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  signUpTxt: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  }
});
