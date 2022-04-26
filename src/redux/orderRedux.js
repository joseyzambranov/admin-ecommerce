import {createSlice} from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name:"order",
    initialState:{
        orders:[],
        income:[],
        isFetching:false,
        error:false,
    },
    reducers:{
        //GET ALL
        getOrderStart:(state)=>{
            state.isFetching=true;
            state.error=true;
        },
        getOrderSuccess:(state,action)=>{
            state.isFetching=false;
            state.orders=action.payload;
        },
        getOrderFailure:(state)=>{
            state.isFetching=false;
            state.error=true;
        },
         //GET INCOME
         getIncomeStart:(state)=>{
            state.isFetching=true;
            state.error=true;
        },
        getIncomeSuccess:(state,action)=>{
            state.isFetching=false;
            state.income=action.payload;
        },
        getIncomeFailure:(state)=>{
            state.isFetching=false;
            state.error=true;
        },
    }
})

export const {getOrderStart,
              getOrderSuccess,
              getOrderFailure,
              getIncomeStart,
              getIncomeSuccess,
              getIncomeFailure} = orderSlice.actions;
export default orderSlice.reducer;
