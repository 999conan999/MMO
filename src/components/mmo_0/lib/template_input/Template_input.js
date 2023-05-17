import React, { Component } from 'react';
import './template_input.css'
// import { toast } from 'react-toastify';
import Editer from '../editer/Editer';
import {Card,Grid,Segment,Input, Image,Form,TextArea,Checkbox,Dropdown,Button, Icon,Table } from 'semantic-ui-react'
import Soan_thao from './container/Soan_Thao';
import Small_input from './container/Small_input';
import Text_Area_input from './container/text_Area_input';
import Check_input from './container/Check_input';
import Table_input from './container/Table_input';
import Catagory_input from './container/Category_input';
import Tag_input from './container/tag_input';
import Selected_input from './container/selected_input';
import Thumnail_input from './container/thumnail_input';
import Muti_thuamnail_input from './container/muti_thumnail_input';
export default class Template_input extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // test
      a:1,
      test:[
        { key: 'English', text: 'English', value: 'English' },
        { key: 'French', text: 'French', value: 'French' },
        { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
        { key: 'German', text: 'German', value: 'German' },
        { key: 'Chinese', text: 'Chinese', value: 'Chinese' },
      ],
      tesst_vlue:[],
      // end test
      editer_option:{
        is_open:false,
        text_html:'',
        index:-1
      }
    }
  }
  render() {
    let {editer_option}=this.state;
      return (
        <React.Fragment>
          <Segment horizontal className='wrap-temp-input'
            // loading
          >
            <Grid>

                <Soan_thao
                  text_html={editer_option.text_html}
                  openAction={()=>{
                    this.setState({
                      editer_option:{
                        is_open:true,
                        text_html:'<h2>Giường sắt là gì?</h2><h3>Giường sắt là gì?</h3> <p>- <strong>Giường sắt</strong> là một loại <strong>giường ngủ</strong> được làm từ kim loại sắt hoặc hợp kim sắt, phần lớn ở đây là sắt, hoặc inox là chính. Thường được sử dụng trong các căn phòng ngủ hiện đại hoặc các khu trọ, giường sắt có thiết kế đơn giản và chắc chắn, giúp cho người sử dụng có thể nghỉ ngơi một cách thoải mái và an toàn.</p> <h3>Ưu điểm của giường sắt</h3> <ul> <li><strong>Độ bền cao</strong>: Giường sắt được làm từ vật liệu là sắt hoặc inox, cho nên có độ bền cao hơn so với những loại giường làm từ các vật liệu khác như giường gỗ, giường nhựa hay giường MDF. Điều này giúp giường sắt có thể sử dụng trong thời gian dài mà không cần phải lo lắng về việc sửa chữa hay thay thế.</li> <li><strong>Chống mối mọt</strong>: Vì được làm từ kim loại, giường sắt không bị mối mọt, không bị ảnh hưởng bởi môi trường ẩm ướt hay thời tiết khắc nghiệt. Điều này giúp giường sắt có tuổi thọ lâu dài và không cần phải bảo trì thường xuyên.</li> <li><strong>Dễ vệ sinh</strong>: Giường sắt có bề mặt phẳng, thiết kế đơn giản. Do đó, việc vệ sinh giường rất là dễ dàng và nhanh chóng.</li> <li><strong>Thiết kế đa dạng</strong>: Giường sắt có nhiều kiểu dáng và màu sắc khác nhau để phù hợp với nhu cầu và phong cách của từng người dùng. Người dùng có thể lựa chọn kiểu giường sắt với nhiều hình dáng, đường nét và màu sắc khác nhau để phù hợp với nội thất của căn phòng ngủ.</li> <li><strong>An toàn</strong>: Giường sắt có cấu trúc chắc chắn, không dễ bị đổ, gãy hay sập xuống. Điều này giúp người dùng cảm thấy an toàn hơn khi sử dụng giường sắt, đặc biệt là với trẻ nhỏ hay người già.</li> </ul>  ',
                        index:-1
                      }
                    })
                  }}
                />
                 
                <Small_input/>

                <Text_Area_input/>
                
                <Check_input/>

                <Table_input/>

                <Catagory_input/>

                <Tag_input/>


                <Selected_input/>

                <Thumnail_input/>
                <Muti_thuamnail_input/>





                {/* <Grid.Column width={4}>4</Grid.Column>
                <Grid.Column width={4}>4</Grid.Column> */}

                

            </Grid>
            {editer_option.is_open&&<Editer
              close={()=>this.setState({editer_option:{is_open:false,text_html:'',index:-1}})}
              data={editer_option.text_html}
              rs_data={(data) => {
                console.log("🚀 ~ file: Template_input.js:328 ~ Template_input ~ render ~ data:", data);
                // this.setState({editer_option:{is_open:false,text_html:'',index:-1}})
              }}
            />}
          </Segment>
        </React.Fragment>
      );
  }
}

