import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';


import {auth} from "../../firebase";
import * as routes from '../../constants/routes'

const SignInPage = ({ history }) =>
    <div>
        <Login history={history} />
        {/*<PasswordForgetLink />*/}
        {/*<SignUpLink />*/}
    </div>;

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class Login extends Component{
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const {
            email,
            password,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState(() => ({ ...INITIAL_STATE }));
                history.push(routes.CALENDAR);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    };

    render(){
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';
        return(
            <div className="login justify-content-center mt-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-4">
                            <form
                                className="justifu-content-center d-flex flex-column"
                                onSubmit={this.onSubmit}
                            >
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                           placeholder="Enter email"
                                           name="username"
                                           value={email}
                                           onChange={event => this.setState(byPropKey('email', event.target.value))}
                                    >
                                    </input>

                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                                           name="password"
                                           value={password}
                                           onChange={event => this.setState(byPropKey('password', event.target.value))}
                                    >
                                    </input>
                                </div>
                                <button disabled={isInvalid} type="submit" className="btn btn-primary d-block mx-auto">Submit</button>
                                { error && <p>{error.message}</p> }
                            </form>
                            <SignUpLink />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const SignUpLink = () =>
    <p className="text-center">
        Don't have an account?
        {' '}
        <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>;

export default withRouter(SignInPage);

export {
    Login,
};