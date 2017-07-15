import { EventEmitter } from 'events';

import requester from '../utils/requester';
import dispatcher from '../tools/dispatcher';
import * as types from '../actions/user/userActionTypes';

class UserStore extends EventEmitter {
    constructor() {
        super();

        this.user = null;
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.handleAction = this.handleAction.bind(this);
    }

    /**
     * @name login
     * @desc call API to login a given user and save it in memory
     * @param {Object} user 
     */
    login(user) {
        this.emit(types.USER_LOGGEDIN, user);
    }

    /**
     * @name Register
     * @desc call API to register a new user
     * @param {Object} user 
     */
    register(user) {
        this.emit(types.USER_REGISTERED, user);
    }

    /**
     * @name handleAction
     * @desc Handle possible actions
     * @param {Object} action 
     */
    handleAction(action) {
        switch (action.type) {
            case types.USER_LOGIN: {
                this.login(action.payload);
                break;
            }
            case types.USER_REGISTER: {
                this.register(action.payload);
                break;
            }
            default: break;
        }
    }
}

let userStore = new UserStore();
dispatcher.register(userStore.handleAction);

export default userStore;
