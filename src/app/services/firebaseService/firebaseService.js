import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import config from './firebaseServiceConfig';

class FirebaseService {
	init(success) {
		if (Object.entries(config).length === 0 && config.constructor === Object) {
			if (process.env.NODE_ENV === 'development') {
				console.warn(
					'Missing Firebase Configuration at src/app/services/firebaseService/firebaseServiceConfig.js'
				);
			}
			success(false);
			return;
		}

		if (firebase.apps.length) {
			return;
		}
		firebase.initializeApp(config);
		this.db = firebase.firestore();
		this.auth = firebase.auth();
		success(true);
	}

	getUserData = userId => {
		if (!firebase.apps.length) {
			return false;
		}
		return new Promise((resolve, reject) => {
			this.db.doc(`users/${userId}`).get()
				.then(doc => {

					const user = doc.data()
					resolve(user);

				});
		});
	};

	updateUserData = user => {
		if (!firebase.apps.length) {
			return false;
		}
		return this.db.doc(`users/${user.uid}`).set(user);
	};

	onAuthStateChanged = callback => {
		if (!this.auth) {
			return;
		}
		this.auth.onAuthStateChanged(callback);
	};

	signOut = () => {
		if (!this.auth) {
			return;
		}
		this.auth.signOut();
	};
}

const instance = new FirebaseService();

export default instance;
