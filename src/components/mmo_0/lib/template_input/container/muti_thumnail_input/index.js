import React, { Component } from 'react';
import {Card,Grid,Image} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { makeid } from '../../../fs';
 class Muti_thuamnail_input extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected_img:{
        type:'',//img_editer
    },
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.img_result.length>0 && this.state.selected_img.type==nextProps.keyLock){
        this.props.fs_result(nextProps.img_result);
        this.setState({
            selected_img:{
                type:'',//img_editer
            },
        });
        this.props.closeAction();
    }
  }
  
  render() {
    let {option,img_list}=this.props;
    let bg_color={};
    if(option.bg_color!=undefined) bg_color.backgroundColor=option.bg_color;
      return (
        <React.Fragment>
          {option.space_before!=undefined&&option.space_before!=0&&<Grid.Column width={option.space_before==0?1:option.space_before}></Grid.Column>}
          <Grid.Column width={option.size==undefined?12:option.size}>
            <Card className='wrap-item-input' style={bg_color}>
              <Card.Content>
                <button className='buzz' style={{float:"right"}}
                  onClick={()=>{
                      let keyLock=makeid(6);
                      this.setState({
                          selected_img:{
                              type:keyLock,
                          }
                      });
                      this.props.openAction({
                          type:"OPEN",
                          is_muti_selected:true,
                          keyLock:keyLock
                      })
                  }}
                >
                  <i className="fa-solid fa-photo-film"></i> <span>Add Media</span>
                </button>
                <Card.Header>{option.name}</Card.Header>
                <Card.Meta>
                  <span className='date'>{option.des}</span>
                </Card.Meta>

                {
                  img_list.map((e,i)=>{
                    return <div className='img-muti' key={i}>
                              <Image
                                size='tiny'
                                src={e.url}
                              />
                              {i>0&&<i className="fa-solid fa-angles-left icon-img-muit"
                                onClick={()=>this.props.move_left_action(i)}
                              ></i>}
                              <i className="fa-solid fa-circle-xmark icon-x-img"
                                onClick={()=>{
                                  if(window.confirm("Xác nhận xóa!")){
                                    this.props.removeAction(e.id)
                                  }
                                }}
                              ></i>
                            </div>
                  })
                }

              </Card.Content>
            </Card>
          </Grid.Column>
          {option.space_before!=undefined&&option.space_before!=0&&<Grid.Column width={option.space_before==0?1:option.space_before}></Grid.Column>}
        </React.Fragment>
      );
  }
}

// 
const mapStateToProps = (state) => ({
  img_result: state.img_result,
  img_text_result: state.img_text_result,
  keyLock:state.keyLock
});

const mapDispatchToProps = (dispatch,props) => ({
  openAction: (data) => dispatch(data),
  closeAction: (type) => dispatch({type:'CLOSE'}),
});


export default connect(mapStateToProps, mapDispatchToProps)(Muti_thuamnail_input);