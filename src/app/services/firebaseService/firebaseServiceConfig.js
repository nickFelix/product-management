const prodConfig = {
	// apiKey           : "YOUR_API_KEY",
	// authDomain       : "your-app.firebaseapp.com",
	// databaseURL      : "https://your-app.firebaseio.com",
	// projectId        : "your-app",
	// storageBucket    : "your-app.appspot.com",
	// messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
};

const devConfig = {
	apiKey: "AIzaSyBEuV4-tO0ZODyoWDD03PwJ4TXsk822cTE",
  authDomain: "now-test-76d4b.firebaseapp.com",
  databaseURL: "https://now-test-76d4b.firebaseio.com",
  projectId: "now-test-76d4b",
  storageBucket: "now-test-76d4b.appspot.com",
  messagingSenderId: "691702836636",
  appId: "1:691702836636:web:c6cbe36464030527676c59",
  measurementId: "G-K7B8E276RH"
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
