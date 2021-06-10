
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import ImageSlider from '../component/imageSlider';
import Modal from 'react-native-modal';
import ColorGroup from '../component/colorGroup';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { updateItem } from '../redux/actions'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
// Platform.OS === 'ios'
//     ? Dimensions.get('window').height
//     : require('react-native-extra-dimensions-android').get(
//         'REAL_WINDOW_HEIGHT',
//     );

export default function ModalItemUpdate({ item, currentColor, state, onClose }) {
    const dispatch = useDispatch()
    const paperTheme = useTheme()
    const [cC, setCC] = useState(currentColor ? currentColor : Object.keys(item.oneSize.colors)[0])

    const handleCurrentColor = (color) => {
        setCC(color)
    }

    const updateCart = () => {

        dispatch(updateItem({ item: item, currentColor: currentColor, newColor: cC }))
    }

    return (
        <Modal backdropColor='none' isVisible={state} onBackdropPress={onClose} style={styles.centeredView}>
            <View style={{ backgroundColor: 'white', height: deviceHeight / 1.5, width: deviceWidth }}>
                <View style={{ flex: 2 }}>
                    <ScrollView horizontal pagingEnabled
                        style={{ flex: 2, margin: 0, padding: 0, height: 300, backgroundColor: 'white' }}
                    >
                        {item.oneSize.colors[cC].images.map((image, i) => {
                            return <Image key={i}
                                source={{ uri: image.url }}
                                style={{
                                    marginLeft: 5,
                                    width: deviceWidth / 1.8,
                                    height: deviceWidth / 1.8 * 4 / 3,
                                    borderWidth: 1
                                }}
                                resizeMode='contain'
                            />
                        })}
                    </ScrollView>
                </View>

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
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={updateCart} style={[styles.button,
                        { backgroundColor: paperTheme.dark ? 'white' : 'black' }]} >
                            <Text style={{ fontWeight: '600', color: paperTheme.dark ? 'black' : 'white' }} >
                                עדכן פריט
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffecda',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 0,
        margin: 0
    },
    modalView: {
        margin: 20,
        backgroundColor: "#ffecda",
        // borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },
    button: {
        // borderRadius: 10,
        padding: 15,
        elevation: 2,
        alignItems: 'center'
    },
    buttonOpen: {
        backgroundColor: "#000",
    },
    buttonClose: {
        backgroundColor: "#000",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: "center"
    },
    modalBody: {
        fontSize: 15,
        marginBottom: 15,
        textAlign: "center"
    }, subContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white'

    },
    bottomView: {
        position: 'absolute',
        bottom: 5,
        width: '100%',
        flexDirection: 'row',
        left: 10
    },
    // button: {
    //     width: '80%',
    //     justifyContent: 'center',
    //     alignSelf: 'stretch',
    //     alignItems: 'center',

    // },
    text: {
        zIndex: 20,
        marginBottom: 8,
        fontSize: 15,
        fontWeight: 'bold'
    },
    colorName: {
        fontSize: 15,
    }

});
