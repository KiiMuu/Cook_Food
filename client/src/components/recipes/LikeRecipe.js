import React, { useState, useEffect } from 'react';

import withSession from '../session/withSession';

const LikeRecipe = (props) => {

    const [username, setUsername] = useState('');

    useEffect(() => {
        if (props.session.getCurrentUser) {
            const { username } = props.session.getCurrentUser;
            setUsername({
                username
            });
        }
    }, []);

    return (username && <button>Like</button>);
}

export default withSession(LikeRecipe);
