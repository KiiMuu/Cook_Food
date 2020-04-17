import React, { Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';

import './Navbar.scss';

const Navbar = ({ session }) => {
    return (
        <div data-uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
            <div className="navbar" style={(window.location.pathname === '/' || window.location.pathname === '/signup' || window.location.pathname === '/signin') ? {background: '#000'} : {background: '#35A7FF'}}>
                <div className="navbar-content">
                    <nav className="uk-navbar-container uk-navbar-transparent uk-container" data-uk-navbar>
                        <div className="uk-navbar-left">
                            <ul className="uk-navbar-nav">
                                <li>
                                    <Link to="/">CookFood</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="uk-navbar-right">
                            { session && session.getCurrentUser ? <NavAuth session={session} /> : <NavGuest /> }
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

const NavAuth = ({ session }) => (
    <Fragment>
        <ul className="uk-navbar-nav uk-visible@s">
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/search">Search</NavLink>
            </li>
            <li>
                <NavLink to="/recipe/add">Add Recipe</NavLink>
            </li>
            <li>
                <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
                <NavLink to="#!">Sign Out</NavLink>
            </li>
        </ul>
        {/* Show Nav items in sidebar in phone screens */}
        <div className="sidebar uk-hidden@s">
            <span className="uk-button sidebar-btn" type="button" data-uk-toggle="target: #offcanvas-overlay">Open</span>
            <div id="offcanvas-overlay" data-uk-offcanvas="overlay: true">
                <div className="uk-offcanvas-bar">
                    <button className="uk-offcanvas-close" type="button" data-uk-close></button>
                    <Link className="logo" to="/">CookFood</Link>
                    <ul className="uk-nav uk-nav-default">
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/search">Search</NavLink>
                        </li>
                        <li>
                            <NavLink to="/recipe/add">Add Recipe</NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile">Profile</NavLink>
                        </li>
                        <li>
                            <NavLink to="#!">Sign Out</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        {/* <span>Welcome, {session.getCurrentUser.username}</span> */}
    </Fragment>
);

const NavGuest = () => (
    <Fragment>
        <ul className="uk-navbar-nav uk-visible@s">
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/search">Search</NavLink>
            </li>
            <li>
                <NavLink to="/signin">Sign In</NavLink>
            </li>
            <li>
                <NavLink to="/signup">Sign Up</NavLink>
            </li>
        </ul>
        {/* Show Nav items in sidebar in phone screens */}
        <div className="sidebar uk-hidden@s">
            <span className="uk-button sidebar-btn" type="button" data-uk-toggle="target: #offcanvas-overlay">Open</span>
            <div id="offcanvas-overlay" data-uk-offcanvas="overlay: true">
                <div className="uk-offcanvas-bar">
                    <button className="uk-offcanvas-close" type="button" data-uk-close></button>
                    <Link className="logo" to="/">CookFood</Link>
                    <ul className="uk-nav uk-nav-default">
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/search">Search</NavLink>
                        </li>
                        <li>
                            <NavLink to="/signin">Sign In</NavLink>
                        </li>
                        <li>
                            <NavLink to="/signup">Sign Up</NavLink>
                        </li>   
                    </ul>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Navbar;
