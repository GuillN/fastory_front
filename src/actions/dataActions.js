export const SET_DATA = 'SET_DATA'
export const SET_ITEM = 'SET_ITEM'

export const setData = data => ({
    type: SET_DATA,
    payload: data
})

export const setItem = item => ({
    type: SET_ITEM,
    payload: item
})
