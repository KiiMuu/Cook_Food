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
            <div className="uk-margin-medium-top">
                <div className="uk-container">
                <ApolloConsumer>
                        {(client) => (
                            <div className="uk-text-center">
                                <nav className="uk-navbar-container" data-uk-navbar>
                                    <div className="uk-navbar-left">
                                        <div className="uk-navbar-item">
                                            <form className="uk-search uk-search-navbar">
                                                <span data-uk-search-icon></span>
                                                <input
                                                    className="uk-search-input"
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
                                            </form>
                                        </div>
                                    </div>
                                </nav>
                                <div data-uk-grid>
                                    {searchResults.map(recipe => (
                                        <SearchItem key={recipe._id} {...recipe} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </ApolloConsumer>
                </div>
            </div>
        )
    }
}

export default Search;
