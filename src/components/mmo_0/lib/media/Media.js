import React, { Component } from 'react';
import './Media.css';
import { connect } from 'react-redux';
import {Divider,Header,Card,Button,Icon,Input,Label,Segment} from 'semantic-ui-react'
import { toast } from 'react-toastify';
class Media extends Component {
  constructor(props) {
    super(props)
    this.myRef1 = React.createRef();
    this.state = {
      text_tag_search:'',
      text_tag_edit:'',
      text_tag_add:'',
      text_img_title:'',
      text_img_selected:'',
      result:[],
      index_selected_tag:-1
    }
  }

  render() {
    let { open,imgs_all,imgs_tag,show_more_tag,show_more_all,is_muti_selected,page_tag,page_all} = this.props;
    let {text_tag_search,text_tag_add,text_img_selected,result,text_img_title,index_selected_tag,text_tag_edit}=this.state;
    let rs=imgs_all;
    let selected='all';
    if(text_tag_search.replace(/\s/g, "")!=""){
      selected='tag';
      rs=imgs_tag;
    }
    return (
      <React.Fragment>
        <div className='edit-modal' 
          style={open?{visibility:"visible"}:{visibility:"hidden"}}
            onClick={(event)=>{
              if (event.target.classList.contains('edit-modal')) {
                this.props.closeAction()
              }
          }}
        >
          <div className="lib-img ui">
            <div style={{width:"30%",display:"inline-block"}}>
              <Header as='h2'>Thư viện hình ảnh{result.length>0&&<span style={{color:"#03A9F4"}}>({result.length})</span>}</Header>
            </div>
            <div style={{width:"69%",display:"inline-block"}}>
              <Input
                icon='tags'
                iconPosition='left'
                label={{ tag: true, content: 'Add Tag' }}
                labelPosition='right'
                placeholder='Tìm hình bằng tag'
                value={text_tag_search}
                onChange={(e,data) => {
                  this.setState({text_tag_search:data.value})
                }}
              />
            </div>
            <div className='re' style={{width:"1%",display:"inline-block"}}>
              <div className='uploadz'>
                  <input type="file" className="inputfile" id="embedpollfileinput" />
                  <label for="embedpollfileinput" className="ui large right floated button">
                    <i className="ui upload icon"></i> 
                    Upload image
                  </label>
                  <div className='OKla'>
                    <Input placeholder='Tên tag cho hình tải lên...' 
                      value={text_tag_add}
                      onChange={(e,data) => {
                        this.setState({text_tag_add:data.value})
                      }}
                    />
                  </div>
              </div>
            </div>
            <Divider />
            <Segment 
              // loading
            >
                <div className='ovx'>
                  <Card.Group itemsPerRow={5}>
                    {
                      rs.map((e,i)=>{
                        let is_active=text_img_selected.search(","+e.id+",")==-1?false:true;
                        return (
                          <div className={"ui olive card cu img-card "+(is_active?"active-img":"")}>
                            <div className="image re">
                              <img src={e.url}
                                  onClick={()=>{
                                    let {result,text_img_selected}=this.state;
                                    if(is_muti_selected){
                                      let index=-1;
                                      result.forEach((item,j) => {
                                        if(item.id==e.id) index=j;
                                      });
                                      if(index>-1){
                                        result.splice(index,1);
                                        text_img_selected=text_img_selected.replace(","+e.id+",","")
                                      }else{
                                        result.push({
                                          id:e.id,
                                          url:e.url,
                                          tag:e.tag,
                                        });
                                        text_img_selected+=","+e.id+",";
                                      }
                                    }else{
                                      this.myRef1.current.focus();
                                      if(result.length==0||result[0].id!==e.id){
                                        result=[{
                                          id:e.id,
                                          url:e.url,
                                          tag:e.tag,
                                        }];
                                        text_img_selected=","+e.id+",";
                                      }else{
                                        result=[];
                                        text_img_selected='';
                                      }
                                    }
                                    this.setState({
                                      result:result,
                                      text_img_selected:text_img_selected
                                    })

                                  }}
                              />
                              <div className='tag-ps'>
                                  <Label as='a' tag>
                                    {e.tag}
                                  </Label>
                                  <Icon name="edit" className='icon-edit-tag'
                                    onClick={()=>{
                                      this.setState({index_selected_tag:e.id, text_tag_edit:e.tag})
                                    }}
                                  />
                                </div>
                                {index_selected_tag==e.id&&<div className='input-tag'>
                                  <div className='re imgx'>
                                    <div className="ui action input">
                                      <input
                                        type="text"
                                        value={text_tag_edit}
                                        onChange={(k)=>{
                                          this.setState({text_tag_edit:k.target.value})
                                        }}
                                      />
                                      <Button.Group basic size='small' className='colorgr'>
                                        <Button icon  color='red' 
                                          onClick={()=>{
                                            this.setState({index_selected_tag:-1})
                                          }}
                                        >
                                          <Icon name='x' color='red'  />
                                        </Button>
                                        <Button icon>
                                          <Icon name='checkmark' color='green' />
                                        </Button>
                                      </Button.Group>
                                    </div>
                                  </div>
                                </div>}
                                
                              </div>
                              <Button.Group basic size='small'>

                                <Button animated='vertical' 
                                onClick={()=>{
                                    navigator.clipboard.writeText(e.url);
                                    toast.success('Đã copy: '+e.url, { theme: "colored" })
                                }}
                                >
                                  <Button.Content hidden>Copy Link</Button.Content>
                                  <Button.Content visible>
                                    <Icon name='copy'  />
                                  </Button.Content>
                                </Button>

                                
                                <Button animated='vertical'
                                  onClick={()=> window.open(e.url, '_blank').focus()}
                                >
                                  <Button.Content hidden>Xem</Button.Content>
                                  <Button.Content visible>
                                    <Icon name='eye' />
                                  </Button.Content>
                                </Button>

                                <Button animated='vertical'
                                  onClick={()=>{
                                    if(window.confirm("Xác nhận xóa hình ảnh:("+e.id+")")){
                                      // todo

                                      let {result}=this.state;
                                      let l=result.length;
                                      result=result.filter(x => x.id !== e.id);
                                      this.props.removeImg(e.id);
                                      toast.success('Xóa thành công!', { theme: "colored" });
                                      if(l>result.length){
                                        this.setState({result:result})
                                      }


                                    }
                                  }}
                                >
                                  <Button.Content hidden>Xóa</Button.Content>
                                  <Button.Content visible>
                                    <Icon name='trash' />
                                  </Button.Content>
                                </Button>

                              </Button.Group>
                            </div>
                        )
                      })
                    }
                    
                  </Card.Group>
                  <div className='seemore'>
                    <Button inverted color='red' content='Xem thêm' />
                  </div>
                </div>
            </Segment>
            <Divider />
            <div className='inpuit-mth' style={{width:"60%",display:"inline-block"}}>
              {!is_muti_selected&&<Input label='Nhập tiêu đề hình ảnh' placeholder='...' className='w100' ref={this.myRef1} 
                value={text_img_title}
                onChange={(e,data) => {
                  this.setState({text_img_title:data.value})
                }}
              />}
            </div>
            <div className="actions" style={{textAlign:"right",width:"40%",display:"inline-block"}}>
              <button className="ui negative button ABZ"
                onClick={()=>{
                  this.setState({
                    result:[],
                    text_img_selected:'',
                    text_tag_search:'',
                    text_tag_add:'',
                    text_img_title:'',
                  })
                  this.props.closeAction();
                }}
              >Hủy</button>
              <button className="ui positive button ABZ"
                onClick={()=>{
                  // todo
                  this.props.updateResult(result,text_img_title);
                  this.setState({
                    result:[],
                    text_img_selected:'',
                    text_tag_search:'',
                    text_tag_add:'',
                    text_img_title:'',
                  })
                  try{
                    this.props.fs_return({
                      rs:result,
                      text:text_img_title
                    })
                  }catch(e){

                  }
                  toast.success('Tải lên thành công!', { theme: "colored" });
                }}
              >Chọn</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
// 
const mapStateToProps = (state) => ({
  imgs_all: state.imgs_all,
  imgs_tag: state.imgs_tag,
  show_more_tag: state.show_more_tag,
  show_more_all: state.show_more_all,
  open: state.open,
  is_muti_selected: state.is_muti_selected,
  page_all: state.page_all,
  page_tag: state.page_tag,
});

const mapDispatchToProps = (dispatch,props) => ({
  closeAction: (type) => dispatch({type:'CLOSE'}),
  removeImg: (id) => dispatch({type:'REMOVE_IMG',id:id}),
  updateResult:(result,text_img_title)=>dispatch({type:'UPDATE_RESULT',result:result,text_img_title:text_img_title})
});

export default connect(mapStateToProps, mapDispatchToProps)(Media);


