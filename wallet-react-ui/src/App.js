import React, { Component } from 'react';
import './App.css';
import { Dashboard } from './components/dashboard/dashboard';
import {Provider} from 'mobx-react';
import {default as stores} from './stores';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider {...stores}>
          <Dashboard />
        </Provider>
      </div>
    );
  }
}

export default App;
