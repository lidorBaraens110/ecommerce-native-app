import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import ItemColumnsList from '../component/itemColumnsList';
import { handleQuantity, removeFromCart, setItem } from '../redux/actions';


export default function Cart({ navigation, route }) {

    const paperTheme = useTheme();
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [total, setTotal] = useState();

    useEffect(() => {
        let newTotal = 0
        cart.forEach(item => {
            newTotal = newTotal + item.item.price * item.quantity
        })
        setTotal(newTotal)
    }, [cart])
    const handleQ = ({ item, currentColor, quantity }) => {
        dispatch(handleQuantity({ item, currentColor, quantity }))
    }

    const handleRemove = ({ item, currentColor }) => {
        dispatch(removeFromCart({ item, currentColor }))
    }

    const goToItem = (item) => {
        dispatch(setItem({ item: item, cC: Object.keys(item.oneSize.colors)[0] }))
        navigation.navigate('TheHome', { screen: 'Item' })
    }
    const handlePay = () => {
        navigation.navigate('UserDetails');
    }
    return (

        <View style={{ height: Dimensions.get('window').height, backgroundColor: '#d3d3d3' }}>
            <Text style={{ fontSize: 15, textAlign: 'center', padding: 2 }}>סל הקניות</Text>
            {cart.length > 0 && <ItemColumnsList length={cart.length} cart={true} items={cart} handleQ={handleQ} goToItem={goToItem} handleRemove={handleRemove} />}
            <View style={styles.bottomView} >
                <Text style={{ marginBottom: 5, fontSize: 15 }}> סך הכל: {total} &#8362; </Text>
                <TouchableOpacity onPress={handlePay} style={[styles.button,
                { backgroundColor: paperTheme.dark ? 'white' : 'black' }]} >
                    <Text style={{ fontWeight: '600', color: paperTheme.dark ? 'black' : 'white' }} >
                        לתשלום
                        </Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    bottomView: {
        position: 'absolute',
        bottom: 80,
        width: '100%',
        flexDirection: 'column',
        padding: 10,
        backgroundColor: 'white'
    },
    button: {
        padding: 15,
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',

    },
})
