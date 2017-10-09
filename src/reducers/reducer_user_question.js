import { ADD_QUESTION , DECLARE_USER_ID } from '../constanst';

export default (state = {}, action) => {
    switch(action.type){
        case ADD_QUESTION:
            const{userQuestionText,userTime} = action.params;
            let obj = {
                userQuestionText,
                userTime
            }
            return Object.assign({}, state, {
                obj
            })
        case DECLARE_USER_ID:
            const {id} = action;
            return Object.assign({}, state, {
                id
            })
        default:
            return state;
    }
}