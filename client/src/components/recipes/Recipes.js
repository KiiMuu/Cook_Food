import React from 'react';

import RecipeItem from './RecipeItem';
import './Recipes.scss';

import { Query } from 'react-apollo';
import { GET_ALL_RECIPES } from '../../queries/index';


const Recipes = () => {
    return (
        <div className="recipes">
            <Query query={GET_ALL_RECIPES}>
                {({ data, loading, error }) => {
                    if (loading) return <div>Loading...</div>
                    if (error) return <div>Error</div>
                    // console.log(data);
                    return (
                        <ul>
                            {data.getAllRecipes.map(recipe => (
                                <RecipeItem key={recipe._id} {...recipe} />
                            ))}
                        </ul>
                    );
                }}
            </Query>
        </div>
    )
}

export default Recipes;
