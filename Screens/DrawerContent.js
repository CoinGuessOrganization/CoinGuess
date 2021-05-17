import React, { useState } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native';
import { Avatar, Drawer} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function DrawerContent(props) {
    const [unit, setUnit] = useState("USD");

    const change = () => {
        if(unit == "TRY" )setUnit("USD")
        else setUnit("TRY")
      }
    return(
        <View style={{flex:1, backgroundColor:"#dcdcdc"}}>
            <StatusBar barStyle="dark-content" backgroundColor="#dcdcdc"/>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View>
                        <View style={{marginTop: 15,alignSelf:"center"}}>
                            <Avatar.Image 
                                source = {require('../assets/CGlogo.png')}
                                size={120}
                            />
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Avatar.Image
                                source = {require('../assets/bitcoin.png')}
                                backgroundColor = "#dcdcdc"
                                size={40}
                                />
                            )}
                            label="Bitcoin"
                            
                            onPress={() => {props.navigation.navigate('BTC')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Avatar.Image
                                source = {require('../assets/ethereum.png')}
                                backgroundColor = "#dcdcdc"
                                size={40}
                                />
                            )}
                            label="Ethereum"
                            onPress={() => {props.navigation.navigate('ETH')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Avatar.Image
                                source = {require('../assets/ripple.png')}
                                size={40}
                                />
                            )}
                            label="Ripple"
                            onPress={() => {props.navigation.navigate('XRP')}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="autorenew" 
                        color={color}
                        size={size}
                        />
                    )}
                    label={unit}
                    onPress={change}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    drawerSection: {
      marginTop: 45,
    },
    bottomDrawerSection: {
        marginBottom: 15,
    },
  });