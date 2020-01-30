import React from 'react';
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

class Signup extends React.Component {
    
    constructor(props) {
      super(props);

      this.handleSignup = this.handleSignup.bind(this);
    }

    handleSignup(event) {
      event.preventDefault();
      console.log('Username: ' + this.username.value + '\n' + 'Passowrd: ' + this.password.value);
    }

    render() {      
      	return (
      		<div className="signup container">
	      		<Form onSubmit={this.handleSignup}>
	      			<FormGroup>
	              		<Input type="text" id="username" className="inputSignup" name="username" placeholder="Username" innerRef={(input) => this.username = input}/>
	            	</FormGroup>
	            	<FormGroup>
	              		<Input type="password" id="password" className="inputSignup" name="password" placeholder="Passowrd" innerRef={(input) => this.password = input}/>
	            	</FormGroup>
	            	<Button type="submit" value="submit" className="bg-primary">Signup</Button>                        
	          	</Form>
            </div>
        );
    }
}

export default Signup;