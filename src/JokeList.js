import React, { PureComponent } from 'react'
import './JokeList.css';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import Joke from './Joke';


class JokeList extends React.Component{
static defaultProps = {
    totalJokes: 10
};
    
constructor(props){
    super(props);
    this.state = {
        isLoading: false,
        jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]')
    };
    this.filteredJokes = new Set(this.state.jokes.map(j => j.text));

    this.handleVotes = this.handleVotes.bind(this);
    this.handleClick = this.handleClick.bind(this);
};


componentDidMount(){
if(!this.state.jokes.length) this.getJokes();

};



async getJokes(){
   
    try {
        let jokesArr = [];

    while(jokesArr.length < this.props.totalJokes){
        let response = await axios.get("https://icanhazdadjoke.com34/", {headers: {Accept: 'application/json'}});
    
        let joke = await response.data.joke;
         if(!this.filteredJokes.has(joke)){
            jokesArr.push({text: joke, id: uuid(), votes: 0});
         } 
    };
    
    this.setState(curSt => ({
        isLoading: false,
        jokes: [...curSt.jokes, ...jokesArr]
    }), 
    () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    );
    } catch (err) {
        alert(err);
        this.setState({isLoading: false});
    }


};



handleVotes(id, delta){
this.setState(curSt => ({
jokes: curSt.jokes.map(j => 
j.id === id ? {...j, votes: j.votes + delta} : j    
)
}),
() => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
);
};


handleClick(){
this.setState({isLoading: true}, this.getJokes);

}


render() {

if(this.state.isLoading){
    return (
        <div className="spin">
            <i class="fas fa-spinner fa-pulse"></i>
            <h1>Loading...</h1>
        </div>
    ) 
} else {
    return (
        <div className="JokeList">
            <div className="Jokelist-sidebar">
              <h1>DAD <span className="span">jokes</span></h1>
              <img className="img" src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" height="50%" width="85%" alt="face-img"/>
              <button className="btn" onClick={this.handleClick}>Fetch Jokes</button>
            </div>
           
           <div className="joke-list">
            {this.state.jokes.sort((a,b) => b.votes - a.votes).map(j => 
            {
                return (
                   <li>
                       <Joke
                       key={j.id}
                       id={j.id}
                       text={j.text}
                       votes={j.votes}
                       handleVotes={this.handleVotes}
                       />
                   </li>
                )
            }    
            )}
           </div>
        </div>
    )
}


}
};


export default JokeList;