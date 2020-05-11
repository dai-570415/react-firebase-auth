import React from 'react';
import { Link } from 'react-router-dom';
import SignOut from '../elements/SignOut';
import firebase from '../Firebase';

const Profile = () => {
    const user = firebase.auth().currentUser;
    let email, uid;

    if (user != null) {
        email = user.email;
        uid = user.uid;
    }

    return (
        <React.Fragment>
            <h2>Profile</h2>
            <Link to="/">Home</Link>
                <p>ID: { uid }</p>
                <p>Email: { email }</p>
            <SignOut />
        </React.Fragment>
    );
}

export default Profile;