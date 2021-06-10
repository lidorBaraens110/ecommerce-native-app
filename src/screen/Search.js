import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { Searchbar } from 'react-native-paper';
import ItemList from '../component/ItemList';
import { addToWishList, setItem } from '../redux/actions';
import { SERVER } from '../config';

const searchBy = ['ממחיר', 'עד מחיר', 'שם'];

export default function Search({ navigation }) {

    const dispatch = useDispatch();

    const [items, setItems] = useState([]);
    const wishList = useSelector(state => state.wishList);

    const [currentItems, setCurrentItems] = useState([])
    const [currentType, setCurrentType] = useState('שם')
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState()

    useEffect(() => {

        const fetchData = async () => {
            setLoading(false)
            await fetch(`${SERVER}/api/getAllItems`)
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
                    setItems(items)
                }).then(() => {
                }).catch(err => console.log(err))
                .finally(() => {
                    setLoading(true)
                });
        }
        fetchData()
    }, [])

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
        // navigation.navigate('TheHome', 
        // { screen: 'Item', params: 
        // { item: item, cC: Object.keys(item.oneSize.colors)[0] } })

        navigation.navigate('TheHome', {
            screen: 'Item'
        })
        dispatch(setItem({ item, cC: Object.keys(item.oneSize.colors)[0] }))
        navigation.navigate('TheHome', {
            screen: 'Item'
        })
    }


    const handleWishList = (item) => {
        dispatch(addToWishList(item))
    }

    useEffect(() => {
        if (!searchQuery) {
            setCurrentItems(items)
            setSearchQuery(searchQuery)
        } else {
            if (currentType === 'שם') {
                const newState = items.filter(item => item.name.includes(searchQuery))
                setCurrentItems([...newState])

            }
            if (currentType === 'ממחיר') {
                const newState = items.filter(item => item.price >= searchQuery)
                setCurrentItems([...newState])

            }
            if (currentType === 'עד מחיר') {
                const newState = items.filter(item => item.price <= searchQuery)
                setCurrentItems([...newState])

            }
        }
    }, [searchQuery])

    const onChangeSearch = (query) => {
        setSearchQuery(query)
    }
    const changeQueryType = (type) => {
        setCurrentType(type)
        setSearchQuery('')
    }

    return (
        <View>
            <View>
                <View style={{ flexDirection: 'row-reverse' }}>
                    {searchBy.map((type, i) => {
                        return <TouchableOpacity key={i}
                            onPress={() => changeQueryType(type)}
                            style={{
                                backgroundColor: currentType === type ? 'blue' : '#d3d3d3',

                                flex: 1, justifyContent: 'center', alignItems: 'center', borderLeftWidth: i !== searchBy.length && 1
                            }}>
                            <Text style={{ color: currentType === type ? 'white' : 'black' }}>{type}</Text>
                        </TouchableOpacity>
                    })}
                </View>
                <Searchbar
                    style={{ marginBottom: 20 }}
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    keyboardType={currentType === 'שם' ? 'default' : 'numeric'}
                    value={searchQuery}
                />
            </View>
            {
                !loading ? <ActivityIndicator /> :
                    <>
                        {currentItems.length > 0 ? <ItemList
                            handleWishList={handleWishList}
                            items={currentItems}
                            goToItem={goToItem} />
                            : <Text>אין כרגע פריטים</Text>}
                    </>
            }
        </View >
    )
}

const styles = StyleSheet.create({})


