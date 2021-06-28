export default class API{
  static _API_END_POINT = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/';

  static async request(_filePath){
      const filePath = _filePath ? _filePath : '';
      const URL = this._API_END_POINT + filePath;
      try{
          const response = await fetch(URL);
          const root = await response.json();

          return root;
      }
      catch(error){
          console.log('requestDirectory ERROR:',error);
          alert('requestDirectory ERROR:',error);

          return null;
      }
  }
}

