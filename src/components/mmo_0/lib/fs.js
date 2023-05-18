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
  // Kiểm tra các tham số đầu vào
  // if (!Array.isArray(array) || fromIndex < 0 || fromIndex >= array.length || toIndex < 0 || toIndex >= array.length) {
  //   console.error('Invalid input');
  //   return array;
  // }

  // Sao chép mảng ban đầu để tránh thay đổi mảng gốc
  const newArray = [...array];

  // Di chuyển phần tử từ vị trí A đến vị trí B
  const element = newArray.splice(fromIndex, 1)[0];
  newArray.splice(toIndex, 0, element);

  return newArray;
}
 