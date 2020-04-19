import React, { Component } from 'react';

import './Search.scss';
import SearchItem from './SearchItem';

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
                                <SearchItem key={recipe._id} {...recipe} />
                            ))}
                        </ul>
                    </div>
                )}
            </ApolloConsumer>
        )
    }
}

export default Search;
