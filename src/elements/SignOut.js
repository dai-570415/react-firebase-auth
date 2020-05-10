import React from 'react';
import firebase from '../Firebase';

const SignOut = () => {
    const handleLogout = () => {
        firebase.auth().signOut();
    }

    return (
        <React.Fragment>
            <button onClick={ handleLogout }>Sign out</button>
        </React.Fragment>
    );
}

export default SignOut;