import React, { useEffect, useState, useRef } from 'react'
import { ActivityIndicator, StyleSheet, View, Button, TouchableOpacity, ScrollView, Dimensions, Animated } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import ColorGroup from '../component/colorGroup';
import ImageSlider from '../component/imageSlider';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToWishList, editCurrentColor } from '../redux/actions';
import { HeaderLeft, HeaderRight } from '../navigation/header';


export default function Item({ route, navigation }) {
    const { item, cC } = useSelector(state => state.item)
    const wishList = useSelector(state => state.wishList)
    const dispatch = useDispatch()
    const paperTheme = useTheme()
    // const { item, cC } = route.params;
    const [loading, setLoading] = useState(true);
    // const [currentColor, setCurrentColor] = useState(cC)
    const [wishListState, setWishListState] = useState(true)


    const handleCurrentColor = (color) => {
        dispatch(editCurrentColor(color))
    }

    const opacity = useRef(new Animated.Value(0)).current;
    const yPosition = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        const x = wishList.find(i => i._id === item._id)
        setWishListState(x)
    }, [wishList])


    const startAnimation = () => Animated.parallel([
        Animated.timing(opacity, {
            useNativeDriver: false,
            toValue: 1,
            duration: 500

        }),
        Animated.timing(yPosition, {
            useNativeDriver: false,
            toValue: 75,
            duration: 1000

        })]).start(() => { startAnimationTwo() });

    const startAnimationTwo = () => {
        Animated.timing(opacity, {
            useNativeDriver: false,
            toValue: 0,
            duration: 500
        }).start(() => yPosition.setValue(50))
    }
    const handleWishlist = () => {
        if (!wishListState) {
            startAnimation()
        }
        dispatch(addToWishList(item))

    }
    const handleCart = () => {
        dispatch(addToCart({
            item: item,
            quantity: 1,
            currentColor: cC
        }))
        navigation.navigate('Cart');
    }

    return (
        <View style={{ flexGrow: 1, flexDirection: 'column' }}>

            <View style={{
                zIndex: 10, position: 'absolute', top: 0, height: 80, width: '100%', justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center', backgroundColor: 'transparent'
            }}>
                <HeaderRight navigation={navigation} />
                <HeaderLeft navigation={navigation} />
            </View>



            {!loading ? <ActivityIndicator /> :
                <View>
                    <ScrollView style={{ marginBottom: 60 }}>


                        <ImageSlider currentImages={item.oneSize.colors[cC].images} />
                        <View style={styles.subContainer}>
                            <Text style={styles.colorName}>{item.name}</Text>
                            <Text style={styles.text}>&#8362; {item.price}.00</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.colorName}>צבע: {item.oneSize.colors[cC].color}</Text>
                                <TouchableOpacity>
                                    <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>טבלת מידות</Text>
                                </TouchableOpacity>
                            </View>
                            <ColorGroup handleCurrentColor={handleCurrentColor}
                                colors={item.oneSize.colors}
                                currentColor={cC}
                            />
                        </View>

                    </ScrollView>
                    <View style={styles.bottomView}>
                        <TouchableOpacity onPress={handleCart} style={[styles.button,
                        { backgroundColor: paperTheme.dark ? 'white' : 'black' }]} >
                            <Text style={{ fontWeight: '600', color: paperTheme.dark ? 'black' : 'white' }} >
                                הוסף לסל הקניות
                        </Text>
                        </TouchableOpacity>
                        <View style={{
                            backgroundColor: 'white'
                        }} >
                            <IconButton onPress={handleWishlist}
                                icon={() => <AntDesign name={wishListState ? 'heart' : "hearto"} size={30}
                                    color={wishListState ? 'red' : 'black'} />} />
                        </View>
                    </View>
                    <Animated.View style={{ opacity: opacity, position: 'absolute', bottom: yPosition, right: 10 }}>
                        <Text style={{ textAlign: 'right', fontWeight: '600' }}>נוסף למשאלות</Text>
                    </Animated.View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    subContainer: {
        padding: 20,
    },
    bottomView: {
        position: 'absolute',
        bottom: 5,
        width: '100%',
        flexDirection: 'row',
        left: 10
    },
    button: {
        width: '80%',
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',

    },
    text: {
        zIndex: 20,
        marginBottom: 8,
        fontSize: 15,
        fontWeight: 'bold'
    },
    colorName: {

        fontSize: 15,
    }

})

