export function  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export function moveElement(array, fromIndex, toIndex) {
  // Di chuyển phần tử từ vị trí A đến vị trí B
  let element = array.splice(fromIndex, 1)[0];
  array.splice(toIndex, 0, element);

  return array;
}
 