import React from 'react';

import RecipeItem from './RecipeItem';
import Spinner from '../spinner/Spinner';
import './Recipes.scss';

import { Query } from 'react-apollo';
import { GET_ALL_RECIPES } from '../../queries/index';


const Recipes = () => {
    return (
        <div className="recipes">
            <Query query={GET_ALL_RECIPES}>
                {({ data, loading, error }) => {
                    if (loading) return <Spinner />
                    if (error) return <div>Error</div>
                    // console.log(data);
                    return (
                        <div data-uk-grid>
                            {data.getAllRecipes.map(recipe => (
                                <RecipeItem key={recipe._id} {...recipe} />
                            ))}
                        </div>
                    );
                }}
            </Query>
        </div>
    )
}

export default Recipes;
