import Navigation from './src/Navigation';
import Header from './src/Header';
import Content from './src/Content';
// import nameChecker from './src/Greet';
import Footer from './src/Footer';
import * as State from './state';
import { startCase } from 'lodash';
import Navigo from 'navigo';
import axios from 'axios';
var router = new Navigo(location.origin);

var root = document.querySelector('#root');

    
function render(state){
    if(!state.links.includes('Blog')){
        state.posts = [];

        axios
            .get('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                state.posts = response.data;
                console.log('inside axios call', state.posts);
            });
    }
    
    root.innerHTML = `
    ${Navigation(state)}
    ${Header(state.title)}
    ${Content(state)}
    ${Footer(state)}
    `;
    router.updatePageLinks();
}
    
function handleNavigation(params){
    var destination = startCase(params.page);

    render(State[destination]); // eslint-disable-line
}

router
    .on('/:page', handleNavigation)
    .on('/', () => handleNavigation({ 'page': 'Home' }))
    .resolve();


// fetch('https://jsonplaceholder.typicode.com/posts')
//  .then((response) => response.json())
//  .then((json) => console.log(json));

axios.get('https://jsonplaceholder.typicode.com/posts')
    .then((response) => console.log(response.data));