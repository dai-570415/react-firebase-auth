import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from './Firebase';
import LoadingOverlay from 'react-loading-overlay';

class Auth extends Component {
    state = {
        signinCheck: false,
        signedIn: false,
    }

    _isMounted = false;

    componentDidMount = () => {
        this._isMounted = true;

        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                if(this._isMounted) {
                    this.setState({
                        signinCheck: true,
                        signedIn: true,
                    });
                }
            } else {
                if(this._isMounted) {
                    this.setState({
                        signinCheck: true,
                        signedIn: false,
                    });
                }
            }
        });
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }
    
    render() {
        if(!this.state.signinCheck) {
            return (
                <React.Fragment>
                    <LoadingOverlay
                        active={ true }
                        spinner
                        text="Now Loading..."
                    >
                        <div style={{ width: '100vw', height: '100vh', }}></div>
                    </LoadingOverlay>
                </React.Fragment>
            );
        }

        if (this.state.signedIn) {
            return this.props.children;
        } else {
            return <Redirect to="/signin" />
        }
    }
}

export default Auth;