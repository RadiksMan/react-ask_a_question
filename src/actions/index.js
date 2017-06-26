import { ADD_QUESTION } from '../constants';

export const addQuestion = (params) => {
    const action = {
        type: ADD_REMINDER,
        params,
    }
    console.log('action in addQuestion', action);
    return action;
}