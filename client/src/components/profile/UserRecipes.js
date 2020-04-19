import React from 'react';
import { Link } from 'react-router-dom';

import { Query, Mutation } from 'react-apollo';
import { GET_USER_RECIPES, DELETE_USER_RECIPE, GET_ALL_RECIPES, GET_CURRENT_USER } from '../../queries/index';

const handleDelete = deleteUserRecipe => {
    const confirmDelete = window.confirm('Are you sure you want to delete?');

    if (confirmDelete) {
        deleteUserRecipe().then(({ data }) => {
            console.log(data);
        });
    }
}

const UserRecipes = ({ username }) => (
    <Query query={GET_USER_RECIPES} variables={{ username }}>
        {({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error</div>
            console.log(data);
            return (
                <ul>
                    <h3>Your Recipes</h3>
                    {data.getUserRecipes.map(recipe => (
                        <li key={recipe._id}>
                            <Link to={`/recipes/${recipe._id}`}><p>{recipe.name}</p></Link>
                            <p>Likes: {recipe.likes}</p>
                            <Mutation 
                                mutation={DELETE_USER_RECIPE} 
                                variables={{ _id: recipe._id }}
                                refetchQueries={() => [
                                    { 
                                        query: GET_ALL_RECIPES 
                                    },
                                    {
                                        query: GET_CURRENT_USER
                                    }
                                ]}
                                update={(cache, { data: { deleteUserRecipe } }) => {
                                    const { getUserRecipes } = cache.readQuery({
                                        query: GET_USER_RECIPES,
                                        variables: { username }
                                    });

                                    cache.writeQuery({
                                        query: GET_USER_RECIPES,
                                        variables: { username },
                                        data: {
                                            getUserRecipes: getUserRecipes.filter(recipe => recipe._id !== deleteUserRecipe._id)
                                        }
                                    });
                                }}
                            >
                                {(deleteUserRecipe, attrs = {}) => (
                                    <div>
                                        {attrs.loading ? 'deleting...' : <button onClick={() => handleDelete(deleteUserRecipe)}>Delete</button>}
                                    </div>
                                )}
                            </Mutation>
                        </li>
                    ))}
                </ul>
            );
        }}
    </Query>
)

export default UserRecipes;
