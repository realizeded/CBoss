import {fromJS} from 'immutable';
const defaultState = fromJS(
    {

    }
);
export default function (state=defaultState,action) {
    return state;
}