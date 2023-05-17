import React, { Component } from 'react';
import {Card,Grid,Segment,Dropdown} from 'semantic-ui-react'
export default class Catagory_input extends Component {
  constructor (props) {
    super(props)
    this.state = {
      test:[
        { key: 'English', text: 'English', value: 'English' },
        { key: 'French', text: 'French', value: 'French' },
        { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
        { key: 'German', text: 'German', value: 'German' },
        { key: 'Chinese', text: 'Chinese', value: 'Chinese' },
      ],
    }
  }
  render() {
      return (
        <React.Fragment>
          <Grid.Column width={4}>
              <Card className='wrap-item-input'>
                <Card.Content>
                  <Card.Header>category</Card.Header>
                  <Card.Meta>
                    <span className='date'>Matthew is a musician</span>
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <Segment className='clorg'>
                    <Dropdown
                      options={this.state.test}
                      placeholder='...'
                      multiple
                      selection
                      fluid
                      // value={this.state.tesst_vlue}
                      // onChange={(e, { value }) => this.setState({ tesst_vlue: value })}
                    />
                  </Segment>
                </Card.Content>
              </Card>
          </Grid.Column>
        </React.Fragment>
      );
  }
}

