import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { ListItem } from '@rneui/themed'

export default function List({ navigation, products }) {
  return (
    <ScrollView>
      <Text>List</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Form')}>
        <Text>Crear nuevo producto</Text>
      </TouchableOpacity>
      {
        products.map(prod => (
          <ListItem
            key={prod.id}
            bottomDivider
          >
            <ListItem.Chevron />
            <ListItem.Content>
              <ListItem.Title>{prod.name}</ListItem.Title>
              {/* <ListItem.Subtitle>{user.email}</ListItem.Subtitle> */}
            </ListItem.Content>
          </ListItem>
        ))
      }
    </ScrollView>
  )
}