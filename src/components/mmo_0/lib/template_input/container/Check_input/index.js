import React, { Component } from 'react';
import {Card,Grid,Checkbox,Segment } from 'semantic-ui-react'
export default class Check_input extends Component {
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
                <Card.Header>Matthew</Card.Header>
              </Card.Content>
              <Card.Content extra >
                <Segment className='clorg'>
                  <Checkbox toggle label={{ children: 'Make my profile visible' }} />
                </Segment>
              </Card.Content>
            </Card>
          </Grid.Column>
        </React.Fragment>
      );
  }
}

