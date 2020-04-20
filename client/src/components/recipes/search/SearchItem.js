import React from 'react';
import { Link } from 'react-router-dom';

const SearchItem = ({ _id, name, likes }) => (
    <div className="uk-width-1-2@m uk-margin-medium-top">
        <div className="uk-card uk-card-default">
            <div className="uk-card-body">
                <h3 className="uk-card-title"><Link to={`/recipes/${_id}`} className="uk-link-heading"><h4>{name}</h4></Link></h3>
                <div class="uk-card-badge uk-label">Likes: {likes}</div>
            </div>
        </div>
    </div>
)

export default SearchItem;
