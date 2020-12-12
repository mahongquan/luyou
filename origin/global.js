function update_node(obj,prefix)
{
    for(prop in obj){
        if($("#"+(prefix?prefix:"")+prop).length){
            $("#"+prop).html(obj[prop])
        }
    }
}

String.prototype.trim=function()
{
    return this.replace(/(^\s*)|(\s*$)/g,"");
}

String.prototype.isdd=function()
{
    return this.match(/^\d+$/);
}
function ValidUrlStr(urlStr)
{
   tstr=urlStr.trim()
   if(/[#\\\'+\," ]/.test(tstr))
   {
      return false;
   }
   if(!(/[A-Za-z0-9]/.test(tstr)))
   {
      return false;
   }
   if(!(/(^[\w-_])|([\w-_]$)/.test(tstr)))
   {
      return false;
   }
   urlhead = tstr.split(':');
   if( urlhead[0] == "http" || urlhead[0] == "https" || urlhead[0] == "ftp" || urlhead[0] == "file" || urlhead[0] == "MMS"   || urlhead[0] == "ed2k"  || urlhead[0] == "Flashget"  || urlhead[0] == "thunder" )
   {
      if(!(/:\/\//.test(tstr)))
      {
         alert("URL is not right!");
          return false;
      }
   }
   return true;

}

function ValidPortNum(portNumStr)
{
    tstr=portNumStr.trim()
    if(tstr=="") return false;
    if(!(/^\d{1,5}$/.test(tstr))) return false;
    var portNum = parseInt(tstr);
    return (portNum<=65536&&portNum>=0)
}
function ValidIpStr(ipStr)
{
    tstr=ipStr.trim()
    if(tstr=="")return false;
    if(!(/^(\d{1,3}\.){3}\d{1,3}$/.test(tstr)))return false;

    nos= tstr.split(".");
    for(var i in nos){
        if(nos[i]<0 || nos[i]>255){
            return false;
        }
    }
    return true;
}
function ValidMaskStr(maskStr)
{
    tstr=maskStr.trim()
    if(tstr=="") return false;
    if(!(/^(\d{1,3}\.){3}\d{1,3}$/.test(tstr)))return false;

    nary= tstr.split(".");
    for(var i in nary){
        if(nary[i]<0 || nary[i]>255){
            return false;
        }
    }
    var _n2bin=function(ipInt){ return (parseInt(ipInt)+256).toString(2).substring(1); }
    var bin_str = _n2bin(nary[0]) + _n2bin(nary[1]) + _n2bin(nary[2]) + _n2bin(nary[3]);
    if(-1 != bin_str.indexOf("01"))return false;
    else return bin_str.indexOf("0")+256;
}
function ValidMacAddress(macStr)
{
    tstr=macStr.trim();
    if(!(/^([0-9A-Fa-f]{1,2}:){5}[0-9A-Fa-f]{1,2}$/.test(tstr))) return false;
    else return true;
}
function ValidAscii(str)
{
    return !/[^\x00-\xff]/g.test(str);
}
function ValidInput(str)
{
    return !/[\"\'<>]/g.test(str);
}
function ip2int(ipstr){
    var aip=ipstr.split("."); 
    for(var i in aip) {
        if(parseInt(aip[i])<16) {
            aip[i]="0"+parseInt(aip[i]).toString(16);
        } else {
            aip[i]=parseInt(aip[i]).toString(16);
        }
    }
    var nip=parseInt("0x"+aip[0]+aip[1]+aip[2]+aip[3])
    return nip;
}
function checkipv6(str)
{
    if(!str.trim())return false;
    var t=str.split("/");
    ipstr=t[0];
    if (! /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(ipstr) )
        return false;
    pl=t[1];
    if(pl){
        if(pl.isdd() && parseInt(pl)>=0 && parseInt(pl)<=128){
            return true;
        }
        return false;
    }
    return true;
}
function isNet2(lanIp){
    var aip=lanIp.split("."); 
    if(parseInt(aip[2])==2){
        return false;
    }
    return true;
}

var urlParams = {};
(function () {
    var e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&=]+)=?([^&]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
        q = window.location.search.substring(1);

    while (e = r.exec(q))
       urlParams[d(e[1])] = d(e[2]);
})();

/* @projectDescription jQuery Serialize Anything - Serialize anything (and not just forms!)
* @author Bramus! (Bram Van Damme)
* @version 1.0
* @website: http://www.bram.us/
* @license : BSD
*/

(function($) {

    $.fn.serializeAnything = function() {

        var toReturn    = [];
        var els         = $(this).find(':input').get();

        $.each(els, function() {
            if (this.name && !this.disabled && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i.test(this.type))) {
                var val = $(this).val();
                toReturn.push( encodeURIComponent(this.name) + "=" + encodeURIComponent( val ) );
            }
        });   

        return toReturn.join("&").replace(/%20/g, "+");
    }

})(jQuery);

$(document).ajaxComplete(function(e,xhr,opt){
    if(xhr.getResponseHeader("relogin")){
        top.location.href='/';
    }
})
function xalert(xhr,s){
    if(xhr.getResponseHeader("relogin")){
        top.location.href='/';
    }else{
        alert(s);
    }
}

var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
     -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
     -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
     -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
     52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
     -1,   0,   1,   2,   3,   4,   5,   6,   7,   8,   9, 10, 11, 12, 13, 14,
     15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
     -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
     41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64encode(str) {
     var out, i, len;
     var c1, c2, c3;

     len = str.length;
     i = 0;
     out = "";
     while(i < len) {
         c1 = str.charCodeAt(i++) & 0xff;
         if(i == len)
         {
             out += base64EncodeChars.charAt(c1 >> 2);
             out += base64EncodeChars.charAt((c1 & 0x3) << 4);
             out += "==";
             break;
         }
         c2 = str.charCodeAt(i++);
         if(i == len)
         {
             out += base64EncodeChars.charAt(c1 >> 2);
             out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
             out += base64EncodeChars.charAt((c2 & 0xF) << 2);
             out += "=";
             break;
         }
         c3 = str.charCodeAt(i++);
         out += base64EncodeChars.charAt(c1 >> 2);
         out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
         out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
         out += base64EncodeChars.charAt(c3 & 0x3F);
     }
     return out;
}

function base64decode(str) {
     var c1, c2, c3, c4;
     var i, len, out;

     len = str.length;
     i = 0;
     out = "";
     while(i < len) {
         /* c1 */
         do {
             c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
         } while(i < len && c1 == -1);
         if(c1 == -1)
             break;

         /* c2 */
         do {
             c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
         } while(i < len && c2 == -1);
         if(c2 == -1)
             break;

         out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

         /* c3 */
         do {
             c3 = str.charCodeAt(i++) & 0xff;
             if(c3 == 61)
                 return out;
             c3 = base64DecodeChars[c3];
         } while(i < len && c3 == -1);
         if(c3 == -1)
             break;

         out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

         /* c4 */
         do {
             c4 = str.charCodeAt(i++) & 0xff;
             if(c4 == 61)
                 return out;
             c4 = base64DecodeChars[c4];
         } while(i < len && c4 == -1);
         if(c4 == -1)
             break;
         out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
     }
     return out;
}

function checkNumber(theObj) {
  var reg = /^[0-9]*[1-9][0-9]*$/;
  if (reg.test(theObj)) {
    return true;
  }
  return false;
}

