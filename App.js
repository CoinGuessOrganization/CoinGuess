import React from 'react';
import {StatusBar } from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { DrawerContent } from './Screens/DrawerContent';

import BTC from './Screens/Bitcoin';
import ETH from './Screens/Ethereum';
import XRP from './Screens/Ripple';


const App = () => {

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#dcdcdc"/>
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="BTC" component={BTC} />
          <Drawer.Screen name="ETH" component={ETH} />
          <Drawer.Screen name="XRP" component={XRP} />
        </Drawer.Navigator>
    </NavigationContainer>

  );
}

export default App;
