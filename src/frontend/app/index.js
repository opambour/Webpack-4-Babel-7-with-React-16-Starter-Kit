import React from 'react';
import ReactDom from 'react-dom';
import { Welcome } from '../components/index.component';

const welcomeElement = <Welcome name = 'React' /> ;
ReactDom.hydrate(welcomeElement, document.getElementById('welcome_msg'));

/**
 * Since React 16, the react-dom package `render` method is called `hydrate`
 * ReactDom.render();
 */
