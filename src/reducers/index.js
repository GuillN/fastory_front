import authReducer from './authReducer'
import dataReducer from './dataReducer'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    data: dataReducer,
    isAuth: authReducer
})

export default allReducers
