import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default function colorGroup({ colors, handleCurrentColor, currentColor }) {
    return (
        <View style={styles.colorContainer}>
            {Object.keys(colors).map((color, i) => {
                return <TouchableOpacity key={i} onPress={() => handleCurrentColor(color)} style={[styles.wrapColor,
                {
                    marginLeft: i === 0 ? 0 : 2,
                    borderColor: color === currentColor ? 'black' : '#d3d3d3',
                }]}>
                    <View key={i}
                        style={[styles.color, { backgroundColor: colors[color].codeColor }]} />
                </TouchableOpacity>
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    colorContainer: {
        paddingTop: 5,
        flexDirection: 'row',
    },
    wrapColor: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 20 / 2,
        padding: 1,
        margin: 2,
    },
    color: {
        height: 16,
        width: 16,
        borderRadius: 16 / 2
    }

})
