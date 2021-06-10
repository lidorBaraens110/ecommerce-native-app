import { AntDesign } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ItemList from '../component/ItemList';
import { addToWishList, setItem } from '../redux/actions';
import { SERVER } from '../config';

const sortBy = ["מחיר", "תאריך", "א-ב"];

export default function Feed({ route, navigation }) {

    const { type } = route.params;
    const dispatch = useDispatch();
    const [currentItems, setCurrentItems] = useState([])

    const [sortType, setSortType] = useState({
        type: '',
        up: true
    });
    const wishList = useSelector(state => state.wishList);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {
            setLoading(false)
            if (type === 'new Collection') {
                await fetch(`${SERVER}/api/getNewCollectionItems`)
                    .then((response) => {
                        return response.json()
                    })
                    .then((json) => {

                        const items = json.map(item => {
                            const exist = wishList.find(i => i._id === item._id)
                            if (exist) return { ...item, wishList: true }
                            return { ...item, wishList: false }
                        })
                        setCurrentItems(items)

                    }).then(() => {
                    }).catch(err => console.log(err))
                    .finally(() => {
                        setLoading(true)

                    });
            } else {
                await fetch(`${SERVER}/api/getItemsByType/${type}`)
                    .then((response) => { return response.json(); })
                    .then((json) => {

                        const items = json.map(item => {
                            const exist = wishList.find(i => i._id === item._id)
                            if (exist) return { ...item, wishList: true }
                            return { ...item, wishList: false }
                        })
                        setCurrentItems(items)
                    }).then(() => {

                    }).catch(err => console.log(err))
                    .finally(() => {
                        setLoading(true)

                    });
            }
        }
        fetchData()
    }, [type])

    useEffect(() => {
        const newCurrentItem = currentItems.map(item => {
            let exist = wishList.find(i => i._id === item._id);
            if (exist) {
                return { ...item, wishList: true }
            } else {
                return { ...item, wishList: false }
            }
        })
        setCurrentItems([...newCurrentItem])
    }, [wishList])

    const goToItem = (item) => {

        dispatch(setItem({ item: item, cC: Object.keys(item.oneSize.colors)[0] }))
        navigation.navigate('TheHome', {
            screen: 'Item'
        })
    }

    const handleWishList = (item) => {
        dispatch(addToWishList(item))
    }

    useEffect(() => {
        let sortItems = [];
        if (sortType.type === 'מחיר') {
            sortItems = currentItems.sort((itemA, itemB) => sortType.up ? itemA.price - itemB.price : itemB.price - itemA.price)
            setCurrentItems([...sortItems])
        }
        if (sortType.type === 'תאריך') {
            sortItems = currentItems.sort((itemA, itemB) => sortType.up ? (itemA.createdAt < itemB.createdAt) ? -1 :
                ((itemA.createdAt > itemB.createdAt) ? 1 : 0) : (itemB.createdAt < itemA.createdAt) ? -1 :
                ((itemB.createdAt > itemA.createdAt) ? 1 : 0))
            setCurrentItems([...sortItems])
        }
        if (sortType.type === 'א-ב') {
            sortItems = currentItems.sort((itemA, itemB) => sortType.up ? itemB.name > itemA.name : itemB.name < itemA.name)
            setCurrentItems([...sortItems])
        }
    }, [sortType])



    const changeSortType = (type) => {
        if (type === sortType.type) {
            setSortType(pre => {
                return { ...pre, up: !pre.up }
            })
        } else {
            setSortType({ type, up: true })
        }
    }

    return (
        <View>
            {!loading ? <ActivityIndicator /> :
                <>
                    <View style={{ flexDirection: 'row' }}>
                        {sortBy.map((type, i) => {
                            return <TouchableOpacity key={i}
                                onPress={() => changeSortType(type)}
                                style={{
                                    backgroundColor: sortType.type === type ? 'blue' : '#d3d3d3', flexDirection: 'row',
                                    flex: 1, justifyContent: 'center', alignItems: 'center', borderLeftWidth: i !== sortBy && 1
                                }}>
                                <View style={{ flex: 1 }}></View>
                                <Text style={{ flex: 1, color: sortType.type === type ? 'white' : 'black' }}>{type}</Text>
                                {sortType.type === type ?
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        {sortType.up ? <AntDesign name='down' size={10} color={sortType.type === type ? 'white' : 'black'} />
                                            :
                                            <AntDesign name='up' size={10} color={sortType.type === type ? 'white' : 'black'} />
                                        }
                                    </View> :
                                    <View style={{ flex: 1 }}>
                                    </View>
                                }
                            </TouchableOpacity>
                        })}
                    </View>
                    {currentItems.length > 0 ? <ItemList handleWishList={handleWishList} items={currentItems} goToItem={goToItem} />
                        : <Text>אין כרגע פריטים</Text>}
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({})


