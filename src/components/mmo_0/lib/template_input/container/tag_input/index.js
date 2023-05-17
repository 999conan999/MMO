import React, { Component } from 'react';
import {Card,Grid,Dropdown,Segment }  from 'semantic-ui-react'
export default class Tag_input extends Component {
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
                        <Card.Header>tag</Card.Header>
                        <Card.Meta>
                          <span className='date'>Matthew is a musician</span>
                        </Card.Meta>
                      </Card.Content>
                      <Card.Content extra>
                    <Segment className='clorg'>
                        <Dropdown
                          options={this.state.test}
                          placeholder='...'
                          search
                          selection
                          fluid
                          multiple
                          allowAdditions
                          value={this.state.tesst_vlue}
                          onAddItem={(e, { value }) => {
                            this.setState((prevState) => ({
                              test: [{ text: value, value }, ...prevState.test],
                            }))
                          }}
                          onChange={(e, { value }) => this.setState({ tesst_vlue: value })}
                        />
                      </Segment>
                      </Card.Content>
                    </Card>

                </Grid.Column>
        </React.Fragment>
      );
  }
}

