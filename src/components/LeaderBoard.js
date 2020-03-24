import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserStats from './UserStats'

class LeaderBoard extends Component {
    render() {
        const { userIds } = this.props;

        return (
            <div>
                <ul>
                    {userIds.map((id) => (
                        <li key={id}>
                            <UserStats id={id}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}


function mapStateToProps({ users }) {
    
    const userIds = Object.keys(users);

    return {
       userIds
    }
}

export default connect(mapStateToProps)(LeaderBoard)