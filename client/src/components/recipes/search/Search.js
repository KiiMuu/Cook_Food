import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Search.scss';

import { ApolloConsumer } from 'react-apollo';
import { SEARCH_RECIPES } from '../../../queries/index';

class Search extends Component {

    state = {
        searchResults: []
    }

    handleChange = ({ searchRecipes }) => {
        this.setState({
            searchResults: searchRecipes
        });
    }

    render() {
        const { searchResults } = this.state;
        return (
            <ApolloConsumer>
                {(client) => (
                    <div>
                        <input
                            type="text"
                            placeholder="Search Recipes"
                            onChange={async (e) => {
                                e.persist();
                                const { data } = await client.query({
                                    query: SEARCH_RECIPES,
                                    variables: {
                                        searchTerm: e.target.value
                                    }
                                });
                                this.handleChange(data);
                            }}
                        />
                        <ul>
                            {searchResults.map(recipe => (
                                <li key={recipe._id}>
                                    <Link to={`/recipes/${recipe._id}`}><h4>{recipe.name}</h4></Link>
                                    <p>Likes: {recipe.likes}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </ApolloConsumer>
        )
    }
}

export default Search;
