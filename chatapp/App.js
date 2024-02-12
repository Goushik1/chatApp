import { Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {SplashScreen,Homescreen, LoginScreen,SignUpScreen, AddToChat, ChatScreen, ProfileScreen} from './screens';

const Stack = createNativeStackNavigator();
import { Provider } from 'react-redux';
import Store from './context/store';

const App = ()=> {
  return (
    
      <NavigationContainer>
      <Provider store={Store}>
        <Stack.Navigator screenOptions={{headerShown:false}}>
        {<Stack.Screen name="SpalshScreen" component={SplashScreen} />}
        {<Stack.Screen name="LoginScreen" component={LoginScreen} />}
        {<Stack.Screen name="SignUpScreen" component={SignUpScreen} />}
        {<Stack.Screen name="HomeScreen" component={Homescreen} />}
        {<Stack.Screen name="AddToChat" component={AddToChat} />}
        {<Stack.Screen name="ChatScreen" component={ChatScreen} />}
        {<Stack.Screen name="ProfileScreen" component={ProfileScreen} />}

        
        </Stack.Navigator>
      </Provider>
      
    </NavigationContainer>
     
  );
};
export default App;