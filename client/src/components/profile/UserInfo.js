import React from 'react';
import { Link } from 'react-router-dom';

const UserInfo = ({ session }) => (
    <div>
        <h3>User info</h3>
        <p>Username: {session.getCurrentUser.username}</p>
        <p>Email: {session.getCurrentUser.email}</p>
        <ul className="uk-list">
            <h3>{session.getCurrentUser.username}'s favorites</h3>
            {session.getCurrentUser.favourites.map(favourite => (
                <li key={favourite._id}>
                    <Link to={`/recipes/${favourite._id}`}><p>{favourite.name}</p></Link>
                </li>
            ))}
            {!session.getCurrentUser.favourites.length && <p>You have no favourites currently.</p>}
        </ul>
    </div>
)

export default UserInfo;
