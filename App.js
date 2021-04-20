import React from 'react';
import { NavigationContainer, } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { DrawerContent } from './Screens/DrawerContent';

import AApp from './Screens/a';
import BApp from './Screens/b';
import CApp from './Screens/c';


const App = () => {

  const Drawer = createDrawerNavigator();

  return (

    <NavigationContainer>
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="A" component={AApp} />
          <Drawer.Screen name="B" component={BApp} />
          <Drawer.Screen name="C" component={CApp} />
        </Drawer.Navigator>
    </NavigationContainer>

  );
}

export default App;
