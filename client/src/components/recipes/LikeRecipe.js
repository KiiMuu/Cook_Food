import React, { useState, useEffect, Component } from 'react';

import { Mutation } from 'react-apollo';
import withSession from '../session/withSession';
import { LIKE_RECIPE } from '../../queries/index';

class LikeRecipe extends Component {

    state = {
        username: ''
    }

    componentDidMount() {
        if (this.props.session.getCurrentUser) {
            const { username } = this.props.session.getCurrentUser;
            this.setState({
                username
            }); 
        }
    }

    handleLike = (likeRecipe) => {
        likeRecipe().then(({ data }) => {
            console.log(data);
        });
    }

    render() {
        const { username } = this.state;
        const { _id } = this.props;
        return (
            <Mutation mutation={LIKE_RECIPE} variables={{ _id, username }}>
                {likeRecipe => (
                    (username && <button onClick={() => this.handleLike(likeRecipe)}>Like</button>)
                )}
            </Mutation>
        )
    }
}

export default withSession(LikeRecipe);
