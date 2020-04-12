import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/rootreducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import firebase from '../config/firebase';

const rrfConfig = {
     userProfile: 'users',
     attachAuthIsReady: true,
     useFirestoreForProfile: true
}


export const configureStore = () => {

     const middlewares = [thunk.withExtraArgument({getFirebase, getFirestore})];

     const composedEnhancer = composeWithDevTools(
          applyMiddleware(...middlewares),
          reactReduxFirebase(firebase, rrfConfig),
          reduxFirestore(firebase)
     );

     const store = createStore(rootReducer, composedEnhancer);

     return store;
}