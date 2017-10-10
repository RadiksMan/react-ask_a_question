import { ADD_QUESTION , DECLARE_USER_ID } from '../constanst';

export const addQuestion = (params) => {
    const action = {
        type: ADD_QUESTION,
        params
    }
    return action;
}

export const declareUserID = (id) =>{
    const action = {
        type:DECLARE_USER_ID,
        id
    }
    return action;
}