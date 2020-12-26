// import myglobal from './myglobal';
const sjcl = require('./sjcl.js');
const jsencr = require('jsencrypt');
import queryString from 'querystring';
let csrftoken;
const fetch = require('node-fetch');
let host = '';
if (window.require) {
  host = 'http://127.0.0.1:8001';
}
function myFetch(method, url, body, cb, headers2, err_callback) {
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


// function login(username, password, cb) {
//   //post form
//   var payload = {
//     username: username,
//     password: password,
//   };
//   return postForm('/rest/login',payload,cb,undefined)
// }
(
  (sjcl.beware &&
    sjcl.beware[
      "CBC mode is dangerous because it doesn't protect message integrity."
    ]) ||
  function () {}
)();
var crypto_page = (function () {
  var base64url_escape = function (b64) {
    var out = '';
    for (var i = 0; i < b64.length; i++) {
      var c = b64.charAt(i);
      if (c == '+') {
        out += '-';
      } else if (c == '/') {
        out += '_';
      } else if (c == '=') {
        out += '.';
      } else {
        out += c;
      }
    }
    return out;
  };

  var encrypt = function (pubkey, plaintext) {
    var aeskey = sjcl.random.randomWords(4, 0);
    var iv = sjcl.random.randomWords(4, 0);
    var pt = sjcl.codec.utf8String.toBits(plaintext);
    var aes = new sjcl.cipher.aes(aeskey);
    var ct = sjcl.mode.cbc.encrypt(aes, pt, iv);
    var rsa = new jsencr.JSEncrypt();
    if (rsa.setPublicKey(pubkey) == false) return fasle;

    var base64url = sjcl.codec.base64url;
    var base64 = sjcl.codec.base64;
    var aesinfo = base64.fromBits(aeskey) + ' ' + base64.fromBits(iv);
    var ck = rsa.encrypt(aesinfo);
    if (ck == false) return false;

    return {
      ct: base64url.fromBits(ct),
      ck: base64url_escape(ck),
    };
  };

  var encrypt_post_data = function (pubkey, plaintext) {
    /*only encodeUrl password, for & is special charactor in web url*/
    var p = encrypt(pubkey, plaintext);
    return 'encrypted=1&ct=' + p.ct + '&ck=' + p.ck;
  };

  return {
    encrypt: encrypt,
    encrypt_post_data: encrypt_post_data,
    base64url_escape: base64url_escape,
  };
})();
var hexVals = new Array(
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F'
);
var unsafeString = '"<>%\\^[]`+$,\'#&';

function isUnsafe(compareChar) {
  if (
    unsafeString.indexOf(compareChar) == -1 &&
    compareChar.charCodeAt(0) > 32 &&
    compareChar.charCodeAt(0) < 123
  )
    return false;
  // found no unsafe chars, return false
  else return true;
}

function decToHex(num, radix) {
  var hexString = '';
  while (num >= radix) {
    temp = num % radix;
    num = Math.floor(num / radix);
    hexString += hexVals[temp];
  }
  hexString += hexVals[num];
  return reversal(hexString);
}

function reversal(s) {
  var len = s.length;
  var trans = '';
  for (i = 0; i < len; i++) trans = trans + s.substring(len - i - 1, len - i);
  s = trans;
  return s;
}

function convert(val) {
  return '%' + decToHex(val.charCodeAt(0), 16);
}
function encodeUrl(val) {
  var len = val.length;
  var i = 0;
  var newStr = '';
  var original = val;

  for (i = 0; i < len; i++) {
    if (val.substring(i, i + 1).charCodeAt(0) < 255) {
      // hack to eliminate the rest of unicode from this
      if (isUnsafe(val.substring(i, i + 1)) == false)
        newStr = newStr + val.substring(i, i + 1);
      else newStr = newStr + convert(val.substring(i, i + 1));
    } else {
      alert(
        'Found a non-ISO-8859-1 character at position: ' +
          (i + 1) +
          ',\nPlease eliminate before continuing.'
      );
      newStr = original;
      i = len;
    }
  }
  return newStr;
}

function login(cb) {
  var username = 'user';
  var password = 'dww3f';
  var postdata0 =
    'newMethodLogin=1&name=' + username + '&pswd=' + encodeUrl(password);
  var isEncode = true;
  console.log('login');
  console.log(postdata0);
  var pubkey =
    '-----BEGIN PUBLIC KEY-----\
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDi7yx8g8nHmX0AWSbld7wpcVeN\
x+oHR02qs57JODN41k+WCgT252m/kRVJueJkDSdf0xLNVmNRFq+cPPLTkTRWMYIl\
qFg80fKQFgwZF6BS4MK4t2otxqd2nmIe8B90Nm7icEDxcRzVpAchyT6RdYGFK5++\
7izTsGqfusx1mnV+jwIDAQAB\
-----END PUBLIC KEY-----\
';
  var info = {
    url: 'login.cgi',

    pubkey: pubkey,

    data: postdata0,
    isEncode: isEncode,
  };
  var postdata = null;
  if (info.isEncode) {
    postdata = crypto_page.encrypt_post_data(info.pubkey, info.data);
  } else {
    postdata = info.data;
  }
  console.log(postdata);
  var url = 'http://192.168.1.1/login.cgi';
  return postForm('/login.cgi',postdata,cb,(err)=>{
    console.log("err=====")
    console.log(err);
  })
}
function login_index(cb) {
  return get('/', undefined, cb);
}
function wlan(cb) {
  return get('/wlan_config.cgi', undefined, cb);
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