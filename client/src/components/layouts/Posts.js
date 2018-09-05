import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createPost } from '../../actions/postAction';

class Posts extends Component {
  constructor(){
    super();
    this.state = {
      text : '',
      image : ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this); 
  }
  onChange(e) {
    this.setState({[e.target.name] : e.target.value}) 
}

onSubmit(e){
    
    e.preventDefault();
    const post = {
        
        handle : this.state.handle,
        image : this.state.image,
        text : this.state.text
    }

   this.props.createPost(post);

    
}
  render() {
    
    return (
      <div className = "post">
      <div className = "container">
        <form onSubmit = {this.onSubmit}>
        <input type = "text" className = "form-control form-control-lg" placeholder = "Enter image link" name = "image" 
        value = {this.state.image} onChange = {this.onChange.bind(this)} />
        <input type = "text" className = "form-control form-control-lg" placeholder = "Enter description" name = "text" 
        value = {this.state.text} onChange = {this.onChange.bind(this)} />
        <input type="submit" className="btn btn-info btn-block mt-4" />
        </form>
      </div>
      <div className = "container">
      <div className = "row">{this.state.post}</div>
      </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  post : state.post
});

export default connect(mapStateToProps, {createPost})(Posts);