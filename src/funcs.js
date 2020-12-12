const axios = require('axios');
const sjcl = require('./sjcl.js');
const jsencr = require('jsencrypt');
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

var form_page = (function () {
  var submit = function (info) {
    var postdata = null;
    if (info.isEncode) {
      postdata = crypto_page.encrypt_post_data(info.pubkey, info.data);
    } else {
      postdata = info.data;
    }

    $.ajax({
      url: info.url,
      type: 'POST',
      data: postdata,
      success: function (data, textstatus, jqXHR) {
        if (jqXHR.status == 299) {
          window.top.location = '/';
        } else {
          var doc = document.open('text/html', 'replace');
          doc.write(data);
          doc.close();
        }
      },
    });
  };
  return {
    submit: submit,
  };
})();
function login() {
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
  // axios.post('http://192.168.1.1/login.cgi', {
  //     firstName: 'Fred',
  //     lastName: 'Flintstone'
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: postdata,
    url,
  };
  axios(options)
    .then(function (response) {
      // handle success
      console.log(response);
      if (response.status === 299) {
        getmain();
      } else {
        console.log(response.data);
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}
function getmain() {
  axios
    .get('http://192.168.1.1/macfilter.cgi') ///wlan_config.cgi')
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}
window.login = login;
window.getmain = getmain;
window.axios = axios;
// Make a request for a user with a given ID
function enable_filter() {
  var post_data;
  post_data = 'mac_filter_enable=true';
  post_data += '&mac_exclude_mod=BLOCKED';
  post_data += '&csrf_token=lbGqYtyjLMFuouxp';
  axios.post('http://192.168.1.1/macfilter.cgi?save', post_data);
}
window.enable_filter = enable_filter;
function firstLink(){
  axios
    .get('http://192.168.1.1')
    .then(function (response) {
      console.log(response);
      if (response.status === 200) {
        login();
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}
window.firstLink=firstLink;
firstLink();
