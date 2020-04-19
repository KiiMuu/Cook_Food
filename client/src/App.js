import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

// components
import Navbar from './components/layout/navbar/Navbar';
import Home from './components/home/Home';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import AddRecipe from './components/recipes/add-recipe/AddRecipe';
import RecipePage from './components/recipes/RecipePage';
import Search from './components/recipes/search/Search';
import Profile from './components/profile/Profile';

const App = ({ session, refetch }) => {
    return (
        <Fragment>
            <Navbar session={session} />
            <Route exact path="/" component={Home} />
            <Switch>
                <Route path='/signin' render={() => <SignIn refetch={refetch} />} />
                <Route path='/signup' render={() => <SignUp refetch={refetch} />} />
                <Route path='/recipe/add' render={() => <AddRecipe session={session} />} />
                <Route path='/recipes/:_id' component={RecipePage} />
                <Route path='/search' component={Search} />
                <Route path='/profile' render={() => <Profile session={session} />} />
            </Switch>
        </Fragment>
    );
}

export default App;
