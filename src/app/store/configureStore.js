import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/rootreducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export const configureStore = () => {

     const middlewares = [thunk];

     const composedEnchancer = composeWithDevTools(applyMiddleware(...middlewares));

     const store = createStore(rootReducer, composedEnchancer);

     return store;
}