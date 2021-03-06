import React from 'react';
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';

class Card extends React.Component {

    constructor(props) {
        super(props);
  
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            list:[],
            links:[]            
        }
      }

    handleSubmit(event) {
        event.preventDefault();

        let getObject = {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify({ "url": this.url.value })
        }

        fetch("/card", getObject)
        .then((response) => {
            //console.log(response.body);
            response.json().then(data => {                
                //console.log("data", data);
                this.setState({list: data.list, links: data.links });
              });
            return response;
        })
    }    
     
    render() {       

      	return (
            <div className="container">
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Input type="text" id="url" className="inputSignup" name="url" placeholder="place URL" innerRef={(input) => this.url = input}/>
                </FormGroup>
              
                <Button type="submit" value="submit" className="bg-primary">Send</Button>                        
            </Form>
            <div class="row">
            { (Object.keys(this.state.list)).slice(0).reverse().map((item,index) =>(
                <div class="col-3" key={index}>
                    {item} - {this.state.list[item]}
                </div>
            )) }
            </div>
            
            </div>
        );
    }
}

export default Card;