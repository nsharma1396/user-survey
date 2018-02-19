import React, { Component } from 'react';
import './Form.css';
import firebase from 'firebase/app';
import 'firebase/database';
import { Button, Form, Radio, Input, Dropdown, Label, Modal, Container } from 'semantic-ui-react';
import { DB_CONFIG } from '../../config';
import { options } from './options';

class FormComponent extends Component {
  
  constructor(props) {
    super(props);
    this.app = firebase.initializeApp(DB_CONFIG)
    this.db = this.app.database().ref('survey-details');
    this.state = {
      age: '',
      gender:'',
      email:'',
      preference:'',
      name:'',
      optional:'',
      comfort:'',
      toggleOtherGender: false,
      toggleOtherPreference: false,
      submitted: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.name!=='' && this.state.email!=='') {
      const data = {
        name: this.state.name,
        email: this.state.email,
        age: this.state.age===''?">Nothing Specified<":this.state.age,
        gender: this.state.gender===''?">Nothing Specified<":this.state.gender,
        preference: this.state.preference===''?">Nothing Specified<":this.state.preference,
        optional: this.state.optional===''?">Nothing Specified<":this.state.optional,
        comfort: this.state.comfort===''?">Nothing Specified<":this.state.comfort,
      }
      this.db.push(data)
    }
    else {
      this.setState({
        err: true,
      })
    }
    this.setState({
      age: '',
      gender:'',
      preference:'',
      name:'',
      email:'',
      optional:'',
      comfort:'',
      toggleOtherGender: false,
      toggleOtherPreference: false,
      submitted: true,
    })
  }

