import { ADD_QUESTION , DECLARE_USER_ID } from '../constanst';

let userId = {
    id: null
}

export default (state = [], action) => {
    switch(action.type){
        case ADD_QUESTION:
            const{userQuestionText,userTime} = action.params;
            let obj = {
                userQuestionText,
                userTime
            }
            console.log('obj',obj);
            return obj;
        case DECLARE_USER_ID:
            const {id} = action;
            userId = {id};
            console.log('userId',userId);
            return userId;
        default:
            return state;
    }
}