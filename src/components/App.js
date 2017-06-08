import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../assets/App.css';
import BLISAppsHomepage from '../containers/BLISAppsHomepage';
import { fetchApplications } from '../actions/fetch'
import Header from './Header';
import Docs from './Docs';
import About from './About';
import Support from './Support';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class App extends Component {
  componentWillMount(){
    this.props.fetchApplications();
  }
  render() {
    return (
      <Router>
        <div className="app">
          <Header />
          <Route exact path="/" component={BLISAppsHomepage} />
          <Route path="/myApps" component={BLISAppsHomepage} />
          <Route path="/about" component={About} />
          <Route path="/support" component={Support} />
          <Route path="/docs" component={Docs} />
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchApplications: fetchApplications,
    }, dispatch);
}
export default connect(null, mapDispatchToProps)(App);
