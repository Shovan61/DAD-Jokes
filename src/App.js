import React, { PureComponent } from 'react'
import './App.css';
import JokeList from './JokeList'

class App extends React.Component{
  render() {
    return (
      <div className="App">
        <JokeList/>
      </div>
    )
  }
}

export default App;
