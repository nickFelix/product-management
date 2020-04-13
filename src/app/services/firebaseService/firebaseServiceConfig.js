import firebaseConfig from './firebaseConfig.json';

const prodConfig = firebaseConfig;

const devConfig = firebaseConfig;

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
