import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {Component} from 'react';
import './App.css';

class App extends Component {
  
  constructor(){
    super();

    this.state = {
      cleartext: '',
      rot13: ''
    }

    this.rot13 = this.rot13.bind(this);
  }
  
  render() {
    return (
      <div>
        <textarea value={this.state.cleartext} onChange={this.rot13}></textarea>
        <br />ROT13: {this.state.rot13}
      </div>
    );
  }

  rot13(event) {

    const url = "http://rot13-rot13-backend.7e14.starter-us-west-2.openshiftapps.com/api/greeting?name=";
    const input = event.target.value;
    this.setState({
      cleartext: input
    });
    
    axios.get(url + input).then(response => this.setState({
      rot13: response.data.content
    }));
    
  };
}

export default App;
