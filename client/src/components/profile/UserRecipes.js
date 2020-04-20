import React from 'react';
import { Link } from 'react-router-dom';

import { Query, Mutation } from 'react-apollo';
import { GET_USER_RECIPES, DELETE_USER_RECIPE, GET_ALL_RECIPES, GET_CURRENT_USER } from '../../queries/index';

const handleDelete = deleteUserRecipe => {
    const confirmDelete = window.confirm('Are you sure you want to delete?');

    if (confirmDelete) {
        deleteUserRecipe().then(({ data }) => {
            // console.log(data);
        });
    }
}

const UserRecipes = ({ username }) => (
    <Query query={GET_USER_RECIPES} variables={{ username }}>
        {({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error</div>
            // console.log(data);
            return (
                <ul className="uk-list">
                    <h3>Your Recipes</h3>
                    {!data.getUserRecipes.length && <p>You have't any recipes yet.</p>}
                    {data.getUserRecipes.map(recipe => (
                        <li key={recipe._id}>
                            <Link to={`/recipes/${recipe._id}`} className="uk-link-heading"><p>Name: {recipe.name}</p></Link>
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
                                        {attrs.loading ? 'deleting...' : <button onClick={() => handleDelete(deleteUserRecipe)} className="uk-button uk-button-danger uk-button-small">Delete</button>}
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
