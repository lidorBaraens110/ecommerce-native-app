import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
    Divider
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { AuthContext } from '../component/context';

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import { AuthContext } from '../components/context';
const types = ['חולצות', 'גופיות', 'טוניקות', "ג'ינסים", 'new Collection', 'מכנסיים ארוכות', 'מכנסיים קצרות'];
export function DrawerRightContent(props) {

    const paperTheme = useTheme();
    const { toggleTheme } = React.useContext(AuthContext);
    // const { signOut, toggleTheme } = React.useContext(AuthContext);

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} >
                <View style={styles.drawerContent}>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            label={() => <Text style={styles.text}>חיפוש</Text>}
                            onPress={() => { props.navigation.navigate('TheHome', { screen: 'Search' }) }}
                        />
                        <Divider />
                        <DrawerItem
                            label={() => <Text style={styles.text}>בית</Text>}
                            onPress={() => { props.navigation.navigate('TheHome', { screen: 'Home' }) }}
                        />
                        <Divider />
                        {types.map((type, i) => {
                            return (
                                <View key={i}>
                                    <DrawerItem
                                        style={{ justifyContent: 'center' }}

                                        label={() => <Text style={styles.text}>{type}</Text>}
                                        onPress={() => { props.navigation.navigate('TheHome', { screen: 'Feed', params: { type: type } }) }
                                        }
                                    />
                                    <Divider />
                                </View>
                            )
                        })}


                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>

        </View>
    );
}


export function DrawerBottomContent() {
    <View style={{ flex: 1 }}>
        <Text>hello world</Text>
    </View>
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    text: {
        fontSize: 15,
        fontWeight: "bold",
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});