import {createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser:null,
        userStats:[],
        users:[],
        newUsers:[],
        isFetching:false,
        error:false,
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching=true;
        },
        loginSuccess:(state,action)=>{
            state.isFetching=false;
            state.currentUser=action.payload;   
        },
        loginFailure:(state)=>{
            state.isFetching=false;
            state.error=true;
        },//GET ALL
        getUserStart:(state)=>{
            state.isFetching=true;
            state.error=true;
        },
        getUserSuccess:(state,action)=>{
            state.isFetching=false;
            state.users=action.payload;
        },
        getUserFailure:(state)=>{
            state.isFetching=false;
            state.error=true;
        },//DELETE
        deleteUserStart:(state)=>{
            state.isFetching=true;
            state.error=true;
        },
        deleteUserSuccess:(state,action)=>{
            state.isFetching=false;
            state.users.splice(
                state.users.findIndex((item)=>item._id===action.payload),1
            );
        },
        deleteUserFailure:(state)=>{
            state.isFetching=false;
            state.error=true;
           
        },//UPDATE USER
        updateUserStart:(state)=>{
            state.isFetching=true;
            state.error=true;
        },
        updateUserSuccess:(state,action)=>{
            state.isFetching=false;
            state.users[state.users.findIndex((item)=>item._id===action.payload.id)]=action.payload.user
            ;
        },
        updateUserFailure:(state)=>{
            state.isFetching=false;
            state.error=true;
        },//ADD
        addUserStart:(state)=>{
            state.isFetching=true;
            state.error=true;
        },
        addUserSuccess:(state,action)=>{
            state.isFetching=false;
            state.users.push(action.payload)
        },
        addUserFailure:(state)=>{
            state.isFetching=false;
            state.error=true;
        },//LOGOUT
        logout:(state)=>{
            state.currentUser=null;
           
        },//GET USER STATS
         getUserStatsStart:(state)=>{
            state.isFetching=true;
            state.error=true;
        },
        getUserStatsSuccess:(state,action)=>{
            state.isFetching=false;
            state.userStats=action.payload;
        },
        getUserStatsFailure:(state)=>{
            state.isFetching=false;
            state.error=true;
        },//GET NEW USER 
        getNewUserStart:(state)=>{
           state.isFetching=true;
           state.error=true;
       },
       getNewUserSuccess:(state,action)=>{
           state.isFetching=false;
           state.newUsers=action.payload;
       },
       getNewUserFailure:(state)=>{
           state.isFetching=false;
           state.error=true;
       },
        

    },

});

export const {loginStart,
              loginSuccess,
              loginFailure,
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
              getNewUserFailure}=userSlice.actions;

//export const currenUser = (state)=>state.user.currentUser     

export const currenUser = ()=> {
    const user = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser;
    if (user && user.accessToken) {
      return true ;
    } else {
      return false;
    }
  }

export default userSlice.reducer;