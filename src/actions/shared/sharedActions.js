import * as types from './sharedActionTypes';
import dispatcher from '../../tools/dispatcher';

const _callAction = (actionType, data) => {
    dispatcher.dispatch({
        type: actionType,
        payload: data
    });
}

const sharedActions = {
    /**
     * @name notify
     * @desc dispatch action for notification
     */
    notfy: (notification) => {
        _callAction(types.NOTIFY, notification);
    }
};

export default sharedActions;
