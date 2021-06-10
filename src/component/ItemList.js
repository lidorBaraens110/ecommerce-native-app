import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, FlatList, Dimensions, SafeAreaView, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import ItemCard from './ItemCard';

const numColumns = 2;

const ItemList = ({ items, goToItem, handleWishList }) => {


    const formatData = (data, numColumns) => {
        const numberOfFullRows = Math.floor(data.length / numColumns);
        let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
            numberOfElementsLastRow++;
        }
        return data;
    };


    const renderItem = ({ item, index }) => {

        if (item.empty) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }
        return (

            <ItemCard name={item.name}
                item={item}
                double={index % 2 ? true : false}
                cC={Object.keys(item.oneSize.colors)[0]}
                discount={item.discount}
                goToItem={goToItem}
                id={item._id}
                price={item.price}
                handleWishList={handleWishList}
            />

        )
    };
    return (
        <FlatList nestedScrollEnabled
            data={formatData(items, numColumns)}
            keyExtractor={item => item._id}
            renderItem={renderItem}
            numColumns={numColumns}

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
        height: Dimensions.get('window').width / numColumns, // approximate a square
    },
    itemCheck: {
        backgroundColor: 'green',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / numColumns,
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    itemText: {
        color: '#000',
    },
});

export default ItemList;