import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
enableScreens();

import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CoreContext from 'src/core/context';
import Home from 'src/screens/Home';
import Create from 'src/screens/Create';
import Play from 'src/screens/Play';
import Loading from 'src/screens/Loading';

const Stack = createStackNavigator();

export default function Router() {
  const {ready} = useContext(CoreContext);

  if (!ready) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal" headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Create" component={Create} />
        <Stack.Screen name="Play" component={Play} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
