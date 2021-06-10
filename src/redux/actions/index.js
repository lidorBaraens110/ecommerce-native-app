import { ADD_TO_CART, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, INITIAL, HANDLE_QUANTITY, EDIT_CURRENT_COLOR, UPDATE_ITEM, REMOVE_FROM_CART, INITIAL_ITEM, SET_ITEM } from "../type"

export const newCollection = () => {
    return {
        type: 'NEW_COLLECTION'
    }
}
export const searchAction = (value) => {

    return {
        type: 'SEARCH',
        payload: value
    }
}

export const initial = (items) => {
    return {
        type: 'INITIAL',
        payload: items
    }
}

export const sortState = (sortValue) => {
    return {
        type: 'SORT',
        payload: sortValue
    }
}
export const addToCart = (item) => {

    return {
        type: ADD_TO_CART,
        payload: item
    }

}

export const handleQuantity = (item) => {
    return {
        type: HANDLE_QUANTITY,
        payload: item
    }
}


export const editItem = ({ item, value }) => {

    return {
        type: 'EDIT_ITEM',
        payload: { item, value }
    }
}

export const updateItem = ({ item, currentColor, newColor }) => {
    return {
        type: UPDATE_ITEM,
        payload: { item, currentColor, newColor }
    }
}

export const removeFromCart = (item) => {

    return {
        type: REMOVE_FROM_CART,
        payload: item
    }
}

export const toggleHeart = (item) => {
    return {
        type: 'TOGGLE_HEART',
        payload: item
    }
}

export const sendDetails = (detail) => {
    return {
        type: 'SEND_DETAILS',
        payload: detail
    }
}

export const editDetail = ({ name, value }) => {

    return {
        type: 'EDIT_DETAIL',
        payload: { name, value }
    }
}
export const initItem = (item) => {
    return {
        type: 'INIT_ITEM',
        payload: item
    }
}
export const handleSize = (value) => {
    return {
        type: 'HANDLE_SIZE',
        payload: value
    }
}
export const sizeAlert = (flag) => {
    return {
        type: 'SIZE_ALERT',
        payload: flag
    }
}
export const compareSizeAlert = (flag) => {
    return {
        type: 'SIZE_COMPARE_ALERT',
        payload: flag
    }
}
export const pickSize = (size) => {

    return {
        type: 'SIZE',
        payload: size
    }
}

export const actionMouseOver = (id) => {

    return {
        type: 'MOUSE_OVER',
        payload: id
    }
}
export const actionMouseOut = (id) => {
    return {
        type: 'MOUSE_OUT',
        payload: id
    }
}

export const selectType = (type) => {

    return {
        type: 'SELECT_TYPE',
        payload: type
    }
}

export const addToWishList = (item) => {
    return {
        type: ADD_TO_WISHLIST,
        payload: item
    }
}

export const removeFromWishList = (id) => {
    return {
        type: REMOVE_FROM_WISHLIST,
        payload: id
    }
}

export const initialCart = () => {
    return { type: INITIAL }
}


export const setItem = ({ item, cC }) => {
    return {
        type: SET_ITEM,
        payload: { item, cC }
    }
}

export const initialItem = () => {
    return { type: INITIAL_ITEM }
}

export const editCurrentColor = (color) => {
    return { type: EDIT_CURRENT_COLOR, payload: color }
}