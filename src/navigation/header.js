import React from 'react'
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Text, useTheme, IconButton } from 'react-native-paper';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

export function HeaderLeft({ navigation }) {

    const cart = useSelector(state => state.cart)
    const wishList = useSelector(state => state.wishList)
    const paperTheme = useTheme()


    return (
        <View style={{ flexDirection: 'row' }}>
            <View>
                <IconButton onPress={() => navigation.navigate('WishList')} style={{ marginRight: -5 }}
                    icon={() => <AntDesign name="hearto" size={22} color={paperTheme.dark ? 'white' : 'black'} />}
                />
                {wishList.length > 0 &&
                    <View
                        style={{
                            position: 'absolute',
                            backgroundColor: 'red',
                            width: 16,
                            height: 16,
                            borderRadius: 15 / 2,
                            right: 10,
                            top: +10,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: "#FFFFFF",
                                fontSize: 8,
                            }}>
                            {wishList.length}
                        </Text>
                    </View>

                }
            </View>
            <View>
                <IconButton onPress={() => navigation.navigate('Cart')}
                    icon={() => <AntDesign name="shoppingcart" size={24} color={paperTheme.dark ? 'white' : 'black'} />}
                />
                {cart.length > 0 &&
                    <View
                        style={{
                            position: 'absolute',
                            backgroundColor: 'red',
                            width: 16,
                            height: 16,
                            borderRadius: 15 / 2,
                            left: 10,
                            top: +10,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: "#FFFFFF",
                                fontSize: 8,
                            }}>
                            {cart.length}
                        </Text>
                    </View>

                }
            </View>


        </View>
    )
}

export function HeaderRight({ route, navigation }) {
    const paperTheme = useTheme()
    return <IconButton onPress={() => navigation.toggleDrawer()}
        icon={() => <Feather name="menu" size={26} color={paperTheme.dark ? 'white' : 'black'} />}
    />
}

const styles = StyleSheet.create({})
