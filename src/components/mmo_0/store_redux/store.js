import { createStore } from 'redux';
const page=30;
// Định nghĩa reducer và initial state
const initialState = {
  imgs_all: [
    // {
    //     id:0,
    //     url:'https://react.semantic-ui.com/images/wireframe/white-image.png',
    //     url300:'https://react.semantic-ui.com/images/wireframe/white-image.png',
    //     url150:'https://react.semantic-ui.com/images/wireframe/white-image.png',
    //     tag:'gs',
    // },
    // {
    //     id:1,
    //     url:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-giuong-sat-don-gian-mau-den-gia-re.jpg',
    //     url300:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-giuong-sat-don-gian-mau-den-gia-re.jpg',
    //     url150:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-giuong-sat-don-gian-mau-den-gia-re.jpg',
    //     tag:'gs',
    // },
    // {
    //     id:2,
    //     url:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-sat-don-gian-s6.jpg',
    //     url300:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-sat-don-gian-s6.jpg',
    //     url150:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-sat-don-gian-s6.jpg',
    //     tag:'gs',
    // },
    // {
    //     id:3,
    //     url:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-cho-ba-de.jpg',
    //     url300:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-cho-ba-de.jpg',
    //     url150:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-cho-ba-de.jpg',
    //     tag:'gs',
    // },
    // {
    //     id:4,
    //     url:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-sat-mau-trang-gia-re-binh-duong.jpg',
    //     url300:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-sat-mau-trang-gia-re-binh-duong.jpg',
    //     url150:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-sat-mau-trang-gia-re-binh-duong.jpg',
    //     tag:'gs',
    // },
  ],
  imgs_tag:[
    // {
    //     id:5,
    //     url:'https://react.semantic-ui.com/images/wireframe/white-image.png',
    //     url300:'https://react.semantic-ui.com/images/wireframe/white-image.png',
    //     url150:'https://react.semantic-ui.com/images/wireframe/white-image.png',
    //     tag:'gs',
    // },
    // {
    //     id:6,
    //     url:'https://anbinhnew.com/wp-content/uploads/2023/04/mua-giuong-o-thu-dau-mot.jpg',
    //     url300:'https://anbinhnew.com/wp-content/uploads/2023/04/mua-giuong-o-thu-dau-mot.jpg',
    //     url150:'https://anbinhnew.com/wp-content/uploads/2023/04/mua-giuong-o-thu-dau-mot.jpg',
    //     tag:'gs',
    // },
    // {
    //     id:7,
    //     url:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-hien-dai-AB123.jpg',
    //     url300:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-hien-dai-AB123.jpg',
    //     url150:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-hien-dai-AB123.jpg',
    //     tag:'gs',
    // },
    // {
    //     id:8,
    //     url:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-mau-xanh-AB123.jpg',
    //     url300:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-mau-xanh-AB123.jpg',
    //     url150:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-mau-xanh-AB123.jpg',
    //     tag:'gs',
    // },
    // {
    //     id:9,
    //     url:'https://anbinhnew.com/wp-content/uploads/2023/05/giuong-sat-an-binh.jpg',
    //     url300:'https://anbinhnew.com/wp-content/uploads/2023/05/giuong-sat-an-binh.jpg',
    //     url150:'https://anbinhnew.com/wp-content/uploads/2023/05/giuong-sat-an-binh.jpg',
    //     tag:'gs',
    // },
  ],
  show_more_tag:false,
  show_more_all:false,
  open:false,
  is_muti_selected:true,
  page_all:0,
  page_tag:0,
  keyLock:'',
  show_description_img:false,
  //
  img_result:[],
  img_text_result:"",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_TAG_NAME':
      console.log('123123')
      return {
        ...state,
        imgs_all:state.imgs_all.map((item) => {
          if (item.id === action.id) {
            return {
              ...item,
              tag: action.tag,
            };
          }
          return item;
        }),
        imgs_tag:state.imgs_tag.map((item) => {
          if (item.id === action.id) {
            return {
              ...item,
              tag: action.tag,
            };
          }
          return item;
        }),
      };
    case 'LOAD_IMGS_TAG_FROM_SV_more':
      if(action.arr.length>=page){
        return {
          ...state,
          imgs_tag:[...state.imgs_tag,...action.arr],
          show_more_tag:true,
          page_tag:state.page_tag+1,
        };
      }else{
        return {
          ...state,
          imgs_tag:[...state.imgs_tag,...action.arr],
          show_more_tag:false,
          page_tag:state.page_tag+1,
        };
      }
    case 'LOAD_IMGS_TAG_FROM_SV_firt':
      if(action.arr.length>=page){
        return {
          ...state,
          imgs_tag:[...action.arr],
          show_more_tag:true,
          page_tag:1,
        };
      }else{
        return {
          ...state,
          imgs_tag:[...action.arr],
          show_more_tag:false,
          page_tag:1,
        };
      }
    case 'LOAD_IMGS_ALL_FROM_SV':
      let a=[...state.imgs_all,...action.arr];
      a=a.filter((item, index, self) => {
        return index === self.findIndex((t) => (
            t.id === item.id
        ));
      });
      if(action.arr.length>=page){
          return {
          ...state,
          imgs_all:a,
          page_all:state.page_all+1,
          show_more_all:true
        };
      }else{
        return {
          ...state,
          imgs_all:[...state.imgs_all,...action.arr],
          page_all:state.page_all+1,
          show_more_all:false
        };
      }
    case 'UPLOAD_IMGS_ALL':
        return {
          ...state,
          imgs_all:[...action.arr,...state.imgs_all]
        };
    case 'CLOSE':
        return {
          ...state,
          open: false,
          img_result:[],
          text_img_title:'',
          keyLock:'',
        };
    case 'OPEN':
        return {
          ...state,
          open: true,
          img_result:[],
          text_img_title:'',
          is_muti_selected:action.is_muti_selected,
          keyLock:action.keyLock,
          show_description_img:action.show_description_img==undefined?false:action.show_description_img
        };
    case 'REMOVE_IMG':
      return {
        ...state,
        imgs_tag: state.imgs_tag.filter(e => e.id !== action.id),
        imgs_all: state.imgs_all.filter(e => e.id !== action.id),
      };
    case 'UPDATE_RESULT':
      return {
        ...state,
        img_result: action.result,
        img_text_result:action.text_img_title,
        open: false,
      };
    default:
      return state;
  }
};

// Tạo store Redux
const store = createStore(reducer);

export default store;
