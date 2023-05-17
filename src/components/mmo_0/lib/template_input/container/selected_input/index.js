import React, { Component } from 'react';
import {Card,Grid,Dropdown,Segment }  from 'semantic-ui-react'
export default class Selected_input extends Component {
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
                <Card.Header>Matthew</Card.Header>
                <Card.Meta>
                  <span className='date'>Matthew is a musician</span>
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <Segment className='clorg hg'>
                  <Dropdown  
                    value={1}
                    options={[
                        { key: 1, text: 'Choice 1', value: 1 },
                        { key: 2, text: 'Choice 2', value: 2 },
                        { key: 3, text: 'Choice 3', value: 3 },
                      ]} 
                      onChange={(e,data) => {
                        console.log("🚀 ~ file: Template_input.js:164 ~ Template_input ~ render ~ data:", data)
                      this.setState({a:data.value})
                      }}
                  />
                </Segment>
              </Card.Content>
            </Card>

        </Grid.Column>
        </React.Fragment>
      );
  }
}

