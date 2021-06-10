import React from 'react'
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishList, setItem } from '../redux/actions';
import ItemColumnsList from '../component/itemColumnsList';

export default function wishList({ route, navigation }) {

    const dispatch = useDispatch()
    const wishList = useSelector(state => state.wishList);

    const removeItem = ({ item }) => {
        dispatch(removeFromWishList(item._id))
    }

    const navigateToItem = (item) => {
        dispatch(setItem({ item: item, cC: Object.keys(item.oneSize.colors)[0] }))
        navigation.navigate('TheHome', { screen: 'Item' })
    }

    return (
        <View >
            <Text style={{ fontSize: 15, textAlign: 'center', padding: 2, backgroundColor: '#d3d3d3' }}>רשימת המשאלות</Text>
            {wishList.length > 0 && <ItemColumnsList cart={false}
                length={wishList.length}
                items={wishList}
                handleRemove={removeItem}
                goToItem={navigateToItem} />}

        </View>
    )
}

const styles = StyleSheet.create({})
