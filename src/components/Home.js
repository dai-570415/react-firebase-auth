import React from 'react';
import { Link } from 'react-router-dom';
import SignOut from '../elements/SignOut';

const Home = () => {
    return (
        <React.Fragment>
            <h2>Home</h2>
            <Link to="/profile">Profile</Link>
            <SignOut />
        </React.Fragment>
    );
}

export default Home;