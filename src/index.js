import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from './app/store/configureStore';
import ScrollToTop from './app/common/util/ScrollToTop';
import { loadEvent } from './app/features/event/eventActions';

const store = configureStore();
store.dispatch(loadEvent());

// console.log(store.getState());

const rootEL = document.getElementById('root');

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop><App /></ScrollToTop>
      </BrowserRouter>
    </Provider>
    ,
    rootEL)

}

if (module.hot) {
  module.hot.accept('./app/layout/App', () => {
    setTimeout(render);
  })
}

render();
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


serviceWorker.unregister();
