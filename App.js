import { useContext, createContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { firebaseApp } from './firebase'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import Main from './screens/Main';
import Form from './screens/Form';
import  { Avatar, SearchBar } from '@rneui/themed'

const auth = getAuth(firebaseApp)

const Stack = createNativeStackNavigator()

export const CurrentUserContext = createContext()

const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  return (
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
      { children }
    </CurrentUserContext.Provider>
  )
}

const AuthStack = () => (
  <Stack.Navigator
    // options={{
    //   title: 'hola',
    //   headerRight: () => <Button title='hola' />
    // }}
  >
    <Stack.Screen 
      name="Login"
      title='Iniciar sesión'
      component={Login}
      options={{
        headerLeft: () => <Avatar size={40} source={require('./assets/canasta.png')}/>,
        headerRight: () => <Avatar size={40} source={require('./assets/profile_placeholder.png')} rounded/>,
        headerStyle: {
          backgroundColor: '#fca311',
        },
      }}
    />
    <Stack.Screen 
      name='SignUp'
      title='Crear cuenta'
      component={SignUp}
      options={{
        headerLeft: () => <Avatar size={36} source={require('./assets/canasta.png')}/>,
        headerRight: () => <Avatar size={36} source={require('./assets/profile_placeholder.png')} rounded/>,
        headerStyle: {
          backgroundColor: '#fca311',
        },
      }}
    />
  </Stack.Navigator>
)

const ListStack = () => {
  const [searchText, setSearchText] = useState('')
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Main'
        component={Main}
        options={{
          headerTitleAlign: 'center',
          headerLeft: () => <Avatar size={36} source={require('./assets/canasta.png')}/>,
          headerTitle: () => <SearchBar
            placeholder="Busca un producto ..."
            onChangeText={setSearchText}
            value={searchText}
            round
            containerStyle={{backgroundColor: 'transparent', borderBottomWidth: 0, borderTopWidth: 0}}
            inputContainerStyle={{backgroundColor: 'white', borderRadius: 50, width: 240, border: 'none', height: 36}}
          />,
          headerRight: () => <Avatar size={36} source={require('./assets/profile_placeholder.png')} rounded onPress={() => signOut(auth)} />,
          headerStyle: {
            backgroundColor: '#fca311',
          },
        }}
      />
      <Stack.Screen
        name='Form'
        component={Form}
      />
    </Stack.Navigator>
  )
} 

const RootNavigator = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
  console.log(currentUser ? currentUser.uid : 'no hay usuario registrado');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, 
      async (user) => {
        user ? setCurrentUser(user) : setCurrentUser(null)
      }
    )

    return () => unsubscribe()
  }, [])

  return (
    <NavigationContainer>
      {currentUser ? <ListStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <CurrentUserProvider>
      <RootNavigator />
      <StatusBar style="auto" />
    </CurrentUserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    width: 240,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderWidth: 0,
    backgroundColor: '#ffffff',
    borderRadius: 50,
  }
});
