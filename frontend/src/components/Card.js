import React from 'react';
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';



class Card extends React.Component {

    constructor(props) {
        super(props);
  
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            list:[]            
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
                // do something with your data
                //console.log("data", data);
                this.setState({list: data});
              });
            return response;
        })/*
        .then((myJson) => {
            myJson.json().then(data => {
                // do something with your data
                console.log("data", data);
              });
            
        })*/;
        //console.log('URL: ' + this.url.value);
    }    
     
    render() {
        var obj = this.state.list;
        const list = Object.keys(obj).forEach(function (item, index) {
            console.log(item, obj[item])
        return <p>{item}</p>
    });


        

         console.log(list);

      	return (
            <div className="container">
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Input type="text" id="url" className="inputSignup" name="url" placeholder="place URL" innerRef={(input) => this.url = input}/>
                </FormGroup>
              
                <Button type="submit" value="submit" className="bg-primary">Send</Button>                        
            </Form>
            {list}
            </div>
        );
    }
}

export default Card;