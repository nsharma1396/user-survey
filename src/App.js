import React, { Component } from 'react';
import './App.css';
import { DB_CONFIG } from './config';
import firebase from 'firebase/app';
import 'firebase/database';


class App extends Component {
  constructor(props) {
    super(props);
    this.app = firebase.initializeApp(DB_CONFIG)
    this.db = this.app.database().ref('contact');
    this.state = {
      age: "<=25yrs",
      gender:'',
      preference:"Mobile app",
      name:'',
      optional:'',
      comfort:'',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = {
      age: this.state.age,
      gender: this.state.gender,
      preference: this.state.preference,
      name: this.state.name,
      optional: this.state.optional,
      comfort: this.state.comfort,
    }
    this.db.push(data)
  }



  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-title">TEST</h1>
        </div>
        <form onSubmit={ this.handleSubmit }>
          <label>What is your age group?</label><br/>
          
          <select
            value={this.state.age}
            onChange={(ev) => this.setState({ age : ev.target.value })} >
            <option value="<=25yrs">&lt;=25yrs</option>
            <option value="26-35yrs">26-35yrs</option>
            <option value="36-50yrs">36-50yrs</option>
            <option value=">50yrs">&gt;50yrs</option>
          </select>
          <br/><br/>

          <label>What is your gender?</label><br/>
          
          <input type="radio"name="gender" value="Female" 
            onChange={(ev)=>this.setState({gender:ev.target.value})}/>Female<br/>
          <input type="radio" name="gender" value="Male" 
            onChange={(ev)=>this.setState({gender:ev.target.value})}/>Male<br/>
          <input type="radio" name="gender" value="Prefer not to say" 
            onChange={(ev)=>this.setState({gender:ev.target.value})}/>Prefer not to say<br/>
          Other: <input type="text" name="gender"
            onChange={(ev)=>this.setState({gender:ev.target.value})}/><br/><br/>

          <label>How would you like your healthy life-style change care to be delivered?</label><br/>
          
          <select
            value={this.state.preference}
            onChange={(ev)=> this.setState({preference: ev.target.value})}>
            <option name="preference" value="Mobile app">Mobile app</option>
            <option name="preference" value="Personal instructor over a video call">Personal instructor over a video call</option>
            <option name="preference" value="personal instructor in person">Personal instructor in person</option>
            <option name="preference" value="virtual group sessions">Virtual group sessions</option>
            <option name="preference" value="in-person group sessions">In-person group sessions</option>
            <option name="preference" value="other">Other</option>
          </select><br/>
          <label style={{visibility:this.state.preference==="other"?'visible':'hidden'}}>
          Other:
          <input type="text" name="preference"/>
          </label>
          <br/><br/>

          <label>Your Name</label><br/>
          <input type="text" name="name" onChange={(ev)=>this.setState({name:ev.target.value})}/><br/><br/>

          <label>Anything else you want to specify</label><br/>
          <input type="text" name="optional" onChange={(ev)=>this.setState({optional:ev.target.value})}/><br/><br/>

          <label>How comfortable are you with sharing your fitness information (in social media or focus groups)</label><br/>
          <input type="radio" name="comfort" value="Not comfortable at all"
            onChange={(ev)=>this.setState({comfort:ev.target.value})}/>Not comfortable at all<br/>
          <input type="radio" name="comfort" value="Open to sharing some of it"
            onChange={(ev)=>this.setState({comfort:ev.target.value})}/>Open to sharing some of it<br/>
          <input type="radio" name="comfort" value="Totally comfortable"
            onChange={(ev)=>this.setState({comfort:ev.target.value})}/>Totally Comfortable<br/>
          <br/>

          <input type="submit" value="Submit" />

        </form>
      </div>
    );
  }
}

export default App;
