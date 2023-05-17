import React, { Component } from 'react';
import {Card,Grid,Segment} from 'semantic-ui-react'
export default class Soan_thao extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render() {
      return (
        <React.Fragment>
            <Grid.Column width={12}>
                <Card className='wrap-item-input' style={{}}>
                <Card.Content>
                    <Card.Header>Matthew</Card.Header>
                    <Card.Meta>
                    <span className='date'>Matthew is a musician</span>
                    </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <Segment className='clorg'>
                        <div className='content-z'>
                            <div  dangerouslySetInnerHTML={{__html: this.props.text_html}}></div>
                        </div>
                    </Segment>
                    <div className='edit-content'>
                        <button
                        onClick={()=>this.props.openAction()}
                        >Chỉnh sửa</button>
                    </div>
                </Card.Content>
                </Card>
            </Grid.Column>
        </React.Fragment>
      );
  }
}

