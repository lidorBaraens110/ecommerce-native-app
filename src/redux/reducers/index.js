import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userDetailsReducer from './userDetailsReducer';
import wishListReducer from './wishListReducer'
import cartReducer from './cartReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import itemReducer from './itemReducer'


const reducers = combineReducers({
    userDetails: userDetailsReducer,
    wishList: wishListReducer,
    cart: cartReducer,
    item: itemReducer
});

const persistCartConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['cart', 'wishList'],

    // transform: [SetTransform]
};

// const persistWishListConfig = {
//     key: 'root',
//     storage: AsyncStorage,
//     whitelist: ['wishlist']
// };
// const persistUserDetailsConfig = {
//     key: 'root',
//     storage: AsyncStorage,
//     whitelist: ['userDetails']
// };

// const root

// const rootReducer = combineReducers({
//     cart: persistReducer(persistCartConfig, cartReducer),
//     wishList: wishListReducer,
//     // userDetails: userDetailsReducer
// });

export const store = createStore(persistReducer(persistCartConfig, reducers), applyMiddleware(thunk));
export const persistor = persistStore(store);




// export const store = createStore(rootReducer, applyMiddleware(thunk));