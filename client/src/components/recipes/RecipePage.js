import React from 'react';
import { withRouter } from 'react-router-dom';

import { Query } from 'react-apollo';
import { GET_RECIPE } from '../../queries/index';

import LikeRecipe from './LikeRecipe';

const RecipePage = ({ match }) => {
    const { _id } = match.params;
    return (
        <div className="recipe-page uk-margin-medium-top">
            <div className="uk-container">
                <Query query={GET_RECIPE} variables={{ _id }}>
                    {({ data, loading, error }) => {
                        if (loading) return <div>Loading...</div>
                        if (error) return <div>Error</div>
                        // console.log(data);
                        return (
                            <div className="recipe">
                                <div className="uk-child-width-1-2@l" data-uk-grid>
                                    <div className="recipe-img">
                                        <img src={`${data.getRecipe.imageUrl}`} alt={data.getRecipe.category} />
                                    </div>
                                    <div className="recipe-info">
                                        <h2>{data.getRecipe.name}</h2>
                                        <p>Category: {data.getRecipe.category}</p>
                                        <p>Description: {data.getRecipe.description}</p>
                                        <p>Instructions: {data.getRecipe.instructions}</p>
                                        <p>Likes: {data.getRecipe.likes}</p>
                                        <p>Created By: {data.getRecipe.username}</p>
                                        <LikeRecipe _id={_id} />
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                </Query>
            </div>
        </div>
    )
}

export default withRouter(RecipePage);
