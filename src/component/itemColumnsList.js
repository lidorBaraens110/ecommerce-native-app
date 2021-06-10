import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, FlatList, Dimensions, SafeAreaView, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import ItemColumnsCard from './ItemColumnsCard';


const ItemColumnsList = ({ items, goToItem, handleQ, handleRemove, length, cart }) => {


    const renderItem = ({ item, index }) => {
        if (!item) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }
        if (cart) {
            return (
                <ItemColumnsCard name={item.item.name}
                    handleQ={cart && handleQ}
                    item={item.item}
                    cC={cart && item.currentColor}
                    discount={item.item.discount}
                    goToItem={goToItem}
                    id={item.item._id}
                    price={item.item.price}
                    quantity={cart && item.quantity}
                    handleRemove={handleRemove}
                    cart={cart}
                />
            )
        } else {

            return <ItemColumnsCard name={item.name}
                item={item}
                cC={Object.keys(item.oneSize.colors)[0]}
                discount={item.discount}
                goToItem={goToItem}
                id={item._id}
                price={item.price}
                handleRemove={handleRemove}
                cart={cart}
            />

        }
    };
    return (
        <FlatList
            data={items}
            keyExtractor={item => cart ? item.currentColor : item._id}
            renderItem={renderItem}
            style={{ backgroundColor: 'white', marginBottom: 170 }}
        />

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
    },
    item: {
        zIndex: 10,
        backgroundColor: 'white',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        // height: Dimensions.get('window').width / numColumns, // approximate a square
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    itemCheck: {
        backgroundColor: 'green',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        // height: Dimensions.get('window').width / numColumns,
    },

    itemText: {
        color: '#000',
    },
});

export default ItemColumnsList;