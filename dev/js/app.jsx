var React = require('react');
var ReactDOM = require('react-dom');

var HelloWorld = React.createClass({
	es6_test: function() {
		return 1;
	},
	render: function() {
		return (
			<div>
	    		<h1>hello {this.es6_test()}</h1>
	    	</div>
		)
	}
});

class Test extends  React.Component {
  render() {
    <div>

    </div>
  }
}
ReactDOM.render(<HelloWorld />, document.getElementById('example'));