import {SET_DATA, SET_ITEM} from '../actions/dataActions'

const initialState = {
    data: [],
    item: {}
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                data: action.payload
            }
        case SET_ITEM:
            return {
                ...state,
                item: action.payload
            }
        default:
            return state
    }
}

export default dataReducer
