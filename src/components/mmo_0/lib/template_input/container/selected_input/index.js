import React, { Component } from 'react';
import {Card,Grid,Dropdown,Segment }  from 'semantic-ui-react'
export default class Selected_input extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render() {
    let {option,text,data_option}=this.props;
    console.log("🚀 ~ file: index.js:10 ~ Selected_input ~ render ~ text:", text)
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
                <Segment className='clorg hg'>
                  <Dropdown  
                    value={text}
                    options={data_option}
                    onChange={(e,{value}) => {
                      this.props.fs_result(value);
                    }}
                  />
                </Segment>
              </Card.Content>
            </Card>
        </Grid.Column>
        {option.space_after!=undefined&&option.space_after!=0&&<Grid.Column width={option.space_after==0?1:option.space_after}></Grid.Column>}
        </React.Fragment>
      );
  }
}

