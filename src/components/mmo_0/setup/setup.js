import React, { Component } from 'react';
import './setup.css'
// import { toast } from 'react-toastify';
import Template_input from '../lib/template_input/Template_input';
export default class Setup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data:[]
    }
  }
  render() {
      return (
        <React.Fragment>
             <Template_input
                tempalate={[
                  {
                    type_input:"muti_img_input",
                    name:'v1',
                    des:'Hiển thị Mô tả ngắn (mặc định có)',
                    space_before:0,
                    size:6,
                    space_after:0,
                    bg_color:"",
                    // condition_show:{// Không hiển thị khi đúng điều kiện này
                    //   index:-1,
                    //   value:false,
                    // }
                  },
                  {
                    type_input:"muti_img_input",
                    name:'v2',
                    des:'Hiển thị Mô tả ngắn (mặc định có)',
                    space_before:0,
                    size:6,
                    space_after:0,
                    bg_color:"",
                    // condition_show:{// Không hiển thị khi đúng điều kiện này
                    //   index:-1,
                    //   value:false,
                    // }
                  },
                  {
                    type_input:"thumnail_input",
                    name:'Mô tả check_input bài viết',
                    des:'Hiển thị Mô tả ngắn (mặc định có)',
                    space_before:0,
                    size:4,
                    space_after:0,
                    bg_color:"",
                    // condition_show:{// Không hiển thị khi đúng điều kiện này
                    //   index:-1,
                    //   value:false,
                    // }
                  },
                  // {
                  //   type_input:"check_input",
                  //   name:'Mô tả check_input bài viết',
                  //   des:'Hiển thị Mô tả ngắn (mặc định có)',
                  //   default_value:true,
                  //   space_before:0,
                  //   size:7,
                  //   space_after:0,
                  //   bg_color:"",
                  //   // condition_show:{// Không hiển thị khi đúng điều kiện này
                  //   //   index:-1,
                  //   //   value:false,
                  //   // }
                  // },
                  // {
                  //   type_input:"textArea_input",
                  //   name:'Mô tả textArea_input bài viết',
                  //   des:'Đây là nơi các bạn sẽ chỉnh sửa nội dung (textArea_input) cho bài viết',
                  //   space_before:0,
                  //   size:8,
                  //   space_after:0,
                  //   bg_color:"",
                  //   // condition_show:{// Không hiển thị khi đúng điều kiện này
                  //   //   index:0,
                  //   //   value:false,
                  //   // }
                  // },
                  // {
                  //   type_input:"soan_thao",
                  //   name:'Mô tả chi tiết bài viết',
                  //   des:'Đây là nơi các bạn sẽ chỉnh sửa nội dung (Mô tả) cho bài viết',
                  //   space_before:0,
                  //   size:12,
                  //   space_after:4,
                  //   bg_color:""
                  //   // condition_show:{// Không hiển thị khi đúng điều kiện này
                  //   //   index:-1,
                  //   //   value:false,
                  //   // }
                  // },
                  // {
                  //   type_input:"small_input",
                  //   name:'Tiêu đề bài viết',
                  //   des:'Đây là nơi các bạn sẽ chỉnh sửa (tiêu đề) bài viết',
                  //   space_before:0,
                  //   size:4,
                  //   space_after:0,
                  //   bg_color:""
                  //   // condition_show:{// Không hiển thị khi đúng điều kiện này
                  //   //   index:-1,
                  //   //   value:false,
                  //   // }
                  // },
                ]}
                data={this.state.data}
                data_option={[]}
                fs_return={(data)=>this.setState({data:data})}
             />
        </React.Fragment>
      );
  }
}

