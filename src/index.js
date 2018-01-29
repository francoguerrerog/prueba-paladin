import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { PersistGate } from 'redux-persist/lib/integration/react'
import reducers from './reducers';
import RenderRoutes from './routes';
import '../index.css';

import configureStore from './store/configureStore'
let { store, persistor } = configureStore()

ReactDOM.render(
	<Provider store={store}>
      	<PersistGate loading={null} persistor={persistor}>
			<RenderRoutes />
		</PersistGate>
    </Provider>,
document.getElementById('root'));
