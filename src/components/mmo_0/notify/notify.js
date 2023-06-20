import React, { Component } from 'react';
import './notify.css'
import { toast } from 'react-toastify';
import Editer from '../lib/editer/Editer';
import {update_setup,get_setup} from '../lib/axios'
import { Button,Header,Container,Segment,Grid} from 'semantic-ui-react';
export default class Notify extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data:{
        long_text:""
      },
      editer_option: {
        is_open: false,
        text_html: '',
        index: -1
      },
      is_loading:true
    }
  }
  async componentDidMount(){
    let a= await get_setup({name:'shopseo_notify'})
    if(a.long_text!=undefined){
      this.setState({data:a,is_loading:false})
    }else{
      this.setState({is_loading:false})
    }
  }
  render() {
    let {data,is_open,is_loading}=this.state
      return (
        <React.Fragment>
          <Container>
           <Segment loading={is_loading}>
           <div className='wrap-s'>
            <Grid>
              <Grid.Column width={16}>
                  <Header as='h1' textAlign="center">*Thông báo khuyến mãi cho khách hàng(bài sản phẩm)</Header>
              </Grid.Column>
              <Grid.Column width={12}>
                <div className='re'>
                  <Segment style={{minHeight:"100px"}}>
                    <div className='text-dt'>
                      <div dangerouslySetInnerHTML={{ __html: data.long_text }}></div>
                    </div>
                  </Segment>
                  <div className='editxx'>
                    <Button content='Chỉnh sửa nội dung' primary
                      onClick={()=>{
                        this.setState({
                          is_open:true,
                        })
                      }}
                    />
                  </div>
                </div>
              </Grid.Column>
            </Grid>
          </div>
          {!is_loading&&<div style={{position:"fixed",right:"10px",bottom:"26px"}}>
              <Button primary className='createx'
                onClick={async()=>{
                  let {data}=this.state;
                  let a=await update_setup({
                    value:JSON.stringify(data),
                    name:'shopseo_notify'
                  })
                  console.log("🚀 ~ file: setup.js:581 ~ Setup ~ render ~  a:",  a)
                  if(a.status){
                    toast.success('Cập nhật thành công', { theme: "colored" });
                  }else{
                    toast.info('Lỗi rồi bạn ơi', { theme: "colored" });
                  }
                }}
              >Cập nhật</Button>
            </div>}
          </Segment>
          </Container>
          {is_open && <Editer
          close={() => this.setState({is_open:false })}
          data={data.long_text}
          rs_data={(rs) => {
            let {data}=this.state;
            data.long_text=rs
            this.setState({data:data,is_open:false});
          }}
        />}
        </React.Fragment>
      );
  }
}

