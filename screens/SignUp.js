import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function SignUp({ navigation, route }) {
  return (
    <View>
      <Text>SignUp</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Ya tengo una cuenta</Text>
      </TouchableOpacity>
    </View>
  )
}