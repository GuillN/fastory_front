import {TOGGLE_AUTH} from '../actions/authActions'

const initialState = {
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_AUTH:
            return {
                ...state,
                isAuth: !state.isAuth
            }
        default:
            return state
    }
}

export default authReducer
