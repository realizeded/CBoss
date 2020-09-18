import React from 'react';
import {ErrorSpan} from './style';
function Error(props) {
    const msg = props.msg;
    return (
        <div>
            <ErrorSpan>
                {msg}
            </ErrorSpan>
        </div>
    );
}
export default Error;
