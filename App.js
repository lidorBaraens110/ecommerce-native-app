import React, { useEffect } from 'react';
import { View, ActivityIndicator, I18nManager, LogBox } from 'react-native';
import {
  NavigationContainer, useNavigation,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigation from './src/navigation/stackNavigation'
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';
import { DrawerRightContent } from './src/navigation/drawerContent';

import Home from './src/screen/Home';
import Feed from './src/screen/Feed';
import { AuthContext } from './src/component/context';
// import { createStore, applyMiddleware, compose } from 'redux';
import { store, persistor } from './src/redux/reducers';
import { Provider } from 'react-redux';
import ModalMessage from './src/modalMessage/ModalMessage';
import { PersistGate } from 'redux-persist/integration/react';

// LogBox.ignoreLogs(['Reanimated 2']);
// LogBox.ignoreLogs(['Remote debugger']);


const Drawer = createDrawerNavigator();

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null); 

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);


  const initialState = {
    cart: [],
    wishList: []
  }

  // const store = createStore(reducers)

  const authContext = React.useMemo(() => ({
    toggleTheme: () => {
      setIsDarkTheme(isDarkTheme => !isDarkTheme);
    }
  }), []);
  // const initialLoginState = {
  //   isLoading: true,
  //   userName: null,
  //   userToken: null,
  // };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;


  return (
    <PaperProvider theme={theme} >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthContext.Provider value={authContext}>
            {/* <ModalMessage /> */}
            <NavigationContainer theme={theme}>
              <Drawer.Navigator drawerPosition='right' drawerContent={props => <DrawerRightContent {...props} />}>
                <Drawer.Screen name="TheHome" component={StackNavigation} />
              </Drawer.Navigator>
            </NavigationContainer>
          </AuthContext.Provider>
        </PersistGate>
      </Provider>

    </PaperProvider>
  );
}

export default App;
