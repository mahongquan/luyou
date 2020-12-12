// import myglobal from './myglobal';
const sjcl = require('./sjcl.js');
const jsencr = require('jsencrypt');
if(window.require){
  var runServer=require('./requestServer').runServer
}
var queryString=require('querystring');
const request1 = require('request');
var request = request1.defaults({jar: true})
let cookies={};
let host = '';
let response_html="";
host = 'http://127.0.0.1:8000';
function myFetch(method, url, body, cb, headers2, err_callback) {
  let data;
  let headers;
  if (headers2) {
    headers = headers2;
  } else {
    headers = { 'Content-Type': 'application/html' };
  }
  console.log("==================================================="+url);
  console.log(headers);
  request(
    { method: method
    , url: host+url
    ,body:body
    }
  , function (error, response,body) {
      if(error){
        if(err_callback){err_callback(error)}
        else{ console.log(error)}
      }
      else{
        my_checkStatus(response,cb,err_callback);
      }
    }
  )
}
function my_checkStatus(response,cb,err_callback) {
 
  console.log(response)
  if(!response){
    let err2={}
    if(err_callback){
      err_callback(err2);
    }
    else{ 
      console.log("no response");
    }
    return ;
  }else{
    cb(response);
  }
}

function getRaw(url, cb, err_callback) {
  return myFetch('GET', url, undefined, cb, undefined, err_callback);
}
function get(url, data, cb, err_callback) {
  url = url + '?' + queryString.stringify(data);
  console.log(url);
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
function postOrPut(url, data, cb,err_callback) {
  var method = 'POST';
  if (data.id) {
    method = 'PUT';
  }
  return myFetch(method, url, JSON.stringify(data), cb,undefined,err_callback);
}
function postForm(url, data, cb,err_callback) {
    let method="POST"
    request(
    { method: method
    , url: host+url
    ,formData:data
    }
  , function (error, response,body) {
      if(error){
        if(err_callback){err_callback(error)}
        else{ console.log(error)}
      }
      else{
        my_checkStatus(response,cb,err_callback);
      }
    }
  )
  return;
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
  return post('/login.cgi',postdata,cb,undefined)
}
function login_index(cb) {
  return get('/', undefined, cb);
}
// function logout(cb) {
//   return get('/rest/logout', undefined, cb);
// }
const Client = {
  getRaw,
  login_index,
  login,
  get,
  post,
  postOrPut,
  delete1,
  postForm,
};
export default Client;
