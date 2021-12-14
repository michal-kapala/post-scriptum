import React, { useContext } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { UserContext } from '../contexts/UserContext'

const AccountScreen = ({ navigation }) => {

  const userCtx = useContext(UserContext);

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
        return response.json();
      })
      .then(body => {
        if (status == 200) {
          navigation.navigate('SignInScreen')
        }
      }).catch((reason) => {
        console.log(`${reason} ${apiUrl}/auth/logout`)
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Witaj, Jan Kowalski!</Text>
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
        <TouchableOpacity style={styles.button} onPress={(navigation) => OnSignOut(navigation)}>
          <Text style={styles.buttonText}>Wyloguj</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AccountScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.22;

//#362893

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flex: 2,
    alignItems: 'center',
  },
  logo: {
    width: height_logo,
    height: height_logo,
    marginTop: height * 0.05
  },
  welcome: {
    marginTop: height * 0.03,
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
    marginTop: height * 0.03
  },
  button: {
    width: '30%',
    marginTop: height * 0.014,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#4A4A4A',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  }
});