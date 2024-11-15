// import router from '@/router/index'
// import { Modal } from 'ant-design-vue'

export function checkStatus(status, errmsg) {
  // let errMessage: string = '';
  let errMessage = `${errmsg}`;
  switch (status) {
    case 400:
      // errMessage = `${errmsg}`;
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      //   localStorage.removeItem("token"); //移除token
      // errMessage = "未授权";
      //   router.push('/login')
      break;
    case 403:
      // errMessage = "403";
      break;
    // 404请求不存在
    case 404:
      // errMessage = "请求页面不存在";
      break;
    case 405:
      // errMessage = "405";
      break;
    case 408:
      // errMessage = "408";
      break;
    case 500:
      // errMessage = "服务器错误";
      break;
    case 501:
      // errMessage = "服务器错误";
      break;
    case 502:
      // errMessage = "服务器错误";
      break;
    case 503:
      // errMessage = "服务器错误";
      break;
    case 504:
      // errMessage = "服务器错误";
      break;
    case 505:
      // errMessage = "服务器错误";
      break;
    default:
      errMessage = "无网络";
  }
  //   message.error({
  //     type: 'error',
  //     content: errMessage
  //   })
}