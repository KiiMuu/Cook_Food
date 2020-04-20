import React from 'react';
import './Home.scss';

// home components
import Recipes from '../../components/recipes/Recipes';

const Home = () => {
    return (
        <div className="uk-container uk-margin-medium-top">
            <Recipes />
        </div>
    )
}

export default Home;
