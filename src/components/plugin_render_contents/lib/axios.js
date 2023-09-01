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
//
let url_create_or_edit_post=url_home+'/wp-content/plugins/tools_contents/ajax/tools/create_posts.php'
export async function create_posts(data){
    console.log("🚀 ~ file: axios.js:111 ~ action_create_or_edit_post ~ data:", data)
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
        data_send.append(key,data[key]);
    });
    //
    let response= axios.post(url_create_or_edit_post, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:121 ~ response:", response)
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_or_edit_post ~ error", error)
        return {}
    })
    return response;
}