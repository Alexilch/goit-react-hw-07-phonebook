import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';

// import { myAction, myAction2 } from './redux/actions';
import { store } from './redux/store';
// import { PersistGate } from 'redux-persist/integration/react';
// console.log(store);
// store.dispatch(myAction(15));
// store.dispatch(myAction2)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
