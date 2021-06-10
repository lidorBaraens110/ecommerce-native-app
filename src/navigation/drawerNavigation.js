import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import React from 'react';
import { View, Text, Button } from 'react-native';
import Feed from '../screen/Feed';
import Home from '../screen/Home';

const Drawer = createDrawerNavigator();
import DrawerContent from './drawerContent';

export default function MyDrawer() {
    return (
        <Drawer.Navigator drawerPosition='right' drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="HomeDrawer" component={Home} />
            <Drawer.Screen name="SupportScreen" component={Feed} />

        </Drawer.Navigator>
    );
}

function CustomDrawerContent(props) {

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label={({ focused }) => <Text>hello {focused}</Text>}

                onPress={(p) => props.navigation.navigate('Home', { screen: 'Home', name: 'lidor' })}
            />
        </DrawerContentScrollView>
    );
}