import { ADD_QUESTION } from '../constanst';

let obj = {
    id: null
}

export default (state = obj, action) => {
    switch(action.type){
        case ADD_QUESTION:
            const{id} = action;
            obj = {
                id
            }
            return obj;
        default:
            return state;
    }
}