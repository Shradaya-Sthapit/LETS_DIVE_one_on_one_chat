export const initialState = {
    user: null,
    users:[],
    conversations:[]
};
const reducer = (state, action) => {
    switch(action.type){
    case "SET_USER":
                return{
                    ...state,
                    user: action.user,
                }
    case "GET_REALTIME_USERS":
        return{
            ...state,
            users:action.users,
        }
    case "GET_REALTIME_MESSAGES":
        return{
                ...state,
                conversations: action.conversations,
        }
    default:
                return state;
        }
    }
    export default reducer;