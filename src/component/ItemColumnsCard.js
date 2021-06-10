import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, Dimensions, Button, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import ModalItemUpdate from '../modalMessage/ModalItemUpdate';

export default function ItemCard({ cC, cart, quantity, handleQ, handleRemove, price, item, goToItem }) {


    const [modalUpdateState, setModalUpdateState] = useState(false)

    const openModal = () => {
        setModalUpdateState(true)
    }
    const closeModal = () => {
        setModalUpdateState(false)
    }

    return (
        <View style={[styles.container]}>

            {cart && <ModalItemUpdate state={modalUpdateState} item={item} currentColor={cC}
                onClose={closeModal} />}

            <TouchableOpacity style={styles.imageCard} onPress={() => goToItem(item)}>
                <Image source={{ uri: item.oneSize.colors[cC].images[0].url }} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.centerContent}>
                <TouchableOpacity onPress={() => goToItem(item)} style={{ flex: 1 }} >
                    <Text >{item.name}</Text>
                </TouchableOpacity>
                <Text style={[styles.text, { flex: 1 }]}>&#8362; {cart ? price * quantity : price}.00</Text>
                {cart && <TouchableOpacity onPress={openModal} style={{ justifyContent: 'flex-end', alignItems: 'flex-start', flex: 1 }}>
                    <View style={styles.wrapColor}>
                        <View style={[styles.color, { backgroundColor: item.oneSize.colors[cC].codeColor }]} />
                        <AntDesign name="down" size={14} color="black" />
                    </View>
                </TouchableOpacity>}

            </View>
            <View style={styles.leftContent}>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>

                    {cart && <View style={styles.handleQuantity}>
                        <View style={[styles.insideQuantity, { borderRightWidth: 1 }]}>
                            <IconButton onPress={() => item.oneSize.colors[cC].quantity > quantity &&
                                handleQ({ item, currentColor: cC, quantity: 1 })} size={12} icon={() => <Ionicons name="add" size={12} color="black" />} />
                        </View>
                        <View style={styles.insideQuantity}>
                            <Text style={{ fontSize: 12 }}>{quantity}</Text>
                        </View>
                        <View style={[{ borderLeftWidth: 1 }, styles.insideQuantity]}>
                            <IconButton onPress={() => quantity > 1 && handleQ({ item, currentColor: cC, quantity: -1 })} size={12} icon={() => <Ionicons name='remove' size={12} color="black" />} />
                        </View>
                    </View>}
                </View>
                <View style={styles.deleteIcon}>

                    <AntDesign onPress={() => handleRemove({ item, currentColor: cC })} name='delete' size={20} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', paddingTop: 12, paddingBottom: 12, height: (Dimensions.get('window').width - 16) / 3 * 4 / 3,
        marginRight: 12, marginLeft: 12, borderBottomWidth: 1, borderBottomColor: '#d3d3d3'
    },
    centerContent: { flex: 1, flexDirection: 'column', marginLeft: 10 },
    leftContent: { flex: 1, flexDirection: 'column', justifyContent: 'flex-start', height: '100%' },
    card: {
        width: Dimensions.get('window').width / 2,
    },
    quantityText: { maxWidth: '70%' },
    handleQuantity: {
        marginTop: 5, flexDirection: 'row', justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1, borderRadius: 20, maxWidth: '70%'
    },
    insideQuantity: { flex: 1, alignItems: 'center' },
    deleteIcon: { flex: 1, justifyContent: 'flex-end' },
    imageCard: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    image: {
        height: '100%', width: '100%'
    },
    nameButton: {
        flex: 1,
    },
    text: {
        zIndex: 20,
        fontSize: 15,
        fontWeight: 'bold'
    },
    wrapColor: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 20 / 2,
        padding: 2,
        width: 50,
        backgroundColor: '#EEEEEE'
    },
    color: {
        height: 14,
        width: 14,
        borderRadius: 14 / 2,
        borderColor: 'black',
        borderWidth: 1
    }
})
