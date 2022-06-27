import { View, Text } from 'react-native'
import { CurrentUserContext } from '../App'
import React, { useState, useEffect, useContext } from 'react'
import List from './List'
import { firebaseApp } from '../firebase'
import { getFirestore, collection, onSnapshot, query, where } from 'firebase/firestore'

const firestore = getFirestore(firebaseApp)

export default function Main({ navigation, route }) {
  const initialProductsValue = []
  const [products, setProducts] = useState(initialProductsValue)
  const { currentUser } = useContext(CurrentUserContext)

  useEffect(() => {
    const prodsQuery = query(collection(firestore, 'shoppingElements'), where("uid", "==", currentUser.uid))
    unsubscribe = onSnapshot(prodsQuery, querySnapshot => {
      if (!querySnapshot.empty) {
        const docs = []; 
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        })
        console.log(docs.length);
        setProducts(docs)
      } else {
        setProducts(initialProductsValue)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <View>
      <Text>Main</Text>
      <List navigation={navigation} products={products} />
    </View>
  )
}