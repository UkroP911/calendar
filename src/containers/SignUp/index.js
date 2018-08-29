import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import {auth, db} from "../../firebase";
import * as routes from '../../constants/routes';

const SignUpPage = ({history}) =>
    <div>
        <h1 className="py-5 text-center">SignUpPage</h1>
        <SignUpForm history={history}/>
    </div>;

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class SignUpForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            ...INITIAL_STATE
        }
    }

    onSubmit = (event) => {
        const {
            username,
            email,
            passwordOne,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {

                // Create a user in your own accessible Firebase Database too
                db.doCreateUser(authUser.user.uid, username, email)
                    .then(() => {
                        this.setState({ ...INITIAL_STATE });
                        history.push(routes.CALENDAR);
                    })
                    .catch(error => {
                        this.setState(byPropKey('error', error));
                    });

            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    };



    render(){
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return(
            <div className="container">
                <div className="row justify-content-center">
                    <form onSubmit={this.onSubmit} className="d-flex flex-column justify-content-center">

                        <div className="form-group">
                            <input
                                className="form-control"
                                value={username}
                                onChange={event => this.setState(byPropKey('username', event.target.value))}
                                type="text"
                                placeholder="Full Name"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                value={email}
                                onChange={event => this.setState(byPropKey('email', event.target.value))}
                                type="text"
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                value={passwordOne}
                                onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                value={passwordTwo}
                                onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                        <button disabled={isInvalid} type="submit"
                                className="btn btn-primary">
                            Sign Up
                        </button>

                        {error && <p>{error.message}</p>}
                    </form>
                </div>
            </div>

        )
    }
}



export default withRouter(SignUpPage);

export {
    SignUpForm,
}