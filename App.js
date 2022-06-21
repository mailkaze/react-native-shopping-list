import { useContext, createContext, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { firebaseApp } from './firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import Main from './screens/Main';
import Form from './screens/Form';

const auth = getAuth(firebaseApp)

const Stack = createNativeStackNavigator()

const CurrentUserContext = createContext()

const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  return (
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
      { children }
    </CurrentUserContext.Provider>
  )
}

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Login"
      component={Login}
    />
    <Stack.Screen 
      name='SignUp'
      component={SignUp}
    />
  </Stack.Navigator>
)

const ListStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='Main'
      component={Main}
    />
    <Stack.Screen
      name='Form'
      component={Form}
    />
  </Stack.Navigator>
)

const RootNavigator = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
  console.log(currentUser);

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
});
