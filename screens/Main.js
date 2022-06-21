import { View, Text } from 'react-native'
import React from 'react'
import List from './List'

export default function Main({ navigation, route }) {
  return (
    <View>
      <Text>Main</Text>
      <List navigation={navigation} />
    </View>
  )
}