import * as types from './userActionTypes';
import dispatcher from '../../tools/dispatcher';

const callAction = (actionType, data) => {
    dispatcher.dispatch({
        type: actionType,
        payload: data
    });
}

const userActions = {
    /**
    * @name authorize
    * @desc dispatch an action for user authorize
    */
    authorize: () => {
        callAction(types.USER_AUTHORIZE);
    },
    /**
     * @name authenticate
     * @desc dispatch an action for user authenticate
     */
    authenticate: () => {
        callAction(types.USER_AUTHENTICATE);
    },
    /**
     * @name logout
     * @desc dispatch an action for user logout
     */
    logout: () => {
        callAction(types.USER_LOGOUT);
    },
    /**
     * @name login
     * @desc dispatch an action for user login
     * @param {Object} user
     */
    login: (user) => {
        callAction(types.USER_LOGIN, user);
    },
    /**
     * @name register
     * @desc dispatch an action for user register
     * @param {Object} user
     */
    register: (user) => {
        callAction(types.USER_REGISTER, user);
    }
};

export default userActions;
