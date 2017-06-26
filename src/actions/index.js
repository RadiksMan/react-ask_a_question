import { ADD_QUESTION } from '../constants';

export const addQuestion = (params) => {
    const action = {
        type: ADD_QUESTION,
        params,
    }
    console.log('action in addQuestion', action);
    return action;
}