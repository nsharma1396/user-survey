import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import FormComponent from './components/Form';

const App = () => (
  <Container>
    <h1>Health Lifestyle Survey Form</h1>
    <FormComponent />
  </Container>
);

export default App;
