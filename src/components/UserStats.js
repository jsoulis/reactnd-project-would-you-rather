import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserStats extends Component {
    render() {

        const { user, numAuthored, numAnswered, score } = this.props;

        const { avatarURL, name } = user;

        return (
            <div className='question'>
                <div>
                    <img
                        src={avatarURL}
                        alt={`Avatar of ${name}`}
                        className='avatar'
                    />
                    <p>{name}</p>
                    <div>
                        <p>{`Answered questions: ${numAnswered}`}</p>
                        <p>{`Created questions: ${numAuthored}`}</p>
                    </div>
                    <div>
                        <p>{`Score: ${score}`}</p>
                    </div>
                </div> 
            </div>
        )
    }
}


function mapStateToProps({ users }, { id }) {
    const user = users[id];
    const numAnswered = Object.keys(user.answers).length;
    const numAuthored = user.questions.length;
    const score = numAuthored + numAnswered;

    return {
       user,
       numAnswered,
       numAuthored,
       score
    }
}

export default connect(mapStateToProps)(UserStats)