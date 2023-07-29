import React, { Component } from 'react';
import './Media.css';
import { connect } from 'react-redux';
import {Divider,Header,Card,Button,Icon,Input,Label,Segment} from 'semantic-ui-react'
import { toast } from 'react-toastify';
import {upload_core,get_imgs,get_imgs_tag,action_remove_img_by_id,change_name_tag} from '../axios';
import { debounce } from 'lodash';
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
      index_selected_tag:-1,
    }
    this.debouncedFetchData = debounce(async(value)=>{
      if(value!=""){
        let a=await get_imgs_tag(value,0);
          this.props.load_imgs_tag_firt(a);
      }
    }, 800);
    window.tag_smart=''
    window.load0=0;
  }
  handleChangeFile = async (e) => {
    let listFile = e.target.files;
    let {text_tag_add}=this.state;
    // //
    if (listFile.length > 0) {
        
        let a = await upload_core(listFile,text_tag_add);
        if(a.length>0){
          this.props.upload_imgs_all(a)
          this.setState({text_tag_add:'',text_tag_search:''})
          toast.success('Thay đổi thành công: ', { theme: "colored" })
        }
 
    }
 
  }
  //
  componentWillUnmount() {
    this.debouncedFetchData.cancel();
  }
 async componentDidMount(){
  window.load0++
  if(window.load0==1){
    let a=await get_imgs(this.props.page_all)
    try{
      // if(a.length>0){
        this.props.load_imgs_all(a);
      // }
      let tag_smart=localStorage.getItem('tag_smart');
      if(tag_smart) window.tag_smart=tag_smart;
      

    }catch(e){}
    
  }
}
  //
  render() {
    let list_tag_smart=window.tag_smart.split(",");

    //
    let { open,imgs_all,imgs_tag,show_more_tag,show_more_all,is_muti_selected,page_tag,page_all,show_description_img} = this.props;
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

          <div className="lib-img ui re">
            <div className='tag_qs'>
              {
                list_tag_smart.map((e,lk)=>{
                  if(e!=""){
                    return <Label as='a' key={lk} className='nonono'
                      onClick={(event)=>{
                        if (event.target.classList.contains('nonono')) {
                          this.setState({text_tag_search:e})
                          this.debouncedFetchData(e);
                        }
                      }}
                    >
                    {e}
                    <Icon name='delete' 
                      onClick={()=>{
                        window.tag_smart=window.tag_smart.replace(e+",","");
                        localStorage.setItem("tag_smart", window.tag_smart);
                        this.setState({text_tag_search:''})
                      }}
                    />
                  </Label>
                  }
                })
              }

            </div>
            <div style={{width:"30%",display:"inline-block"}}>
              <Header as='h2'>Thư viện hình ảnh{result.length>0&&<span style={{color:"#03A9F4"}}>({result.length})</span>}</Header>
            </div>
            <div style={{width:"69%",display:"inline-block",position:"relative"}}>
              <Input
                icon='tags'
                iconPosition='left'
                label={{ tag: true, content: 'Search Tag' }}
                labelPosition='right'
                placeholder='Tìm hình bằng tag'
                value={text_tag_search}
                onChange={(e,{value}) => {
                  value=value.replace(" ","")
                  this.setState({text_tag_search:value})
                  this.debouncedFetchData(value);
                }}
              />
              {text_tag_search!=""&&<a className='clearxs'
                onClick={()=>this.setState({text_tag_search:""})}
              >clear</a>}
            </div>
            <div className='re' style={{width:"1%",display:"inline-block"}}>
              <div className='uploadz'>
                  <input type="file" className="inputfile" id="embedpollfileinput"
                    onChange={this.handleChangeFile.bind(this)}
                    multiple
                  />
                  <label for="embedpollfileinput" className="ui large right floated button">
                    <i className="ui upload icon"></i> 
                    Upload image
                  </label>
                  <div className='OKla'>
                    <Input placeholder='Tag / Upload' 
                      value={text_tag_add}
                      onChange={(e,{value}) => {
                        value=value.replace(" ","")
                        this.setState({text_tag_add:value})
                      }}
                    />
                  </div>
              </div>
            </div>
            <Divider />
            <Segment>
                <div className='ovx'>
                  <Card.Group itemsPerRow={5}>
                    {
                      rs.map((e,i)=>{
                        //
                        if(window.tag_smart.search(e.tag)==-1){
                          window.tag_smart+=e.tag+','
                          localStorage.setItem("tag_smart", window.tag_smart);
                        }
                        //
                        let is_active=text_img_selected.search(","+e.id+",")==-1?false:true;
                        let is_mp4=e.url300.search(".mp4")==-1?false:true;
                        if(is_mp4&&text_tag_search=="") return null;
                        return (
                          <div className={"ui olive card cu img-card "+(is_active?"active-img":"")} key={e.id}>
                            <div className="image re">
                              {!is_mp4&&<img src={e.url300}
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
                                          url300:e.url300,
                                          url150:e.url150,
                                          tag:e.tag,
                                        });
                                        text_img_selected+=","+e.id+",";
                                      }
                                    }else{
                                      if(show_description_img) this.myRef1.current.focus();
                                      if(result.length==0||result[0].id!==e.id){
                                        result=[{
                                          id:e.id,
                                          url:e.url,
                                          url300:e.url300,
                                          url150:e.url150,
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
                              />}
                              {is_mp4&&<video  width={"100%"} controls
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
                                        url300:e.url300,
                                        url150:e.url150,
                                        tag:e.tag,
                                      });
                                      text_img_selected+=","+e.id+",";
                                    }
                                  }else{
                                    if(show_description_img) this.myRef1.current.focus();
                                    if(result.length==0||result[0].id!==e.id){
                                      result=[{
                                        id:e.id,
                                        url:e.url,
                                        url300:e.url300,
                                        url150:e.url150,
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
                              ><source src={e.url300}/> video
                                  
                                </video>}
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
                                          let value=k.target.value.replace(" ",'')
                                          this.setState({text_tag_edit:value})
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
                                        {text_tag_edit!=""&&<Button icon
                                          onClick={async()=>{
                                            if(text_tag_edit!=""){
                                              let a=await change_name_tag(e.id,text_tag_edit);
                                              if(a.id){
                                                this.props.change_tag_name(e.id,text_tag_edit);
                                                this.setState({index_selected_tag:-1})
                                                toast.success('Thay đổi thành công: ', { theme: "colored" })
                                              }else{
                                                toast.error('Lỗi! ', { theme: "colored" })
                                              }
                                            }
                                          }}
                                        >
                                          <Icon name='checkmark' color='green' />
                                        </Button>}
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
                                  onClick={async()=>{
                                    if(window.confirm("Xác nhận xóa hình ảnh:("+e.id+")")){
                                      // todo
                                      let a=await action_remove_img_by_id(e.id)
                                      if(a.status){
                                        let {result}=this.state;
                                        let l=result.length;
                                        result=result.filter(x => x.id !== e.id);
                                        this.props.removeImg(e.id);
                                        toast.success('Xóa thành công!', { theme: "colored" });
                                        if(l>result.length){
                                          this.setState({result:result})
                                        }
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
                  {this.props.show_more_all&&text_tag_search==""&&<div className='seemore'>
                    <Button inverted color='red' content='Xem thêm'
                      onClick={async()=>{
                        let a=await get_imgs(this.props.page_all)
                        try{
                          // if(a.length>0){
                            this.props.load_imgs_all(a);
                          // }
                        }catch(e){}
                      }}
                    />
                  </div>}
                  {this.props.show_more_tag&&text_tag_search!=""&&<div className='seemore'>
                    <Button inverted color='red' content='Xem thêm'
                      onClick={async()=>{
                        let a=await get_imgs_tag(text_tag_search,page_tag);
                        try{ 
                            this.props.load_imgs_tag_more(a);
                        }catch(e){}
                      }}
                    />
                  </div>}
                </div>
            </Segment>
            <Divider />
            <div className='inpuit-mth' style={{width:"60%",display:"inline-block"}}>
              {show_description_img&&<Input label='Nhập tiêu đề hình ảnh' placeholder='...' className='w100' ref={this.myRef1} 
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
  show_description_img:state.show_description_img
});

const mapDispatchToProps = (dispatch,props) => ({
  closeAction: (type) => dispatch({type:'CLOSE'}),
  removeImg: (id) => dispatch({type:'REMOVE_IMG',id:id}),
  upload_imgs_all: (arr) => dispatch({type:'UPLOAD_IMGS_ALL',arr:arr}),
  load_imgs_all: (arr) => dispatch({type:'LOAD_IMGS_ALL_FROM_SV',arr:arr}),
  load_imgs_tag_firt: (arr) => dispatch({type:'LOAD_IMGS_TAG_FROM_SV_firt',arr:arr}),
  load_imgs_tag_more: (arr) => dispatch({type:'LOAD_IMGS_TAG_FROM_SV_more',arr:arr}),
  change_tag_name: (id,tag) => dispatch({type:'CHANGE_TAG_NAME',id:id,tag:tag}),
  updateResult:(result,text_img_title)=>dispatch({type:'UPDATE_RESULT',result:result,text_img_title:text_img_title})
});

export default connect(mapStateToProps, mapDispatchToProps)(Media);


