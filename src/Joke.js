import React, { PureComponent } from 'react';
import './Joke.css';

class Joke extends React.Component{

getColor(){
if(this.props.votes > 0 && this.props.votes <=3){
    return '#ddb200';
} else if(this.props.votes > 3 && this.props.votes <=6) {
    return '#e8d200';
} else if (this.props.votes > 6 && this.props.votes <=9) {
    return '#b59e02';
} else if(this.props.votes > 9 && this.props.votes <=12) {
    return '#b5b302';
} else if(this.props.votes > 12 && this.props.votes <=15) {
    return '#96c903';
} else if(this.props.votes > 15){
    return '#5eb504';
} else if (this.props.votes === 0) {
   return '#003322';
} else if(this.props.votes < 0) {
   return '#b50101'; 
}
};


getEmoji(){
    if(this.props.votes > 0 && this.props.votes <=3){
        return 'em em-face_with_rolling_eyes';
    } else if(this.props.votes > 3 && this.props.votes <=6) {
        return 'em em-slightly_smiling_face';
    } else if (this.props.votes > 6 && this.props.votes <=9) {
        return 'em em-smiley';
    } else if(this.props.votes > 9 && this.props.votes <=12) {
        return 'em em-face_with_hand_over_mouth';
    } else if(this.props.votes > 12 && this.props.votes <=15) {
        return 'em em-laughing';
    } else if(this.props.votes > 15){
        return 'em em-rolling_on_the_floor_laughing';
    } else if (this.props.votes === 0) {
       return 'em em-neutral_face';
    } else if(this.props.votes < 0 && this.props.votes >= -3) {
       return 'em em-confused'; 
    } else if (this.props.votes < -3){
       return 'em em-angry';
    }
};


render() {
 const {id, text, votes, handleVotes} = this.props;   
return (
<div className="Joke">
    <div className="joke-btn">
    <i class="fas fa-chevron-up" onClick={() => handleVotes(id, 1)}></i>
    <span className="joke-votes" style={{borderColor: this.getColor()}}>{votes}</span>
    <i class="fas fa-chevron-down" onClick={() => handleVotes(id, -1)}></i>
    </div>

    <div className="joke-text">
     {text}
    </div>

    <div className="emoji">
    <i className={this.getEmoji()} aria-role="presentation" aria-label="ROLLING ON THE FLOOR LAUGHING"></i>
    </div>
</div>
)

}
};

export default Joke;