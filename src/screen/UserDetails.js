import React, { useEffect, useRef } from 'react'
import { FlatList, StyleSheet, Text, View, Button, Platform, SafeAreaView, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux';
import { editDetail } from '../redux/actions';
import { Formik, Field } from 'formik';
import * as yup from 'yup';


const userDetailsScheme = yup.object({
    fullName: yup.string()
        .matches(/(\w.+\s).+/, 'Enter at least 2 names')
        .required("Please enter your full name")
        .min(2),
    email: yup.string()
        .email("Please enter valid email")
        .required('Email Address is Required'),
    address: yup.string()
        .required('Please enter your address'),
    phone: yup.string()
        .required('Please enter your phone number')
        .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Enter a valid phone number'),
    city: yup.string()
        .required('Please enter your city'),
    num: yup.string()
        .required('Please enter your streetNumber'),
    postalCode: yup.string()
        .required('Please enter your postalCode')
});


export default function UserDetails({ navigation }) {

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 0
    const behavior = Platform.OS === 'ios' && 'padding'

    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails);
    const currentDetail = useRef();
    const handleChange = ({ name, value }) => {
        dispatch(editDetail({ name, value }))
    }



    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15, textAlign: 'center', padding: 2 }}>פרטים אישיים</Text>
            <Formik
                initialValues={userDetails}
                onSubmit={values => {
                    navigation.navigate('Receive', { values })

                }}
                validationSchema={userDetailsScheme}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior={'height'} keyboardVerticalOffset={keyboardVerticalOffset}>
                        <ScrollView >
                            <View style={{ flex: 1, justifyContent: 'center', padding: 30 }}>
                                {Object.keys(values).map((val, i) => {
                                    return <View key={i}>
                                        <TextInput
                                            ref={currentDetail}
                                            style={styles.input}
                                            dense
                                            label={val}
                                            onChangeText={handleChange(val)}
                                            onBlur={handleBlur(val)}
                                            value={values[val]}
                                            keyboardType={val === 'phone' ? 'numeric' : 'default'}
                                        />
                                        <Text style={{ color: 'red' }}>{touched[val] && errors[val]}</Text>
                                    </View>
                                })}
                                {/* <Button title='שלח' /> */}

                                <TouchableOpacity style={{
                                    alignItems: 'center', marginTop: 10,
                                    backgroundColor: '#2196F3'
                                }} onPress={handleSubmit} >
                                    <Text style={{ padding: 10 }}>שלח</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                )}
            </Formik>
        </View >

    )
}

const styles = StyleSheet.create({
    item: {
        zIndex: 10,
        backgroundColor: 'white',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    input: {
        textAlign: 'center',
        marginBottom: 5,
        marginTop: 5

    },
})