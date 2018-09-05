import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import  * as classnames  from 'classnames';
import PropTypes from 'prop-types';
import { registerUser } from '../../actions/authAction';

class Register extends Component {
constructor() {
    super();
    this.state = {
        name : '',
        email : '',
        password : '',
        errors : {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}

onChange(e) {
  this.setState({[e.target.name] : e.target.value}) 
}

onSubmit(e) {
  e.preventDefault();
    const newUser = {
        name :this.state.name,
        email : this.state.email,
        password : this.state.password
    }

   
    this.props.registerUser(newUser, this.props.history);
}

componentWillReceiveProps(nextProps) {
  console.log("In function : " + nextProps.auth);
  if (nextProps.errors){
    console.log("Errors are  : " + nextProps.errors.email)  
    this.setState({errors: nextProps.errors});
  }
}

  render() {
    const { errors } = this.state;
  
    
    return (
      <div>
        <form onSubmit={this.onSubmit}>
        <input type = "text" className = "form-control form-control-lg" placeholder = "Enter your name" name = "name" value = {this.state.name} 
        onChange = {this.onChange.bind(this)} />
        <input type = "email" className = {classnames('form-control form-control-lg', {'is-invalid' : errors.email})} 
        placeholder = "Enter email" name = "email" value = {this.state.email} onChange = {this.onChange.bind(this)} />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        
        <input type = "password" className = "form-control form-control-lg" placeholder = "Enter password" name = "password" value = {this.state.password} 
        onChange = {this.onChange.bind(this)} />
        <input type="submit" className="btn btn-info btn-block mt-4" />
         </form>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  //errors: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
  auth : state.auth,
  errors : state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));