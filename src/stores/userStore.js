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
     * @name logout
     * @desc clean in memory user data
     */
    logout() {
        this.user = null;

        this.emit(types.USER_LOGGEDOUT, {
            user: {
                name: null
            },
            message: "Catch you later!"
        });
    }

    /**
     * @name login
     * @desc call API to login a given user and save it in memory
     * @param {Object} user 
     */
    login(user) {
        requester.post('/auth/login', user)
            .then(response => {
                if (response.success) {
                    this.user = {
                        name: response.user.name,
                        token: response.token
                    };

                    this.emit(types.USER_LOGGEDIN, response);
                }
            });
    }

    /**
     * @name register
     * @desc call API to register a new user
     * @param {Object} user 
     */
    register(user) {
        requester.post('/auth/signup', user)
            .then(response => {
                if (response.success) {
                    this.emit(types.USER_REGISTERED, response);
                }
            });
    }

    /**
     * @name authenticate
     * @desc Check the store if user exist if not call API
     * @param {Object} user 
     */
    authenticate() {

    }

    /**
     * @name authorize
     * @desc Check the store if user is authorized if not call API
     * @param {Object} user 
     */
    authorize() {

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
            case types.USER_LOGOUT: {
                this.logout();
                break;
            }
            default: break;
        }
    }
}

let userStore = new UserStore();
dispatcher.register(userStore.handleAction);

export default userStore;
