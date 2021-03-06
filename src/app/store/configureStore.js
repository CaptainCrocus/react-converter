import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const configureStore = () => (
    compose(applyMiddleware(
        thunk,
    ))(createStore)(rootReducer)
);

export default configureStore;
