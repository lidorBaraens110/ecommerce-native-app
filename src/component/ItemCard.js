import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, Dimensions, Button, TouchableOpacity } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import ColorGroup from '../component/colorGroup'

export default function ItemCard({ double, cC, discount,
    price, item, goToItem, handleWishList }) {

    const [currentColor, setCurrentColor] = useState(Object.keys(item.oneSize.colors)[0]);

    const handleCurrentColor = (color) => {
        setCurrentColor(color)
    }

    return (
        <View style={[styles.card, {
            paddingRight: double ? 12 : 6,
            paddingLeft: double ? 6 : 12,
        }]} >
            <View style={styles.imageCard} >
                <TouchableOpacity style={{ height: '100%', width: '100%' }} onPress={() => goToItem(item)}>
                    <Image source={{ uri: item.oneSize.colors[currentColor].images[0].url }} style={styles.image} />
                </TouchableOpacity>
                <IconButton onPress={() => handleWishList(item)} style={{ position: 'absolute', bottom: 10, right: -3, backgroundColor: '#d4d4d4', borderColor: 'black', borderWidth: 1 }} size={18} icon={() =>
                    <AntDesign name={item.wishList ? 'heart' : 'hearto'} size={18} color={item.wishList ? 'red' : 'black'}
                    />} />

            </View>
            <Text style={styles.text}>&#8362; {price}.00</Text>
            <ColorGroup colors={item.oneSize.colors} handleCurrentColor={handleCurrentColor} currentColor={currentColor} />


        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width / 2,
    },
    imageCard: {
        zIndex: 10,
        backgroundColor: 'white',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: Dimensions.get('window').width / 1.5
    },
    image: {
        height: '100%', width: '100%', resizeMode: 'contain'
    },
    text: {
        zIndex: 20,
        marginTop: -8,
        fontSize: 15,
        fontWeight: 'bold'
    },
})