  render() {
    return (
        <Container>
        <Modal
          size='small'
          open={this.state.submitted}
          onClose={()=>this.setState({submitted:false,err:false})}
        >
          <Modal.Header>{this.state.err?'Error! Could not submit the form':'Contact Survey Submitted!'}</Modal.Header>
          {this.state.err?
            <Modal.Content>Please fill the mandatory Name and Email fields</Modal.Content>
            :<Modal.Content>Your Contact Details Were Submitted Successfully!<br/>
            The details of the survey has been sent to your registered Email-Id.<br/>
            Thank you for taking the Survey!
            </Modal.Content>}
          <Modal.Actions>
            <Button onClick={()=>this.setState({submitted:false,err:false})} positive={!this.state.err} negative={this.state.err}>Okay</Button>
          </Modal.Actions>
        </Modal>
        <Form onSubmit={ this.handleSubmit } className="formbox">
          <Form.Field required >
            <Label color="black" size="large">Name <sup>*</sup></Label><br/><br/>
            <Input value={this.state.name} placeholder="Enter Your Name Here" onChange={(ev)=>this.setState({name:ev.target.value})}/>
          </Form.Field><br/>

          <Form.Field>
            <Label color="black" size="large">Email <sup>*</sup></Label><br/><br/>
            <Input
              type='email'
              value={this.state.email}
              placeholder="Enter Your Email Id Here"
              onChange={(ev)=>this.setState({email:ev.target.value})}
            />
          </Form.Field><br/>

          <Form.Field>
            <Label color="black" size="large">What is your age group?</Label><br/><br/>
            <Dropdown placeholder="Select Age Group" 
              value={this.state.age}
              onChange={(e,v) => this.setState({ age : v.value })}
              selection
              options={options} />
          </Form.Field><br/>

          <Form.Field>
            <Label color="black" size="large">What is your gender?</Label><br/><br/>
            <Radio
              label="Female"
              name="gender"
              value="Female" 
              checked={this.state.gender==='Female'}
              onChange={(e,v)=>this.setState({toggleOtherGender:false,gender:v.value})}/><br/>
            <Radio
              label="Male"
              name="gender"
              value="Male" 
              checked={this.state.gender==='Male'}
              onChange={(e,v)=>this.setState({toggleOtherGender:false,gender:v.value})}/><br/>
            <Radio
              label="Prefer not to say"
              name="gender"
              value="Prefer not to say"
              checked={this.state.gender==='Prefer not to say'}
              onChange={(e,v)=>this.setState({toggleOtherGender:false,gender:v.value})}/><br/>
            <Radio
              label="Other"
              name="gender"
              value="Other"
              checked={this.state.toggleOtherGender===true}
              onChange={(ev)=>this.setState({toggleOtherGender:true,gender:''})}/>
            {this.state.toggleOtherGender?
             <Input placeholder="Please specify here" focus onChange={(e,v)=>this.setState({gender:v.value})}/>
             :null
            }
          </Form.Field><br/>

          <Form.Field>
            <Label color="black" size="large">How would you like your healthy life-style change care to be delivered?</Label><br/><br/>
            <Radio
              label="Mobile app"
              name="preference"
              value="Mobile app" 
              checked={this.state.preference==='Mobile app'}
              onChange={(e,v)=>this.setState({toggleOtherPreference:false,preference:v.value})}/><br/>
            <Radio
              label="Personal instructor over a video call"
              name="preference"
              value="Personal instructor over a video call" 
              checked={this.state.preference==='Personal instructor over a video call'}
              onChange={(e,v)=>this.setState({toggleOtherPreference:false,preference:v.value})}/><br/>
            <Radio
              label="Personal instructor in person"
              name="preference"
              value="Personal instructor in person"
              checked={this.state.preference==='Personal instructor in person'}
              onChange={(e,v)=>this.setState({toggleOtherPreference:false,preference:v.value})}/><br/>
            <Radio
              label="In-person group sessions"
              name="preference"
              value="In-person group sessions"
              checked={this.state.preference==='In-person group sessions'}
              onChange={(e,v)=>this.setState({toggleOtherPreference:false,preference:v.value})}/><br/>
            <Radio
              label="Virtual group sessions"
              name="preference"
              value="Virtual group sessions"
              checked={this.state.preference==='Virtual group sessions'}
              onChange={(e,v)=>this.setState({toggleOtherPreference:false,preference:v.value})}/><br/>
            <Radio
              label="Other"
              name="preference"
              value="Other"
              checked={this.state.toggleOtherPreference===true}
              onChange={(ev)=>this.setState({toggleOtherPreference:true,preference:''})}/>
            {this.state.toggleOtherPreference?
             <Input placeholder="Please specify here"
              focus={this.state.toggleOtherPreference}
              onChange={(e,v)=>this.setState({preference:v.value})}/>
             :null
            }
          </Form.Field><br/>

          <Form.Field>
            <Label color="black" size="large">How comfortable are you with sharing your fitness information (in social media or focus groups)</Label><br/><br/>
            <Radio
                label="Not comfortable at all"
                name="comfort"
                value="Not comfortable at all" 
                checked={this.state.comfort==='Not comfortable at all'}
                onChange={(e,v)=>this.setState({comfort:v.value})}/><br/>
            <Radio
                label="Open to sharing some of it"
                name="comfort"
                value="Open to sharing some of it"
                checked={this.state.comfort==='Open to sharing some of it'}
                onChange={(e,v)=>this.setState({comfort:v.value})}/><br/>
            <Radio
                label="Totally comfortable"
                name="comfort"
                value="Totally comfortable" 
                checked={this.state.comfort==='Totally comfortable'}
                onChange={(e,v)=>this.setState({comfort:v.value})}/>
          </Form.Field><br/>

          <Form.Field>
            <Label color="black" size="large">Anything else you want to specify</Label><br/><br/>
            <Input value={this.state.optional} placeholder="Enter any additional information here" onChange={(ev)=>this.setState({optional:ev.target.value})}/>
          </Form.Field><br/>
          
          <Button fluid positive >Submit</Button>

        </Form>
      </Container>
    );
  }
}

export default FormComponent;
