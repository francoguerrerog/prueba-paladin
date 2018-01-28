import React from 'react';
import {
    Router,
    Route,
    IndexRoute,
    browserHistory
} from 'react-router';

import App from './components/App';
import Home from './components/homesite';
import Products from './components/products';
import Cart from './components/cart';

const RenderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/product" component={Products} />
            <Route path="/cart" component={Cart} />
        </Route>
    </Router>
);

export default RenderRoutes;