import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Login({ navigation, route }) {
  return (
    <View>
      <Text>Login</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text>No tengo cuenta</Text>
      </TouchableOpacity>
    </View>
  )
}