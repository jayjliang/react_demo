const React = require('react');

/* eslint react/prop-types: 0  react/prefer-stateless-function: 0*/
class HelloWorld extends React.Component {
  render() {
    return (
      <h1>Hello from {this.props.phrase}!</h1>
    );
  }
}
export default HelloWorld;
