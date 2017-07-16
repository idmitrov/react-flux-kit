import { EventEmitter } from 'events';

import dispatcher from '../tools/dispatcher';
import * as types from '../actions/shared/sharedActionTypes';

class SharedStore extends EventEmitter {
    constructor() {
        super();
        
        this.handleAction = this.handleAction.bind(this);
        this.notify = this.notify.bind(this);
    }

    notify(notification) {
        this.emit(types.NOTIFIED, {message: notification.message, type: notification.type});
    }

    /**
     * @name handleAction
     * @desc Handle possible actions
     * @param {Object} action 
     */
    handleAction(action) {
        switch (action.type) {
            case types.NOTIFY: {
                this.notify(action.payload);
                break;
            }
            default: break;
        }
    }
}

let sharedStore = new SharedStore();
dispatcher.register(sharedStore.handleAction);

export default sharedStore;
