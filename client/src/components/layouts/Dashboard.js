import React, { Component } from 'react';
import { Profiles } from './Profiles';
import {Link} from 'react-router-dom'; 

export default class Dashboard extends Component {
  render() {
    return (
      <div className = "dashboard">
        <div className = "container">
            <div className = "row">
                <div className = "col-md-8">Hello There!</div>
                <Link className="nav-link" to="/profiles">
                    Create or Edit Profile
                </Link>
            </div>
        </div>
        <div className = "container">
            <div className = "row">
                <Link className="nav-link" to="/posts">
                    Create a post
                </Link>
            </div>
        </div>
      </div>
    )
  }
}
