import React from 'react';
import ReactDOM from 'react-dom';
let module_name = './editor';
let App = require(module_name).default;
ReactDOM.render(<App />, document.getElementById('root'));
