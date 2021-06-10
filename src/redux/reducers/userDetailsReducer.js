const initialState = {
    fullName: '',
    email: '',
    address: '',
    city: '',
    num: '',
    postalCode: '',
    phone: '',
}

const userDetailsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'SEND_DETAILS':

            return state
        case 'EDIT_DETAIL':

            return {
                ...state, [payload.name]: payload.value
            }
        default: return state
    }
}

export default userDetailsReducer;