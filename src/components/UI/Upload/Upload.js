import React, {Component} from 'react'
import './Upload.css';


class Upload extends Component {
  constructor(props){
    super(props)
    this.state = {
      file: null
    }
    
  }

  render() {
    return (
      <div>
        <img src={this.props.url}/>
      </div>
    );
  }
}

export default Upload;
