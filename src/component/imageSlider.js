import React, { useState, useEffect } from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import Slider from "react-native-hook-image-slider"

export default ImageSlider = ({ currentImages }) => {

    const [images, setImages] = useState(() => currentImages.map(image => {
        return image.url
    }))
    useEffect(() => {
        setImages(currentImages.map(image => {
            return image.url
        }))
    }, [currentImages])
    return (
        <View >
            <Slider

                imageHeight={(Dimensions.get('window').width * 4 / 3)}

                images={images}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
