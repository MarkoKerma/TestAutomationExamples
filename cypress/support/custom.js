class CustomJSCommands {
  randomName(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  searchInArray(array, name) {
    for (var j = 0; j < array.length; j++) {
      if (array[j].match(name)) return j;
    }
    return 'not found';
  }
}

export default CustomJSCommands;
