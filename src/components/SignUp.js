import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, FormFeedback, Spinner } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '../Firebase';

class SignUp extends Component {
    state = {
        loading: false,
    }

    _isMounted = false;

    handleOnSubmit = (values) => {
        if(this._isMounted) {
            this.setState({ loading: true });
        }
        firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
            .then(() => {
                if(this._isMounted) {
                    this.setState({ loading: false });
                    this.props.history.push('/');
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

    render () {
        return (
            <React.Fragment>
                <h2>Sign up</h2>
                <Formik
                    initialValues={{ email: '', password: '', tel: '' }}
                    onSubmit={(values) => this.handleOnSubmit(values)}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().email().required(),
                        password: Yup.string().required(),
                        tel: Yup.string().required(),
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
                                <FormGroup>
                                    <Input
                                        type="tel"
                                        name="tel"
                                        id="tel"
                                        placeholder="Tel"
                                        value={values.tel}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={touched.tel && errors.tel ? true : false}
                                    />
                                    <FormFeedback>
                                        {errors.tel}
                                    </FormFeedback>
                                </FormGroup>
                                <Button type="submit" disabled={this.state.loading}>
                                    <Spinner size="sm" color="light" style={{ marginRight: 5 }} hidden={!this.state.loading} />
                                    新規登録
                                </Button>
                            </Form>
                        )
                    }
                </Formik>
                <Link to="/signin">ログインはこちら</Link>
            </React.Fragment>
        );
    }
}

export default withRouter(SignUp);