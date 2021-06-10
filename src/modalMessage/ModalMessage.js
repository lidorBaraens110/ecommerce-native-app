
import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';

export default function PopupModal() {

    const [modalVisible, setModalVisible] = useState(true);
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
        // onRequestClose={() => {
        //     Alert.alert("Modal has been closed.");
        //     setModalVisible(!modalVisible);
        // }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.headerText}>שלום לכולם</Text>
                    <Text style={styles.modalBody}>שמחה שבחרתם לקנות בחנות שלנו
                    אני כבר מתרגשת</Text>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.textStyle}>המשך לאתר</Text>
                    </Pressable>
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
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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
        padding: 10,
        elevation: 2
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
    }

});