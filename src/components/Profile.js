import React from 'react';
import { Link } from 'react-router-dom';
import SignOut from '../elements/SignOut';

const Profile = () => {
    return (
        <React.Fragment>
            <h2>Profile</h2>
            <Link to="/">Home</Link>
            <SignOut />
        </React.Fragment>
    );
}

export default Profile;