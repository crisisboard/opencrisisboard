import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import Geocode from "react-geocode";
import { MAP_KEY } from "../../config/credentials";
import styles from './styles';

// app store
import appStore from './store';

// app views
import AppContainer from './App';
import AdminContainer from './Admin';
import Dashboard from '../Views/AdminDashboard';
import Header from 'Containers/Header';
import ForumFeed from '../Views/ForumFeed';
import SingleDiscussion from '../Views/SingleDiscussion';
import NewDiscussion from '../Views/NewDiscussion';
import UserProfile from '../Views/UserProfile';
import RegisterPhone from '../Views/RegisterPhone';
import NotFound from '../Views/NotFound';

// geocode configs
Geocode.setApiKey(MAP_KEY);
Geocode.setLanguage("en");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

ReactDOM.render (
  <Provider store={appStore}>
    <Router history={browserHistory}>
      <Route path="/admin" component={AdminContainer}>
        <IndexRoute component={Dashboard} />
        <Route path="/admin/settings" component={AdminSettings} />
      </Route>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={ForumFeed} />
        <Route path=":forum" component={ForumFeed} />
        <Route path=":forum/discussion/:discussion" component={SingleDiscussion} />
        <Route path=":forum/new_discussion" component={NewDiscussion} />
        <Route path="user/:username" component={UserProfile} />
        <Route path="register/phone" component={RegisterPhone} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
