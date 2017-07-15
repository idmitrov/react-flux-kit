import * as types from './userActionTypes';
import dispatcher from '../../tools/dispatcher';

const callAction = (actionType, data) => {
    dispatcher.dispatch({
        type: actionType,
        payload: data
    });

}

const userActions = {
    login: (user) => {
        callAction(types.USER_LOGIN, user);
    },
    register: (user) => {
        callAction(types.USER_REGISTER, user);
    }
};

export default userActions;
