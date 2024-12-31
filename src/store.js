import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name : 'user',
  initialState : {name : 'kim', age : 20},
  reducers : {
    changeName(state){
      state.name = 'park'
    },
    ageIncreasse(state, action){
      state.age += action.payload
    }
  }
})

export let {changeName, ageIncreasse} =  user.actions

let stock = createSlice({
  name : 'stock',
  initialState : [10,11,12]
})

let cart = createSlice({
  name : 'cart',
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ],
  reducers : {
    addCount(state, action){
      let num = state.findIndex((a) => {return a.id === action.payload})
      state[num].count++
    },
    addItem(state, action) {
      state.push(action.payload)
    },
    removeItem(state,action) {
      return state.filter(item => item.id !== action.payload);
    }
  }
})

export let {addCount, addItem, removeItem} =  cart.actions

export default configureStore({
  reducer: { 
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer
  }
}) 