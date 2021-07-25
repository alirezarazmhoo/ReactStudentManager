import logo from './logo.svg';
import NavigationItem from './components/Navigation/NavigationItem'
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Teachers from './screens/Teachers';

class App extends Component {
  render () {
    return (
         <BrowserRouter>
      <div>

<NavigationItem />


      </div>
            </BrowserRouter>
    );
  }
}

export default App;
