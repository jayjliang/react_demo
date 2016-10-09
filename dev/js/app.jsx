var React = require('react');
var ReactDOM = require('react-dom');
import { Router, Route, Link, browserHistory ,hashHistory} from 'react-router';
class Home extends  React.Component {
  render() {
    return (
    	<div>
    		<h1>this is Home</h1>
        <Link to="/about">about</Link>
    		{this.props.children}
    	</div>
    	
    	);
  }
};

class About extends  React.Component {
  render() {
    return <h1>this is About</h1>;
  }
};

class NoMatch extends  React.Component {
  render() {
  	return <h1>this is NoFound</h1>;
  }
};

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Home}>
      <Route path="about" component={About}/>
      <Route path="home" component={Home}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById("example"));