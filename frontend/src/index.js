import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'antd/dist/antd.css';
import App from './App';


import {Provider} from 'react-redux';
import {store} from './redux/store.js';

import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/lib/integration/react';

import * as serviceWorker from './serviceWorker';

const persistor=persistStore(store);

ReactDOM.render(
<Provider store={store}>
    <PersistGate
        persistor={persistor}><App/></PersistGate>
</Provider>,
document.getElementById('root')
)
;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
