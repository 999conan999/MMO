import React, { Component } from 'react';
import './Media.css'
import {Divider,Header,Card,Button,Icon,Input,Label} from 'semantic-ui-react'
import { toast } from 'react-toastify';
export default class Media extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true
    }
  }

  render() {
    let { open } = this.state
    return (
      <React.Fragment>
        <div className='edit-modal' 
        style={open?{visibility:"visible"}:{visibility:"hidden"}}
        // style={open?{zIndex:"99999"}:{zIndex:-1}}
          onClick={(event)=>{
            if (event.target.classList.contains('edit-modal')) {
              this.setState({open:false})
            }
          }}
        >
          <div className="lib-img ui">
            <div style={{width:"30%",display:"inline-block"}}>
              <Header as='h2'>Thư viện hình ảnh</Header>
            </div>
            <div style={{width:"69%",display:"inline-block"}}>
              <Input
                icon='tags'
                iconPosition='left'
                label={{ tag: true, content: 'Add Tag' }}
                labelPosition='right'
                placeholder='Tìm hình bằng tag'
              />
            </div>
            <div className='re' style={{width:"1%",display:"inline-block"}}>
              <div className='uploadz'>
                  <input type="file" class="inputfile" id="embedpollfileinput" />
                  <label for="embedpollfileinput" class="ui large right floated button">
                    <i class="ui upload icon"></i> 
                    Upload image
                  </label>
                  <div className='OKla'>
                    <Input placeholder='Tên tag cho hình tải lên...' />
                  </div>
              </div>
            </div>
            <Divider />
            <div className='ovx'>
              <Card.Group itemsPerRow={5}>
                
               <div className={"ui olive card cu img-card "}>
                 <div className="image re">
                   <img src="https://react.semantic-ui.com/images/wireframe/white-image.png"/>
                   <div className='tag-ps'>
                      <Label as='a' tag>
                        Giường sắt
                      </Label>
                      <Icon name="edit" className='icon-edit-tag'/>
                    </div>
                    <div className='input-tag'>
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
                    </div>
                    
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
         
               <div className={"ui olive card cu img-card active-img"} >
                 <div className="image re">
                   <img src="https://react.semantic-ui.com/images/wireframe/white-image.png"/>
                   {/* <div className='tag-ps'>
                      <Label as='a' tag>
                        Giường sắt
                      </Label>
                      <Icon name="edit" className='icon-edit-tag'/>
                    </div>
                    <div className='input-tag'>
                      <div className='re imgx'>
                        <div className="ui action input">
                          <input type="text" value="http://ww.short.url/c0opq"/>
                          <button className="ui teal icon right labeled button">
                            <i className="copy icon"></i>
                            <i className="copy icon"></i>
                          </button>
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
         
              </Card.Group>
            </div>
            <Divider />
            <div className='inpuit-mth' style={{width:"60%",display:"inline-block"}}>
              <Input label='Nhập tiêu đề hình ảnh' placeholder='...' className='w100' />
            </div>
            <div className="actions" style={{textAlign:"right",width:"40%",display:"inline-block"}}>
              <button className="ui negative button ABZ">No</button>
              <button className="ui positive button ABZ"
                onClick={()=>{
                  toast.success('Tải lên thành công!', { theme: "colored" })
                }}
              >Yes</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  // ramdom_color=()=>{
  //   const color=[
  //     'red','orange','yellow','olive','green','teal','blue','violet','purple','pink','brown','grey'
  //   ]
  //   return color[Math.floor((Math.random()*color.length))]
  // }
}

