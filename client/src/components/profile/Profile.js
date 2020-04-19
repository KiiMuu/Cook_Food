import React from 'react';

import './Profile.scss';
import UserInfo from './UserInfo';
import UserRecipes from './UserRecipes';
import withAuth from '../../middleware/withAuth';

const Profile = ({ session }) => {
    return (
        <div>
            <UserInfo session={session} />
            <UserRecipes username={session.getCurrentUser.username} />
        </div>
    )
}

export default withAuth(session => session && session.getCurrentUser)(Profile);
