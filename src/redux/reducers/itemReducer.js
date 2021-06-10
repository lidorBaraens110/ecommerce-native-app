import { SET_ITEM, INITIAL_ITEM, EDIT_CURRENT_COLOR } from '../type';

const initialState = {};

const itemReducer = (state = Object.keys(initialState), { type, payload }) => {
    switch (type) {
        case SET_ITEM:
            return { item: payload.item, cC: payload.cC }
        case INITIAL_ITEM:
            return initialState
        case EDIT_CURRENT_COLOR:
            return { ...state, cC: payload }
        default:
            return state
    }
}

export default itemReducer;