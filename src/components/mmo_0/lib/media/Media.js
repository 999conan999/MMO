import React, { Component } from 'react';
import './Media.css';
import { connect } from 'react-redux';
import {Divider,Header,Card,Button,Icon,Input,Label} from 'semantic-ui-react'
import { toast } from 'react-toastify';
class Media extends Component {
  constructor(props) {
    super(props)
    this.myRef1 = React.createRef();
    this.state = {
      text_tag_sort:'',
      text_tag_add:'',
      text_img_title:'',
      text_img_selected:'',
      result:[]
    }
  }

  render() {
    let { open,imgs_all,imgs_tag,show_more_tag,show_more_all,is_muti_selected,page_tag,page_all} = this.props;
    let {text_tag_sort,text_tag_add,text_img_selected,result,text_img_title}=this.state;
    let rs=imgs_all;
    let selected='all';
    if(text_tag_sort.replace(/\s/g, "")!=""){
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
                value={text_tag_sort}
                onChange={(e,data) => {
                  this.setState({text_tag_sort:data.value})
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
                                  this.myRef1.current.focus()
                                  result={
                                    id:e.id,
                                    url:e.url,
                                    tag:e.tag,
                                  };
                                  text_img_selected=","+e.id+",";
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
                              <Icon name="edit" className='icon-edit-tag'/>
                            </div>
                            {/* <div className='input-tag'>
                              <div className='re imgx'>
                                <div className="ui action input">
                                  <input type="text" value="http://ww.short.url/c0opq"/>
                                  <Button.Group basic size='small' className='colorgr'>
                                    <Button icon  color='red'>
                                      <Icon name='x' color='red' />
                                    </Button>
                                    <Button icon>
                                      <Icon name='checkmark' color='green' />
                                    </Button>
                                  </Button.Group>
                                </div>
                              </div>
                            </div> */}
                            
                          </div>
                          <Button.Group basic size='small'>

                            <Button animated='vertical'>
                              <Button.Content hidden>Copy Link</Button.Content>
                              <Button.Content visible>
                                <Icon name='copy' />
                              </Button.Content>
                            </Button>

                            
                            <Button animated='vertical'>
                              <Button.Content hidden>Xem</Button.Content>
                              <Button.Content visible>
                                <Icon name='eye' />
                              </Button.Content>
                            </Button>

                            <Button animated='vertical'>
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
            </div>

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
                    text_tag_sort:'',
                    text_tag_add:'',
                    text_img_title:'',
                  })
                  this.props.closeAction();
                }}
              >Hủy</button>
              <button className="ui positive button ABZ"
                onClick={()=>{
                  toast.success('Tải lên thành công!', { theme: "colored" })
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
  // removeItem: (index) => dispatch(removeItem(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Media);


