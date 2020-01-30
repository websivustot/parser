import React from 'react';
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

class Login extends React.Component {
    
    constructor(props) {
      super(props);

      this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(event) {
      event.preventDefault();
      console.log('Username: ' + this.username.value + '\n' + 'Passowrd: ' + this.password.value);
    }

    render() {      
      	return (
          <div className="login container">
        		<Form onSubmit={this.handleLogin}>
        			<FormGroup>
                <Input type="text" id="username" className="inputLogin" name="username" placeholder="Username" innerRef={(input) => this.username = input}/>
              </FormGroup>
              <FormGroup>
                <Input type="password" id="password" className="inputLogin" name="password" placeholder="Passowrd" innerRef={(input) => this.password = input}/>
              </FormGroup>
              <Button type="submit" value="submit" className="bg-primary">Login</Button>                        
            </Form>
          </div>
        );
    }
}

export default Login;