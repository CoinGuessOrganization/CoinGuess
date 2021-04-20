import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';

import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function DrawerContent(props) {

    return(
        <View style={{flex:1, backgroundColor:"#dcdcdc"}}>
            <StatusBar barStyle="light-content" backgroundColor="#dcdcdc"/>
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
                            
                            onPress={() => {props.navigation.navigate('A')}}
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
                            onPress={() => {props.navigation.navigate('B')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Avatar.Image
                                source = {require('../assets/ripple.png')}
                                size={40}
                                />
                            )}
                            label="Ripple"
                            onPress={() => {props.navigation.navigate('C')}}
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
                    label="USD - TRY " 
                    onPress={() => {signOut()}}//değiştir
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