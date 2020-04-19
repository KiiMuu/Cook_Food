import React from 'react';

import './Profile.scss';
import UserInfo from './UserInfo';
import UserRecipes from './UserRecipes';

const Profile = ({ session }) => {
    return (
        <div>
            <UserInfo session={session} />
            <UserRecipes username={session.getCurrentUser.username} />
        </div>
    )
}

export default Profile;
