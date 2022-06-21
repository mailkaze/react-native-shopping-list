import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function List({ navigation }) {
  return (
    <View>
      <Text>List</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Form')}>
        <Text>Crear nuevo producto</Text>
      </TouchableOpacity>
    </View>
  )
}