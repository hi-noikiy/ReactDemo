/**
 * Created by zhangqiang on 16/10/5.
 */
//将参数模型中数组转换为对象

//格式化参数
var base64 = require('js-base64/base64');
var SHA256 = require("crypto-js/sha256");
var paramFormat=function(reqheader,reqbody) {
    //将参数中的数组转为后台可识别的格式
    if(!reqheader)
    {
        return reqheader;
    }
    else if(typeof reqheader ==="string")
    {
        return reqheader;
    }
    else if(reqheader.constructor=== JSON) {//参数为FormData,直接返回
        return reqheader;

    }
    else if(reqheader instanceof  Array)
    {
        throw new Error("参数必须是字符,空值,对象,FormData,不可以为数组");
        //return null;
    }

    //将参数模型中数组转换为对象,再格式式参数
    var strbody = JSON.stringify(reqbody);
    //var strbodyArray = string2Bin(strbody);
    var b64body = base64.Base64.encode(strbody);
    reqheader.ResultCode='';
    var sid = JSON.stringify(reqheader) + b64body ;
    console.log(sid);
    //var sidArray = string2Bin(sid);
    var result = SHA256(sid).toString();
    console.log(result);
    //var resSHA = Bytes2Str(result);
    //console.log(resSHA);
    reqheader.ResultCode=result;

    var strhdr = JSON.stringify(reqheader);
    //var strhdrArray = string2Bin(strhdr);
    var b64header = base64.Base64.encode(strhdr);
    var jsonObject = {
        FlexReqHeader:b64header,
        FlexReqBody:b64body
    };

    var strfyStr = JSON.stringify(jsonObject);
    //var strfyStrArray = string2Bin(strfyStr);
    var strfy = base64.Base64.encode(strfyStr);
    return strfy;

    //字符串转字节数组
    // function string2Bin(str) {
    //   var result = [];
    //   for (var i = 0; i < str.length; i++) {
    //     result.push(str.charCodeAt(i));
    //   }
    //   return result;
    // }
    //字节数组转二进制进制字符串  
    // function bin2String(array) {
    //   return String.fromCharCode.apply(String, array);
    // }

    //字节数组转十六进制字符串  
    // function Bytes2Str(arr)  

    // {  
    //     var str = "";  
    //     for(var i=0; i<arr.length; i++)  
    //     {  
    //        var tmp = arr[i].toString(16);  
    //        if(tmp.length == 1)  
    //        {  
    //            tmp = "0" + tmp;  
    //        }  
    //        str += tmp;  
    //     }  
    //     return str;  
    // }
    //十六进制字符串转字节数组  
    // function Str2Bytes(str)  
    // {  
    //     var pos = 0;  
    //     var len = str.length;  
    //     if(len %2 != 0)  
    //     {  
    //        return null;   
    //     }  
    //     len /= 2;  
    //     var hexA = new Array();  
    //     for(var i=0; i<len; i++)  
    //     {  
    //        var s = str.substr(pos, 2);  
    //        var v = parseInt(s, 16);  
    //        hexA.push(v);  
    //        pos += 2;  
    //     }  
    //     return hexA;  
    // }

    // function stringToBytes ( str ) 
    // {  
    //   var ch, st, re = [];  
    //   for (var i = 0; i < str.length; i++ ) {  
    //     ch = str.charCodeAt(i);  // get char   
    //     st = [];                 // set up "stack"  
    //     do {  
    //       st.push( ch & 0xFF );  // push byte to stack  
    //       ch = ch >> 8;          // shift value down by 1 byte  
    //     }    
    //     while ( ch );  
    //     // add stack contents to result  
    //     // done because chars have "wrong" endianness  
    //     re = re.concat( st.reverse() );  
    //   }  
    //   // return an array of bytes  
    //   return re;  
    // }  
}
module.exports=paramFormat;