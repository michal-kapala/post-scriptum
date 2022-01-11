import React, { useState, useContext } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput, ScrollView
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { UserContext } from '../contexts/UserContext'
import { PostContext } from '../contexts/PostContext';
import Constants from 'expo-constants';

const apiUrl = Constants.manifest.extra.apiUrl;

const SignInScreen = ({ navigation }) => {
  const [signInError, setSignInError] = useState();
  const error = 'Niepoprawny e-mail lub hasło';
  var userCtx = useContext(UserContext);
  var postCtx = useContext(PostContext);

  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true
  });

  const handleEmailChange = (val) => {
    setData({
      ...data,
      email: val
    });
  }

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val
    });
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  async function onSignInPress() {

    if (data.email == "") {
      setSignInError('E-mail nie może być pusty')
      return
    }
    else if (data.password == "") {
      setSignInError('Hasło nie może być puste')
      return
    }
    //Długość tymczasowo zmieniona na 3 dla wygody testowania
    else if (data.password.length < 3) {
      setSignInError('Niepoprawny e-mail lub hasło')
      return
    }

    var status, tokenStr = null, user_id = null;
    const res = await fetch(`${apiUrl}/auth/login`, {
      body: JSON.stringify({
        email: data.email,
        password: data.password
      }),
      headers: { "Content-Type": "application/json" },
      method: 'POST'
    })
      .then(response => {
        status = response.status;
        return response.json();
      })
      .then(body => {
        var jsonStr = JSON.stringify(body);
        var jsonObj = JSON.parse(jsonStr);
        tokenStr = jsonObj.token;
        user_id = jsonObj.user_id;
        if (status == 200) {
          userCtx.setUserData({
            loggedIn: true,
            token: tokenStr,
            userId: user_id,
            email: data.email,
            password: data.password
          });
          console.log('Received auth token: \n' + tokenStr + ' for user ' + user_id);
          navigation.navigate('AccountScreen');
        }
        else if (status == 401) {
          setSignInError(error);
        }
      }).catch((reason) => {
        console.log(`${reason} ${apiUrl}/auth/login`)
      });
    if (tokenStr && user_id) {
      var params = new URLSearchParams({ "user_id": user_id });
      postCtx.updatePosts(tokenStr, params);
    }
  }

  return (
    <View style={{backgroundColor: '#ddd', height: '100%', marginTop: 25}}>
        <ScrollView style={styles.container}>
            <Text style={styles.titleText}>
                Post Scriptum
            </Text>
            <View style={styles.header}>
                <Text style={{ marginVertical: 18, color: 'red', fontSize: 15 }}>{signInError}</Text>
            </View>
            <View style={styles.body}>
                <TextInput
                placeholder="Adres e-mail"
                placeholderTextColor="#555"
                placeholderStyle={{}}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => handleEmailChange(val)}
                />
            </View>
            <View style={styles.passwordContainer}>
                <TextInput
                placeholder="Hasło"
                placeholderTextColor="#555"
                secureTextEntry={data.secureTextEntry ? true : false}
                style={styles.textInputPass}
                autoCapitalize="none"
                onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                  onPress={() => updateSecureTextEntry()}>
                {data.secureTextEntry ?

                    <Feather
                    name="eye-off"
                    color="grey"
                    size={20}
                    style={{ marginTop: 3 }}
                    />
                    :
                    <Feather
                    name="eye"
                    color="grey"
                    size={20}
                    style={{ marginTop: 3 }}
                    />
                }
                </TouchableOpacity>
            </View>
            <TouchableOpacity 
                onPress={() => console.log('\'Forgot password?\' handler not implemented')}
            >
                <Text style={styles.forgotPassword}>
                    Zapomniałeś hasła?
                </Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.loginButton} onPress={onSignInPress}>
                  <Text style={{ color: '#fff', fontWeight: '900' }}>Zaloguj się</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerButton} onPress={() => console.log('\'Create account\' handler not implemented')}>
                < Text style={{ color: '#fff', fontWeight: '900' }}>Utwórz konto</Text>
                </TouchableOpacity>
            </View>
        
        </ScrollView>
    </View>
  )
}
export default SignInScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.25;

//#362893

const styles = StyleSheet.create({
    titleText: {
        textAlign: 'center',
        paddingVertical: 10,
        fontSize: 28,
        backgroundColor: 'coral', //#FF7F50
        color: '#FFF4E4'
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF4E4',
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '22%'
    },
    body: {
        flex: 3,
    },
    forgotPassword: {
        color: '#000',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 13,
        marginHorizontal: '15%',
        paddingTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 10,
    },
    loginButton: {
        flexDirection: 'row',
        height: 50,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'coral', //#362893
        borderRadius: 20,
        padding: 10,
        marginHorizontal: 10,
    },
    registerButton: {
        flexDirection: 'row',
        height: 50,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'mediumslateblue', //#FF5959
        borderRadius: 20,
        padding: 10,
        marginHorizontal: 10,
    },

    textInput: {
        marginLeft: '10%',
        marginBottom: 15,
        width: '80%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#ddd',
        borderRadius: 40,
    },

    passwordContainer: {
        flexDirection: 'row',
        marginLeft: '10%',
        width: '80%',
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#E2E1E1',
        borderRadius: 40,
    },
    textInputPass: {
        flex: 1,
    },

    logo: {
        width: height_logo,
        height: height_logo,
        marginTop: 20,
    }
});