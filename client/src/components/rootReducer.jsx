const initState = {
    isLogin: false,
    isLoginMode: false,
    userId: null
}

const rootReducer = (state = initState, action) => {
    switch(action.type){
        case "LOGIN":
            return{
                ...state,
                isLogin: true,
                userId: action.payload
            }
        case "LOGOUT":
            return{
                ...state,
                isLogin: false,
                isLoginMode: false,
                userId: null
            }
        case "SWITCH":
            return{
                ...state,
                isLoginMode: !state.isLoginMode
            }
        default:
            return state
    }
}

export default rootReducer;