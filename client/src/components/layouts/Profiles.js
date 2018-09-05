import React, { Component } from 'react'
import { connect } from 'react-redux';
import { userProfile } from '../../actions/profileActions';

class Profiles extends Component {
    constructor(){
        super();
        this.state = {
            name : '',
            handle : '',
            errors : {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name] : e.target.value}) 
    }
    
    onSubmit(e){
        
        e.preventDefault();
        const user = {
            name : this.state.name,
            handle : this.state.handle,
            image : this.state.image,
            interests : this.state.interests
        }
    
       this.props.userProfile(user);
    
        
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) { 
          this.setState({errors : nextProps.errors});
        }
      }

  render() {
    const { errors } = this.state;
    return (
        <div>
        <form onSubmit={this.onSubmit}>
        <input type = "text" className = "form-control form-control-lg" placeholder = "Enter your name" name = "name" 
        value = {this.state.name} onChange = {this.onChange.bind(this)} />
        <input type = "text" className = 'form-control form-control-lg' placeholder = "Your handle" name = "handle"
        value = {this.state.handle} onChange = {this.onChange.bind(this)} />
        {errors.handle && <div className="invalid-feedback">{errors.handle}</div>}
        
        <input type = "text" className = "form-control form-control-lg" placeholder = "Enter image link" name = "image" 
        value = {this.state.image} onChange = {this.onChange.bind(this)} />
        
        <input type = "text" className = "form-control form-control-lg" placeholder = "Your interests" name = "interests" 
        value = {this.state.interests} onChange = {this.onChange.bind(this)} />
        <input type="submit" className="btn btn-info btn-block mt-4" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    profiles : state.profiles,
    errors : state.errors
  });
  
  export default connect(mapStateToProps, {userProfile})(Profiles);