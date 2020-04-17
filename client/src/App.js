import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

// components
import Navbar from './components/layout/navbar/Navbar';
import Home from './components/home/Home';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import AddRecipe from './components/recipes/add-recipe/AddRecipe';
import Search from './components/recipes/search/Search';
import Profile from './components/profile/Profile';

const App = ({ session, refetch }) => {
    return (
        <div className="uk-container">
            <Navbar session={session} />
            <Route exact path="/" component={Home} />
            <Switch>
                <Route path='/signin' render={() => <SignIn refetch={refetch} />} />
                <Route path='/signup' render={() => <SignUp refetch={refetch} />} />
                <Route path='/recipe/add' component={AddRecipe} />
                <Route path='/search' component={Search} />
                <Route path='/profile' component={Profile} />
            </Switch>
        </div>
    );
}

export default App;
