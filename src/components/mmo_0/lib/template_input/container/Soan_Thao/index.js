import React, { Component } from 'react';
import {Card,Grid,Segment} from 'semantic-ui-react';
export default class Soan_thao extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render() {
    let {option}=this.props;
    let bg_color={};
    if(option.bg_color!=undefined) bg_color.backgroundColor=option.bg_color;
      return (
        <React.Fragment>
             {option.space_before!=undefined&&option.space_before!=0&&<Grid.Column width={option.space_before==0?1:option.space_before}></Grid.Column>}
            <Grid.Column width={option.size==undefined?12:option.size}>
                <Card className='wrap-item-input' style={bg_color}>
                <Card.Content>
                    <Card.Header>{option.name}</Card.Header>
                    <Card.Meta>
                    <span className='date'>{option.des}</span>
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
            {option.space_before!=undefined&&option.space_before!=0&&<Grid.Column width={option.space_before==0?1:option.space_before}></Grid.Column>}
        </React.Fragment>
      );
  }
}

