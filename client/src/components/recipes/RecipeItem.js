import React from 'react';
import { Link } from 'react-router-dom';

import './Recipes.scss';

const RecipeItem = ({ _id, name, category }) => {
    return (
        <div>
            <li>
                <Link to={`/recipes/${_id}`}><h4>{name}</h4></Link>
                <span>{category}</span>
            </li>
        </div>
    )
}

export default RecipeItem;
