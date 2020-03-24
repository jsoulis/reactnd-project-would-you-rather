import React, { Component } from 'react'
import { connect } from 'react-redux'

class NewQuestion extends Component {
    render() {
        return (
            <div>
                Hello
            </div>
        )
    }
}


function mapStateToProps({ questions, users, authedUser }) {
    
    return {
       
    }
}

export default connect(mapStateToProps)(NewQuestion)