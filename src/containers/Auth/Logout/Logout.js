import React, { Component } from 'react'
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
export class Logout extends Component {
    componentDidMount(){
        this.props.onLogOut();
    }
    render() {
        return <Redirect to="/"/>
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onLogOut : () => dispatch(actions.logOut())
    }
}

export default connect(null,mapDispatchToProps) (Logout)
