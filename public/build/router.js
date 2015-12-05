var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var render = require('react-dom').render;

render(React.createElement(
  Router,
  null,
  React.createElement(Route, { path: '/q', component: QuestionForm })
), document.body);