import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from '../type';

const initialState = [];

const WishListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_TO_WISHLIST:
            const existItem = state.find(item => item._id === payload._id)

            if (existItem) {
                const newState = state.filter(item => {
                    return item._id !== payload._id
                })
                return [...newState]
            }
            return [...state, payload]

        case REMOVE_FROM_WISHLIST:

            const newState = state.filter(item => {
                return item._id !== payload
            })
            return [...newState]
        default:
            return state
    }
}

export default WishListReducer;