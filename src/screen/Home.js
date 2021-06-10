import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper';
import { StyleSheet, View, Image, Dimensions, ActivityIndicator, Button } from 'react-native';
import { useTheme } from 'react-native-paper';
import ItemList from '../component/ItemList';
import { SERVER } from '../config';
import { useSelector, useDispatch } from 'react-redux';
import { initialCart } from '../redux/actions'

const WIN = Dimensions.get('window');

export default function Home({ route, navigation }) {

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch()

    const [image, setImage] = useState({
        uri: 'https://t4.ftcdn.net/jpg/02/79/46/25/360_F_279462525_qQzC6X4X65IJ6bKzdh3GtRmHqx3viRKO.jpg',
        width: WIN.width,
        height: Number
    })
    const [items, setItems] = useState([]);
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {

        dispatch(initialCart())

        function handleImage() {
            Image.getSize(image.uri, (width, height) => {
                const imageRatio = width / height;

                setImage(pre => {
                    return { ...pre, height: (image.width / imageRatio) }
                })
            })
        }
        const fetchData = async () => {
            setLoaded(false)
            await fetch(`${SERVER}/api/getRecommendedItems`)
                .then((response) => {
                    return response.json()
                })
                .then((json) => {
                    const items = json.map(item => {
                        const added = wishList.find(id => id === item._id)
                        if (added) return { ...item, wishList: true }
                        return { ...item, wishList: false }
                    })
                    setItems(items)
                }).then(() => {
                }).catch(err => console.log(err))
                .finally(() => {
                    setLoaded(true)
                });
        }
        handleImage()
        fetchData()
    }, [])

    const goToItem = (item) => {
        navigation.navigate('Item', { item: item })
    }

    const paperTheme = useTheme();
    return (
        <View>
            {!loaded ? <ActivityIndicator /> :
                <>

                    <Image style={{ width: WIN.width, height: image.height }} source={{ uri: image.uri }} />
                    <ItemList items={items} goToItem={goToItem} />


                </>
            }

        </View>
    )
}

const styles = StyleSheet.create({})
