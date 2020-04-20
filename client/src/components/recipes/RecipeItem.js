import React from 'react';
import { Link } from 'react-router-dom';

import './Recipes.scss';

const RecipeItem = ({ _id, imageUrl, name, category }) => {
    return (
        <div className="uk-width-1-3@m">
            <div className="uk-card uk-card-default">
                <div className="uk-card-media-top">
                    <img src={`${imageUrl}`} alt={name} />
                </div>
                <div className="uk-card-body">
                    <h3 className="uk-card-title"><Link to={`/recipes/${_id}`} className="uk-link-heading"><h4>{name}</h4></Link></h3>
                    <div class="uk-card-badge uk-label">{category}</div>
                </div>
            </div>
        </div>
    )
}

export default RecipeItem;
