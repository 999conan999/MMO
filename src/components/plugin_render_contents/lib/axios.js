const axios = require('axios');
const { toast } =require ('react-toastify');
var url_home=window.url;
//
async function fs_gets(url){
    let data= await axios.get(url)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        toast.error('ERROR!',{theme: "colored"})
        console.log(error)
        return false;
    })
    return data;
}
 
// get img tag
const url_get_cates=url_home+'/wp-content/plugins/tools_contents/ajax/tools/get_cates_tool.php';
export async function get_cates(){
    let url=url_get_cates;
    let data= await axios.get(url)
    .then(function (response) {
        // console.log("🚀 ~ file: axios.js:47 ~ response:", response)
        return response.data
    })
    .catch(function (error) {
        toast.error('Không lấy được hình ảnh!',{theme: "colored"})
        return [];
    })
    return data;
}
// get img tag
const url_get_tags=url_home+'/wp-content/plugins/tools_contents/ajax/tools/get_tags_name.php';
export async function get_tags(){
    let url=url_get_tags;
    let data= await axios.get(url)
    .then(function (response) {
        // console.log("🚀 ~ file: axios.js:47 ~ response:", response)
        return response.data
    })
    .catch(function (error) {
        toast.error('Không lấy được hình ảnh!',{theme: "colored"})
        return [];
    })
    return data;
}
// get img tag
const url_get_img_tag=url_home+'/wp-content/plugins/tools_contents/ajax/tools/get_imgs_by_tag.php?tag=';
export async function get_imgs_tag(tag,page){
    let url=url_get_img_tag+tag;
    let data= await axios.get(url)
    .then(function (response) {
        // console.log("🚀 ~ file: axios.js:47 ~ response:", response)
        return response.data
    })
    .catch(function (error) {
        toast.error('Không lấy được hình ảnh!',{theme: "colored"})
        return [];
    })
    return data;
}
// get img tag
const url_get_posts=url_home+'/wp-content/plugins/tools_contents/ajax/tools/get_posts.php?id=';
export async function get_posts(id_term){
    let url=url_get_posts+id_term;
    let data= await axios.get(url)
    .then(function (response) {
        // console.log("🚀 ~ file: axios.js:47 ~ response:", response)
        return response.data
    })
    .catch(function (error) {
        toast.error('Không lấy được hình ảnh!',{theme: "colored"})
        return [];
    })
    return data;
}
// // delete img
// const url_change_tag_img=url_home+'/wp-content/themes/shopseo/templates/ajax/media/change_tag.php';
// export async function change_name_tag(id,tag){
//     let data_send=new FormData();
//     data_send.append('id',id);
//     data_send.append('tag',tag);
//     let response= axios.post(url_change_tag_img, 
//         data_send
//     )
//     .then(function (response) {
//         return response.data;
//     })
//     .catch(function (error) {
//         console.log("🚀 ~ file: axios.js ~ line 97 ~ action_create_or_edit_post ~ error", error)
//         return {}
//     })
//     return response;
// }
//