// import myglobal from './myglobal';
import queryString from 'querystring';
let csrftoken;
const fetch = require('node-fetch');
let host = '';
if (window.require) {
  host = 'http://bbs.shuiguobang.com';
}
function myFetch(method, url, body, cb, headers2, err_callback) {
  console.log(url)
  let data;
  let headers;
  if (headers2) {
    headers = headers2;
  } else {
    headers = { 'Content-Type': 'text/html;charset=UTF-8;'
    ,connection: 'keep-alive'
    ,cookie: 'csrftoken='+csrftoken };
  }
  if (method === 'GET') {
    data = {
      method: method,
      credentials: 'include',
      headers: headers,
    };
  } else {
    data = {
      method: method,
      credentials: 'include',
      headers: headers,
      body: body,
    };
  }
  return fetch(host + url, data)
    .then((response)=>{
      // console.log(response);
      if (response.status >= 200 && response.status < 300) {
        // console.log(response);
        //   var r = response.json();
        // r.then(cb).catch(err_callback);
        cb(response)
      }
      else{
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        if (err_callback) err_callback(error);
      }
    }).catch((e)=>{
      console.log(e);
      if (err_callback) err_callback(e);
    })
}
function getRaw(url, cb, err_callback) {
  return myFetch('GET', url, undefined, cb, undefined, err_callback);
}
function get(url, data, cb, err_callback) {
  url = url + '?' + queryString.stringify(data);
  // console.log(url);
  return getRaw(url, cb, err_callback);
}
function delete1(url, data, cb,err_callback) {
  var method = 'DELETE';
  return myFetch(method, url, JSON.stringify(data), cb,undefined,err_callback);
}
function post(url, data, cb,err_callback) {
  var method = 'POST';
  return myFetch(method, url, JSON.stringify(data), cb,undefined,err_callback);
}
function put(url, data, cb,err_callback) {
  var method = 'PUT';
  return myFetch(method, url, JSON.stringify(data), cb,undefined,err_callback);
}
function postOrPut(url, data, cb,err_callback) {
  var method = 'POST';
  if (data.id) {
    method = 'PUT';
  }
  return myFetch(method, url, JSON.stringify(data), cb,undefined,err_callback);
}
function postForm(url, data, cb,err_callback) {
  var method = 'POST';
  return fetch(host+url, {
    headers: { 'content-type': 'application/x-www-form-urlencoded'
    ,cookie: 'lang=chs'
    ,connection:"keep-alive"
    ,'X-Requested-With': 'XMLHttpRequest'
    ,'Accept-Language': 'zh-CN'
    ,"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.47 Safari/537.36" 
    },
    method: method,
    credentials: 'include',
    body: data,
  }).then((response)=>{
      if (response.status >= 200 && response.status < 300) {
        //   var r = response.json();
        // r.then(cb).catch(err_callback);
        cb(response);
      }
      else{
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        err_callback(error);
      }
  }).catch((e)=>{
      err_callback(e);
  })

}
function contacts(data, cb, err_callback) {
  return get('/rest/Contact/', data, cb, err_callback);
}
function UsePacks(query, cb,err_callback) {
  var data = { contact: query };
  return get('/rest/UsePack/', data, cb,err_callback);
}
function PackItems(query, cb) {
  var data = { pack: query };
  return get('/rest/PackItem/', data, cb);
}
function users( cb) {
  var data = {};
  return get('/rest/view_user/',data,  cb);
}
function items(query, cb) {
  var data = { search: query };
  return get('/rest/Item/', data, cb);
}
// function sql(query, cb) {
//   var data = { query: query };
//   return get('/sql/', data, cb);
// }

function logout(cb) {
  return get('/rest/logout', undefined, cb);
}


function sql(cmd, callback) {
  get('/rest/sql', { cmd: cmd }, callback, null);
}


function login(cb) {
  var username = '马红权';
  var password = 'mhq730208';
  var payload = {
      username: username,
      password: password,
    };
  var data = queryString.stringify(payload);
  postForm('/member.php?mod=logging&action=login&loginsubmit=yes&infloat=yes&lssubmit=yes',data, cb,(err)=>{
      console.log(err);
    });
    
}
function login_index(cb) {
  return get('/', undefined, cb);
}
function wlan(cb) {
  return get('/k_misign-sign.html', undefined, cb);
}
// function logout(cb) {
//   return get('/rest/logout', undefined, cb);
// }
const Client = {
  init: (m, callback) => {
    callback();
  },
  sql,
  getRaw,
  contacts,
  items,
  users,
  login_index,
  login,
  logout,
  UsePacks,
  PackItems,
  get,put,
  post,
  postOrPut,
  delete1,
  postForm,
  wlan
};
export default Client;