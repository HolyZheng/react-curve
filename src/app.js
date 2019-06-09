const React = require('react');
const ReactDOM = require('react-dom');
const ReactCurve = require('./components/react-curve');

ReactDOM.render(
  <ReactCurve lineColor="#F99952" textPosition="bottom" data={[10,13,15,20,10,12]} offset={30} width={800} height={100} contentHeight={50}/>,
  document.getElementById('app')
)
