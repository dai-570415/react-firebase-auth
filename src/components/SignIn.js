import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, FormFeedback, Spinner } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '../Firebase';

class SignIn extends Component {
    // constructor(props) {
    //     super(props);
    // }

    state = {
        loading: false
    }

    _isMounted = false;

    handleOnSubmit = (values) => {
        if(this._isMounted) {
            this.setState({ loading: true });
        }
        firebase.auth().signInWithEmailAndPassword(values.email, values.password)
            .then(() => {
                this.props.history.push('/');
                if(this._isMounted) {
                    this.setState({ loading: false });
                }
            })
            .catch((error) => {
                if(this._isMounted) {
                    this.setState({ loading: false });
                }
                alert(error);
            });
    }

    componentDidMount = () => {
        this._isMounted = true;
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render() {
        return (
            <React.Fragment>
                <h2>Sign in</h2>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values) => this.handleOnSubmit(values)}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email().required(),
                        password: Yup.string().required(),
                    })}
                >
                    {
                        ({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.email && errors.email ? true : false}
                                    />
                                    <FormFeedback>
                                        {errors.email}
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.password && errors.password ? true : false}
                                    />
                                    <FormFeedback>
                                        {errors.password}
                                    </FormFeedback>
                                </FormGroup>
                                <Button type="submit" disabled={this.state.loading}>
                                    <Spinner size="sm" color="light" style={{ marginRight: 5 }} hidden={!this.state.loading} />
                                    ログイン
                                </Button>
                            </Form>
                        )
                    }
                </Formik>
                <Link to="/signup">新規登録はこちら</Link>
            </React.Fragment>
        );
    }
}

export default withRouter(SignIn);