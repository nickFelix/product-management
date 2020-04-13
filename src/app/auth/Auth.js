import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import * as userActions from 'app/auth/store/actions';
import firebaseService from 'app/services/firebaseService';
import * as Actions from 'app/store/actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Auth extends Component {
	state = {
		waitAuthCheck: true
	};

	constructor(props) {
		super(props);

		this.firebaseCheck();
		
	}

	// componentDidMount() {
	// 	return Promise.all([
	// 		// Comment the lines which you do not use
	// 		this.firebaseCheck(),
	// 	]).then(() => {
	// 		this.setState({ waitAuthCheck: false });
	// 	});
	// }

	firebaseCheck = () => {

		firebaseService.init();

		firebaseService.onAuthStateChanged(authUser => {
			if (authUser && !localStorage.registering) {

				// this.props.showMessage({message: 'Logging in with Firebase'});

				/**
				 * Retrieve user data from Firebase
				 */
				firebaseService.getUserData(authUser.uid).then(user => {

					this.props.setUserData({
						...user,
						isAuthorized: true
					});


					// this.props.showMessage({message: 'Logged in with Firebase'});
				}, error => {

					console.error(error);

				})
			} else {				

				firebaseService.signOut();
				this.props.setUserData({ role: [] });

			}
		});

	}

	render() {
		return this.props.isAuthorized || this.props.role.length === 0 ? <React.Fragment children={this.props.children} /> : <FuseSplashScreen />;
	}
}

const mapStateToProps = state => ({
	isAuthorized: state.auth.user.isAuthorized,
	role: state.auth.user.role
})

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			logout: userActions.logoutUser,
			setUserData: userActions.setUserData,
			setUserDataFirebase: userActions.setUserDataFirebase,
			showMessage: Actions.showMessage,
			hideMessage: Actions.hideMessage
		},
		dispatch
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
