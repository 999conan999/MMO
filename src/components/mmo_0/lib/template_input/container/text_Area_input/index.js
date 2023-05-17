import React, { Component } from 'react';
import {Card,Grid,Form,TextArea,Segment} from 'semantic-ui-react'
export default class Text_Area_input extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render() {
      return (
        <React.Fragment>
          <Grid.Column width={6}>
            <Card className='wrap-item-input'>
                  <Card.Content>
                    <Card.Header>Matthew</Card.Header>
                    <Card.Meta>
                      <span className='date'>Matthew is a musician living in Nashville.</span>
                    </Card.Meta>
                  </Card.Content>
                  <Card.Content extra >
                    <Segment className='clorg'>
                      <Form>
                        <TextArea placeholder='...' style={{ minHeight: 150 }} />
                      </Form>
                    </Segment>
                  </Card.Content>
                </Card>
          </Grid.Column>
        </React.Fragment>
      );
  }
}

