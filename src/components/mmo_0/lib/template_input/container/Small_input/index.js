import React, { Component } from 'react';
import {Card,Grid,Input,Segment} from 'semantic-ui-react'
export default class Small_input extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render() {
      return (
        <React.Fragment>
            <Grid.Column width={4}>
                <Card className='wrap-item-input'>
                <Card.Content>
                    <Card.Header>Mattxxxhew</Card.Header>
                    <Card.Meta>
                    <span className='date'>Matthew is a musician living in Nashville.</span>
                    </Card.Meta>
                </Card.Content>
                <Card.Content extra >
                    <Segment className='clorg'>
                      <Input
                          label={{ icon: 'asterisk' }}
                          labelPosition='left corner'
                          placeholder='...'
                          className="input-1"
                      />
                    </Segment>
                </Card.Content>
                </Card>
            </Grid.Column>
        </React.Fragment>
      );
  }
}

