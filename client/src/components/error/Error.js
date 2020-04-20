import React from 'react';

const Error = ({ error }) => {
    return (
        <div className="uk-alert uk-alert-danger" uk-alert>
            <p>{error.message}</p>
        </div>
    )
}

export default Error;
