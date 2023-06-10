import React, { Component } from 'react';
import './notify.css'
// import { toast } from 'react-toastify';
import Editer from '../lib/editer/Editer';
import { Button,Header,Container,Segment,Grid} from 'semantic-ui-react';
export default class Notify extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data:"",
      editer_option: {
        is_open: false,
        text_html: '',
        index: -1
      },
    }
  }
  render() {
    let {data,is_open}=this.state
      return (
        <React.Fragment>
          <Container>
           <Segment>
           <div className='wrap-s'>
            <Grid>
              <Grid.Column width={16}>
                  <Header as='h1' textAlign="center">*Thông báo khuyến mãi cho khách hàng(bài sản phẩm)</Header>
              </Grid.Column>
              <Grid.Column width={12}>
                <div className='re'>
                  <Segment style={{minHeight:"100px"}}>
                    <div className='text-dt'>
                      <div dangerouslySetInnerHTML={{ __html: data }}></div>
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
          </Segment>
          </Container>
          {is_open && <Editer
          close={() => this.setState({is_open:false })}
          data={data}
          rs_data={(rs) => {
            let {data}=this.state;
            data=rs
            this.setState({data:data,is_open:false});
          }}
        />}
        </React.Fragment>
      );
  }
}

