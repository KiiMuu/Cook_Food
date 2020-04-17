import React, { Fragment } from 'react';
import './Home.scss';

// home components
import Header from '../layout/header/Header';
import Recipes from '../../components/recipes/Recipes';

const Home = () => {
    return (
        <Fragment>
            <Header />
            <Recipes />
        </Fragment>
    )
}

export default Home;
