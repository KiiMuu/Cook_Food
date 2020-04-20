import React from 'react';
import { Link } from 'react-router-dom';

import './Recipes.scss';

const RecipeItem = ({ _id, imageUrl, name, category }) => {
    return (
        <div>
            <li>
                <img src={`${imageUrl}`} alt={name} />
                <Link to={`/recipes/${_id}`}><h4>{name}</h4></Link>
                <span>{category}</span>
            </li>
        </div>
    )
}

export default RecipeItem;
