import React from 'react';

import './Profile.scss';
import UserInfo from './UserInfo';
import UserRecipes from './UserRecipes';
import withAuth from '../../middleware/withAuth';

const Profile = ({ session }) => {
    return (
        <div className="uk-container uk-margin-medium-top">
            <div className="uk-child-width-1-2@m" data-uk-grid>
                <div>
                    <UserInfo session={session} />
                </div>
                <div>
                    <UserRecipes username={session.getCurrentUser.username} />
                </div>
            </div>
        </div>
    )
}

export default withAuth(session => session && session.getCurrentUser)(Profile);
