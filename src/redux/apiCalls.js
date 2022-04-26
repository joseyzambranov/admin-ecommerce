import {loginFailure,
        loginStart,
        loginSuccess,
        getUserStart,
        getUserSuccess,
        getUserFailure,
        deleteUserStart,
        deleteUserSuccess,
        deleteUserFailure,
        updateUserStart,
        updateUserSuccess,
        updateUserFailure,
        addUserStart,
        addUserSuccess,
        addUserFailure,
        logout,
        getUserStatsStart,
        getUserStatsSuccess,
        getUserStatsFailure,
        getNewUserStart,
        getNewUserSuccess,
        getNewUserFailure
    } from "./userRedux";
import {publicRequest, userRequest} from "../requestMethods";
import { getProductFailure,
         getProductStart,
         getProductSuccess,
         deleteProductStart,
         deleteProductSuccess,
         deleteProductFailure,
         updateProductStart,
         updateProductSuccess,
         updateProductFailure,
         addProductStart,
         addProductSuccess,
         addProductFailure } from "./productRedux";
import { getOrderFailure,
         getOrderStart,
        getOrderSuccess,
        getIncomeFailure,
        getIncomeStart,
       getIncomeSuccess } from "./orderRedux";

export const login = async (dispatch,user)=>{
    dispatch(loginStart())
    try{
        const res = await publicRequest.post("auth/login",user);
        dispatch(loginSuccess(res.data))


    }catch(err){
        dispatch(loginFailure());
    }
}//GET PRODUCT
export const getProduct = async (dispatch)=>{
    dispatch(getProductStart())
    try{
        const res = await publicRequest.get("product");
        dispatch(getProductSuccess(res.data))


    }catch(err){
        dispatch(getProductFailure());
    }
}//DELETE PRODUCT

export const deleteProduct = async (id, dispatch)=>{
    dispatch(deleteProductStart())
    try{
       // const res = await userRequest.delete(`product/${id}`);
        dispatch(deleteProductSuccess(id))


    }catch(err){
        dispatch(deleteProductFailure());
    }
}//UPDATE PRODUCT
export const updateProduct = async (id,product, dispatch)=>{
    dispatch(updateProductStart())
    try{
      
      const res = await userRequest.put(`product/${id}`,product);
        dispatch(updateProductSuccess(res.data))


    }catch(err){
        dispatch(updateProductFailure());
    }
}//ADD PRODUCT
export const addProduct = async (product, dispatch)=>{
    dispatch(addProductStart())
    try{
       const res = await userRequest.post(`product/`,product);
        dispatch(addProductSuccess(res.data))


    }catch(err){
        dispatch(addProductFailure());
    }
}//GET USERS
export const getUser = async (dispatch)=>{
    dispatch(getUserStart())
    try{
        const res = await userRequest.get("user");
        dispatch(getUserSuccess(res.data))


    }catch(err){
        dispatch(getUserFailure());
    }
    }//DELETE USER
export const deleteUser = async (id, dispatch)=>{
    dispatch(deleteUserStart())
    try{
       // const res = await userRequest.delete(`user/${id}`);
        dispatch(deleteUserSuccess(id))


    }catch(err){
        dispatch(deleteUserFailure());
    }
}//UPDATE USER
export const updateUser = async (id,user, dispatch)=>{
    dispatch(updateUserStart())
    try{
      
      const res = await userRequest.put(`user/${id}`,user);
        dispatch(updateUserSuccess(res.data))


    }catch(err){
        dispatch(updateUserFailure());
    }
}//ADD USER
export const addUser = async (user, dispatch)=>{
    dispatch(addUserStart())
    try{
       const res = await userRequest.post(`auth/register/`,user);
        dispatch(addUserSuccess(res.data))


    }catch(err){
        dispatch(addUserFailure());
    }
}
export const logoutUser = (dispatch) => {
    dispatch(logout())
}
//GET ORDER 
export const getOrder = async (dispatch)=>{
    dispatch(getOrderStart())
    try{
        const res = await userRequest.get("order")
        dispatch(getOrderSuccess(res.data))
    }catch(err){
        dispatch(getOrderFailure())
    }
    
}
//GET INCOME 
export const getIncome = async (dispatch)=>{
    dispatch(getIncomeStart())
    try{
        const res = await userRequest.get("order/income")
        dispatch(getIncomeSuccess(res.data))
    }catch(err){
        dispatch(getIncomeFailure())
    }
    
}
//GET USER STATS
export const getUserStats = async (dispatch)=>{
    dispatch(getUserStatsStart())
    try{
        const res = await userRequest.get("user/stats");
        dispatch(getUserStatsSuccess(res.data))


    }catch(err){
        dispatch(getUserStatsFailure());
    }
    }
    //GET USER STATS
export const getNewUser = async (dispatch)=>{
    dispatch(getNewUserStart())
    try{
        const res = await userRequest.get("user/?new=true");
        dispatch(getNewUserSuccess(res.data))


    }catch(err){
        dispatch(getNewUserFailure());
    }
    }
