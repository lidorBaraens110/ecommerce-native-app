import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screen/Home";
import FeedScreen from '../screen/Feed';
import ItemScreen from '../screen/Item';
import CartScreen from '../screen/Cart';
import WishListScreen from '../screen/wishList';
import UserDetailsScreen from '../screen/UserDetails';
import SearchScreen from '../screen/Search';
import ReceiveScreen from '../screen/Receive';
import { Image, View, TouchableOpacity } from 'react-native';
import { Button, Text, useTheme, IconButton } from 'react-native-paper';
import { Feather, AntDesign, Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { HeaderLeft, HeaderRight } from './header';



const Stack = createStackNavigator();




const StackNavigation = (props) => {
    const cart = useSelector(state => state.cart)

    const paperTheme = useTheme()

    const globalHeader = {
        headerStyle: {
            height: 80,

        },
        headerTitle: () =>
            <Text style={{ fontSize: 35, fontWeight: '500', textAlign: 'center' }}>MONO</Text>,
        headerLeft: () => <HeaderRight {...props} />
        ,
        headerRight: () => <HeaderLeft  {...props} />,
        gestureEnabled: false
    }

    return (
        <Stack.Navigator initialRouteName="TheHome" headerMode='screen'>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={globalHeader}

            />
            <Stack.Screen
                name="Feed"
                component={FeedScreen}
                options={
                    globalHeader
                }
            /><Stack.Screen
                name="Item"
                component={ItemScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Cart"
                component={CartScreen}
                options={
                    globalHeader
                }
            />
            <Stack.Screen
                name="WishList"
                component={WishListScreen}
                options={
                    globalHeader
                }
            />
            <Stack.Screen
                name="UserDetails"
                component={UserDetailsScreen}
                options={
                    globalHeader
                }
            />
            <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={
                    globalHeader
                }
            />
            <Stack.Screen
                name="Receive"
                component={ReceiveScreen}
                options={
                    globalHeader
                }
            />

        </Stack.Navigator>
    )
}

export default StackNavigation;



