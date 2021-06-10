import { ADD_TO_CART, REMOVE_FROM_CART, HANDLE_QUANTITY, UPDATE_ITEM, INITIAL } from '../type';

const initialState = [];

const cartReducer = (state = Object.keys(initialState), { type, payload }) => {
    switch (type) {
        case ADD_TO_CART:
            console.log(payload)
            if (state.length > 0) {
                const currentId = state.find(item => item.item._id === payload.item._id && item.currentColor === payload.currentColor);

                if (!currentId) {
                    return [...state, payload]
                } else {

                    const newState = state.map(item => {
                        if (item.item._id === payload.item._id && item.currentColor === payload.currentColor) {
                            return { ...item, quantity: item.quantity + 1 }
                        } return item
                    })
                    return [...newState]
                }
            } return [...state, payload]

        case REMOVE_FROM_CART:
            const newState = state.filter(item => {
                return !(item.item._id === payload.item._id && item.currentColor === payload.currentColor)
            })
            return [...newState]

        case HANDLE_QUANTITY:
            const currentState = state.map(item => {
                if (item.item._id === payload.item._id && item.currentColor === payload.currentColor) {
                    return { ...item, quantity: item.quantity + payload.quantity }
                } return item
            })
            return [...currentState]

        case UPDATE_ITEM:

            let updateState = [];
            const existItem = state.find(item => item.currentColor === payload.newColor)
            if (existItem) {
                updateState = state.filter(item => item.currentColor !== payload.currentColor)
                updateState = updateState.map(item => {
                    if (item.currentColor === payload.newColor) {
                        return { ...item, quantity: item.quantity + 1 }
                    }
                    return item
                })
            }
            else {

                updateState = state.map(item => {
                    if (item.currentColor === payload.currentColor) {
                        return { ...item, currentColor: payload.newColor }
                    } return item
                })

            }
            return [...updateState]
        case INITIAL:
            return initialState
        default:
            return state
    }
}

export default cartReducer;