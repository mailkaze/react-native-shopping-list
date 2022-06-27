import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Input, Button } from '@rneui/themed'
import { firebaseApp } from '../firebase'
import { getAuth, signInWithEmailAndPassword  } from 'firebase/auth'

const auth = getAuth(firebaseApp)

export default function Login({ navigation, route }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function emailLogin(e) {
    signInWithEmailAndPassword(auth, email, password)
    // .then(() => navigation.navigate('List'))
    .catch(error => {
      alert("Error, email y/o contraseña no válidos.")
    })
  }

  return (
    <View>
      <Text>Login</Text>
      <Input 
        placeholder='Email'
        keyboardType='email-address'
        textContentType='emailAddress'
        autoCapitalize='none'
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input 
        placeholder='Password'
        secureTextEntry={true}
        textContentType='password'
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text>No tengo cuenta</Text>
      </TouchableOpacity>
      <Button
        onPress={emailLogin}
        title="Entrar con Email"
        buttonStyle={{
          backgroundColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 3,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})