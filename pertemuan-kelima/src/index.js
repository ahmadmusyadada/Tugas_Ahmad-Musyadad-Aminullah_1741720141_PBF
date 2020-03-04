import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import HelloComponent from './component/HelloComponent';
import StateFullComponent from './container/StateFullComponent';
import BlogPost from "./container/BlogPost/BlogPost";

// function HelloWorld (){
//     return <p>Ini adalah function component</p>
// }

// const HelloWorld = () => {
//     return <p>Ini adalah arrow function</p>
// }

// class StatefullComponent extends React.Component{
//     render(){
//         return <p>Ini adalah Statefull Component</p>
//     }
// }

class Greeting extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}

ReactDOM.render(<BlogPost />, document.getElementById('root'));
// ReactDOM.render(<StateFullComponent />, document.getElementById('form'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
