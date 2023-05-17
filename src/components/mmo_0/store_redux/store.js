import { createStore } from 'redux';

// Định nghĩa reducer và initial state
const initialState = {
  imgs_all: [
    {
        id:0,
        url:'https://react.semantic-ui.com/images/wireframe/white-image.png',
        tag:'gs',
    },
    {
        id:1,
        url:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-giuong-sat-don-gian-mau-den-gia-re.jpg',
        tag:'gs',
    },
    {
        id:2,
        url:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-sat-don-gian-s6.jpg',
        tag:'gs',
    },
    {
        id:3,
        url:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-cho-ba-de.jpg',
        tag:'gs',
    },
    {
        id:4,
        url:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-sat-mau-trang-gia-re-binh-duong.jpg',
        tag:'gs',
    },
  ],
  imgs_tag:[
    {
        id:5,
        url:'https://react.semantic-ui.com/images/wireframe/white-image.png',
        tag:'gs',
    },
    {
        id:6,
        url:'https://anbinhnew.com/wp-content/uploads/2023/04/mua-giuong-o-thu-dau-mot.jpg',
        tag:'gs',
    },
    {
        id:7,
        url:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-hien-dai-AB123.jpg',
        tag:'gs',
    },
    {
        id:8,
        url:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-mau-xanh-AB123.jpg',
        tag:'gs',
    },
    {
        id:9,
        url:'https://anbinhnew.com/wp-content/uploads/2023/05/giuong-sat-an-binh.jpg',
        tag:'gs',
    },
  ],
  show_more_tag:false,
  show_more_all:false,
  open:false,
  is_muti_selected:true,
  page_all:0,
  page_tag:0,
  //
  img_result:[],
  img_text_result:""
};

const reducer = (state = initialState, action) => {
  console.log("🚀 ~ file: store.js:17 ~ reducer ~ action:", action)
  switch (action.type) {
    // case 'ADD_TODO':
    //   return {
    //     ...state,
    //     todos: [...state.todos, action.payload],
    //   };
    // case 'REMOVE_TODO':
    //   return {
    //     ...state,
    //     todos: state.todos.filter(todo => todo.id !== action.payload),
    //   };
    case 'CLOSE':
        return {
          ...state,
          open: false,
          img_result:[],
          text_img_title:'',
        };
    case 'OPEN':
        return {
          ...state,
          open: true,
          img_result:[],
          text_img_title:'',
          is_muti_selected:action.is_muti_selected
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
