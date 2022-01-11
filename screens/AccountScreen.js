import React, { useContext } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { UserContext } from '../contexts/UserContext'
import { PostContext } from '../contexts/PostContext';
import Constants from 'expo-constants';

const apiUrl = Constants.manifest.extra.apiUrl;

const AccountScreen = ({ navigation }) => {

  const userCtx = useContext(UserContext);
  const postCtx = useContext(PostContext);

  async function OnSignOut(navigation) {
    var status;
    const res = await fetch(`${apiUrl}/auth/logout`, {
      body: JSON.stringify({
        user: userCtx.userData.userId
      }),
      headers: { "Content-Type": "application/json" },
      method: 'POST'
    })
      .then(response => {
        status = response.status;
        if (status == 204) {
          navigation.navigate('SignInScreen');
          userCtx.setUserData({
            loggedIn: false,
            token: '',
            userId: null,
            email: '',
            password: ''
          });
          postCtx.setPosts([]);
      }})
      .catch((reason) => {
        console.log(`${reason} ${apiUrl}/auth/logout`)
      });
  }

  return (
    <View style={{backgroundColor: '#ddd', height: '100%', marginTop: 25}}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Post Scriptum
        </Text>
        <View style={styles.header}>
          <Text style={styles.welcome}>Witaj, {userCtx.userData.email}!</Text>
        </View>
        <View style={styles.body}>
          <View>
            <TouchableOpacity style={styles.option} onPress={() => console.log('\'Change email\' handler not implemented')}>
              <Text style={styles.optionText}>Zmień adres e-mail</Text>
              <Feather
                name="chevron-right"
                color="#4A4A4A"
                size={22}
                style={{ textAlignVertical: 'center', paddingRight: 13 }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.option} onPress={() => console.log('\'Change password\' handler not implemented')}>
              <Text style={styles.optionText}>Zmień hasło</Text>
              <Feather
                name="chevron-right"
                color="#4A4A4A"
                size={22}
                style={{ textAlignVertical: 'center', paddingRight: 13 }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.option} onPress={() => console.log('\'Delete account\' handler not implemented')}>
              <Text style={styles.optionText}>Usuń konto</Text>
              <Feather
                name="chevron-right"
                color="#4A4A4A"
                size={22}
                style={{ textAlignVertical: 'center', paddingRight: 13 }}
              />
            </TouchableOpacity>
          </View>
          {/*TODO: prawdziwe wylogowanie (appCtx, unieważnienie jwt))*/}
          <TouchableOpacity style={styles.button} onPress={() => OnSignOut(navigation)}>
            <Text style={styles.buttonText}>Wyloguj</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default AccountScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.22;

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
    backgroundColor: '#FFF4E4'
  },
  header: {
    alignItems: 'center',
  },
  welcome: {
    marginTop: '15%',
    fontSize: 28,
    fontWeight: 'bold',
  },
  option: {
    flexDirection: 'row',
    width: '80%',
    height: 45,
    marginVertical: height * 0.013,
    borderWidth: 3,
    borderColor: '#4A4A4A',
    borderRadius: 10,
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    textAlignVertical: "center",
    marginLeft: '8%'
  },
  body: {
    flex: 2,
    alignItems: 'center',
    marginTop: '15%'
  },
  button: {
    width: '30%',
    marginTop: height * 0.014,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: 'coral',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  }
});