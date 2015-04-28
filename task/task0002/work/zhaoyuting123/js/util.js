/**
 * Created by feixue on 2015/4/20.
 */


/**
 * 判断arr是否为一个数组，返回一个bool值
 * @param {String|Object} arr
 * @returns {boolean} Returns true when arr is an Array
 */
function isArray(arr) {
    // 数组是一个类对象。
    if (!Array.isArray) {
        Array.isArray = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }
    return Array.isArray(arr);

}

/**
 * 判断fn是否为一个函数，返回一个bool值
 * @param {function|Object|node|String|Array|RegExp} fn
 * @returns {boolean} Returns true when fn is a function
 */
function isFunction(fn) {
    // your implement
    return !!fn && !fn.nodeName && fn.constructor != String &&
        fn.constructor != RegExp && fn.constructor != Array &&
        /function/i.test(fn + "");

}

/**
 * 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
 * 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
 * @param {Object} src
 * @returns {Object} Returns a cloned Object of src
 */
function cloneObject(src) {
    if (src == null || src == undefined || typeof (src) != "object") {
        return src;
    } else {
        var srcCon = src.constructor;
        var obj = null; //目标对象
        switch (srcCon) {
            case Number:
                obj = new Number(src.valueOf());
                break;
            case String:
                obj = new String(src.valueOf());
                break;
            case Boolean:
                obj = new Boolean(src.valueOf());
                break;
            case Date:
                obj = new Date(src);
                break;
            case Array:
                obj = [];
                /*
                 for(var i= 0,length=src.length;i<length;i++){//防止数组由于对象的属性添加了某个属性值。考虑到是克隆，即使是对象属性，也是要加进去的
                 }
                 */
                for (var key in src) {
                    if (typeof src[key] == "object") { //对象的属性为对象
                        obj[key] = cloneObject(src[key]); //复制对象给obj
                    } else {
                        obj[key] = src[key];
                    }
                }
                break;
            default:
                //默认为"object"
                obj = {};
                obj.constructor = src.constructor;
                obj.__proto__ = Object.getPrototypeOf(src);
                //针对对象方式的添加
                for (var key in src) {
                    if (typeof src[key] == "object") { //对象的属性为对象
                        obj[key] = cloneObject(src[key]); //复制对象给obj
                    } else {
                        obj[key] = src[key];
                    }
                }
                break;
        }
        return obj;
    }
}

// Test
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a); // 1
console.log(tarObj.b.b1[0]); // "hello"

function Person() {};
var p1 = new Person();
p1.name = "ladygaga";
var p2 = cloneObject(p1);
console.log("p1.name:" + p1.name + "; p2 name:" + p2.name);
p2.name = "ladygaga2";
console.log("p1.name:" + p1.name + "; p2 name:" + p2.name);
console.log("p1 prototype == p2 prototype:" + (Object.getPrototypeOf(p1) == Object.getPrototypeOf(p2)));
console.log("p1.constructor:" + p1.constructor + ";p2.constructor:" + p2.constructor);
console.log(cloneObject(null));

/*function uniqArray(arr) {

 if(arr.length == 0 || arr == null || arr == undefined){
 return arr;
 }
 //目标数组
 var arrTar = [];
 arrTar[0] = arr[0];
 for(var i= 1,length=arr.length;i<length;i++){
 var temp = arr[i];//待判断是否有重复的元素
 for(var j= 0,lengthTar = arrTar.length;j<lengthTar;j++){
 if(temp == arrTar[j]){
 break;//找到了重复值，跳出这个for循环。
 }else if(j==lengthTar-1){//最后一个元素，且不等于temp
 arrTar.push(temp);
 }else{
 continue;
 }
 }
 }
 return arrTar;
 }*/

/**
 * 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
 * @param {Array} arr
 * @returns {Array} Returns a arr without repeated value
 */
function uniqArray(arr) {

    if (arr.length == 0 || arr == null || arr == undefined) {
        return arr;
    }
    //目标数组
    var arrTar = [];
    arrTar[0] = arr[0];
    for (var i = 1, length = arr.length; i < length; i++) {
        if (arrTar.indexOf(arr[i]) == -1&&arr[i]!=null&&arr[i]!=undefined&&arr[i]!="") {
            arrTar.push(arr[i]);
        }
    }
    return arrTar;
}


// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]
var c = [1, 2, "a", "b", "a", 12, 1, 2];
var d = uniqArray(c);
console.log(d);



/**
 * 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
 * @param {Array} arr
 * @returns {Array} Returns a arr without repeated value
 */
function trim(str) {

    /*空格包含的内容：空格、制表符、换页符、回车符和换行符
     \b,\t,\n,\v,\f,\r,\u0020,\u00A0,\u2028,\u2029,\uFEFF
     */
    if(typeof str !="string"){
       return str;
    }

    var start = 0;
    var end = -1;
    var charFirst = str[start];
    var charEnd = str[str.length - 1];
    //start一直移动到第一个不是空格的位置
    while (start < str.length && (charFirst.indexOf("\b") != -1 ||
            charFirst.indexOf("\t") != -1 ||
            charFirst.indexOf("\n") != -1 ||
            charFirst.indexOf("\v") != -1 ||
            charFirst.indexOf("\f") != -1 ||
            charFirst.indexOf("\r") != -1 ||
            charFirst.indexOf("\u0020") != - 1 ||
            charFirst.indexOf("\u00A0") != -1 ||
            charFirst.indexOf("\u2028") != -1 ||
            charFirst.indexOf("\u2029") != -1 ||
            charFirst.indexOf("\uFFFF") != -1)) {
                start++;
                charFirst = str[start];
    }
    //start移动到了字符串最后的位置，代表没有元素
    if (start == str.length) {
        return "";
    }

    //只有一个元素
    else if (start == str.length - 1) {
        return str.slice(start);
    }

    //此时代表最后一位有数值
    else {

        while (end > -str.length && (charEnd.indexOf("\b") != -1 ||
                charEnd.indexOf("\t") != -1 || charEnd.indexOf("\n") != -1 ||
                charEnd.indexOf("\v") != -1 || charEnd.indexOf("\f") != -1 ||
                charEnd.indexOf("\r") != -1 || charEnd.indexOf( "\u0020") != -1 ||
                charEnd.indexOf("\u00A0") != -1 ||
                charEnd.indexOf("\u2028") != -1 ||
                charEnd.indexOf("\u2029") != -1 ||
                charEnd.indexOf("\uFFFF") != -1)) {
                end--;
                charEnd = str[str.length + end];
        }

        if (end == -1) {
            return str.slice(start);
        } else {
            return str.slice(start, end + 1);
        }

    }
}


// 使用示例
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'


/**
 * 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参赛传递
 * @param {Array} arr
 * @param {Function} fn
 */
function each(arr, fn) {
    if(isArray(arr)&&isFunction(fn)){
        var length = arr.length;
        var value; //存储函数返回值
        for (var i = 0; i < length; i++) {
            value = fn.call(this, arr[i], i);
            if (value === false) {
                break;
            }
        }
    }
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
var arr = ['java', 'c', 'php', 'html'];

function output(item) {
    console.log(item)
}
each(arr, output); // java, c, php, html

// 使用示例
var arr2 = ['java', 'c', 'php', 'html'];

function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr2, output); // 0:java, 1:c, 2:php, 3:html

/**
 * 获取一个对象里面第一层元素的数量，返回一个整数
 * @param {Object} obj
 * @return {number} return a number of object first level variables
 */
function getObjectLength(obj) {
    if (obj instanceof Object && !(isArray(obj))) {
        var num = 0;
        for (var i in obj) {
            if(obj.hasOwnProperty(i)){
                num++;
            }
        }
        return num;
    } else {
        return 0;
    }
}

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3


/**
 * 获取一个对象里面第一层元素的数量，返回一个整数
 * @param {Stirng} emailStr
 * @return {boolean} return true if emailStr is email address
 */
function isEmail(emailStr) {

    var r = /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
    return r.test(emailStr);

}


/**
 * 判断是否为手机号
 * @param {Stirng} phone
 * @return {boolean} return true if phone is phone number
 */
function isMobilePhone(phone) {
    // your implement
    return /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/.test(phones); //来源于司徒正美
}

/**
 * 为dom增加一个样式名为newClassName的新样式
 * @param {Node} element
 * @param {Stirng} newClassName
 */
function addClass(element, newClassName) {
    if(element.nodeType&&typeof oldClassName == "string"){
        var oldClass = element.getAttribute("class");
        var oldClassArr = oldClass.split(" ");
        //如果没有，则添加。否则不做任何事情
        if(oldClassArr.indexOf(newClassName)==-1){
            var newClass = oldClass +" "+ newClassName;
            element.setAttribute("class",newClass);
        }
    }
}


/**
 * 为dom增加一个样式名为newClassName的新样式
 * @param {Node} element
 * @param {Stirng} newClassName
 */
function removeClass(element, oldClassName) {
    if(element.nodeType&&typeof oldClassName == "string"){
        var oldClass = element.getAttribute("class");
        //将class根据空格分隔，形成数组
        var oldClassArr = oldClass.split(" ");
        if(oldClassArr.indexOf(oldClassName)!=-1){
            oldClassArr.splice(oldClassArr.indexOf(oldClassName),1);
        }
        //去掉需要移除的class后将其组合成字符串，以空格为间隔
        var newClass = oldClassArr.join(" ");
        element.setAttribute("class", newClass);
    }
}



/**
 * 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
 * @param {Node} element
 * @param {Stirng} newClassName
 */
function isSiblingNode(element, siblingNode) {
    if (element.nodeType === 1 && siblingNode.nodeType === 1) {
        return element.parentNode === siblingNode.parentNode;
    } else {
        return false;
    }
}


/**
 * 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
 * @param {Node} element
 * @return {Object} return the position information of element
 */
function getPosition(element) {
    //TODO
    var position = {
        x: 0,
        y: 0
    };

    position.x = element.offsetLeft;
    position.y = element.offsetHeight;
    return position;
}

/**
 * 将selector字符串分成二维数组。一维根据","来分隔，二维根据" "来区分
 * 例如"#id,class1 class2 input"----->>>>  [#id,[class1,class2,input]]
 * @param {string} selector
 * @return {Array} return a  2Dimension array
 */
var splitSelector = function (selector) {
    var splitReg1 = /,/;
    var splitReg2 = / /;
    var s1 = trim(selector); //去除首末尾的空格字符
    var match = s1.split(splitReg1); //根据逗号进行分隔
    for (var i = 0, length = match.length; i < length; i++) {
        //逗号分离后的字符串可能存在级联关系 例如：.class #id
        var temp = match[i];
        match[i] = temp.split(splitReg2); //分解为2维数组
    }
    return match;
};

/**
 * 检测selector的名字是否符合规范
 * @param {string} name
 * @return {boolean} return true if name if valid
 */ var checkName = function (name) {
    var regValid = /(#|\.)?-?_*[\w*\d*-*_*]*/;
    var regAttribute = /\s*\[\w*\]\s*/;
    var regInvalid = /((#|\.)\d[\w*\d*-*_*]*)|((#|\.)--[\w*\d*-*_*]*)|(.-{2})|((#|\.)-\d[\w*\d*-*_*]*)/; //以数字开头
    return (regAttribute.test(name) || (regValid.test(name) && !regInvalid.test(name)));
};

/**
 * 根据key查找dom节点，返回一个满足条件的数组
 * key 可以是id号，class，tag 以及属性
 * @param {string} key
 * @param {Dom} content
 * @return {Array} return an array contains nodes which has selector
 * */
 var findNode = function (key, content) {
    /*根据给定的dom元素查找
     * 名字元素名称，class，和id选择器:
     * 只能够包含字符[a-zA-Z0-9]，加上-和下划线_，
     * 他们不能以数字开头，
     * 不能以两个-开头，或者一个-加上一个数字开头。
     **/
    var result = [];

    var nodeFlag = checkName(key);
    if (!nodeFlag) {
        return [];
    }
    if (content == null || content == undefined) {
        //进来的是id
        if (key.indexOf("#") == 0) {
            if(document.getElementById(key.slice(1))!=null){
                result.push( document.getElementById(key.slice(1)));
            }
            return result;
        }

        //进来的是class
        else if (key.indexOf(".") == 0) {
            if(document.getElementsByClassName(key.slice(1))!=null)
            {
                return document.getElementsByClassName(key.slice(1));
            }else {
                return result;
            }
        }

        //进来的是属性
        else if (key.indexOf("[") == 0) {
            var attributeOnlyFlag = (key.indexOf("=")==-1);
            //“[ type  =  'input']”
            if(attributeOnlyFlag){//只有属性没有值
                var attributeName = trim(key.slice(1,-1));
            }else{
                attributeName = trim(key.slice(1, key.indexOf("=")));
                if(key.indexOf("\'")!=-1||key.indexOf("\"")!=-1){
                    var attributeValue = trim(key.slice(key.indexOf("=") + 1, -1)).slice(1, -1); //最后去除‘input’的单引号
                }else{
                    attributeValue = trim(key.slice(key.indexOf("=") + 1, -1)); //最后去除‘input’的单引号
                }

            }
            var allNodes = document.all;
            var tempNode;
            for (var i = 0, length = allNodes.length; i < length; i++) {
                tempNode = allNodes[i];
                if(attributeOnlyFlag){//只有属性名称
                    if(tempNode.getAttribute(attributeName)!=undefined){
                        result.push(tempNode);
                    }
                }else{//属性名称+属性值
                    if (tempNode.getAttribute(attributeName) == attributeValue) {
                        result.push(tempNode);
                    }
                }

            }
            return result;
        }

        //进来的是tag
        else {
            return document.getElementsByTagName(key);
        }

    }
    /*else{
     var childNodes = [];
     var node= [];
     */
    /*取回content中每个节点的子节点*/
    /*
     for(var j=0;j<content.length;j++){
     childNodes[j] = content[j].childNodes;
     node[j] = [];
     for(var k=0;k<childNodes[j].length;k++){
     if(childNodes[j][k].nodeType == 1){//节点类型为1
     var tempName = childNodes[j][k].localName||childNodes[j][k].NodeName;
     if(tempName.indexOf(key)!=-1){
     node[j].push(childNodes[j][k]);
     }
     }
     }
     }
     return node;
     }*/
};

/**
 * 实现一个简单的Query
 * selector 可以是id号，class，tag 以及属性或者是组合字符串
 * @param {string} selector
 * @return {Array} return an array contains nodes which has selector
 * */
function $(selector) {
    var result = [];

    if (selector == null || selector == undefined || typeof selector != "string") {
        return null;
    }

    if (selector.length == 0) {
        return document.all;
    }

    //".test2,.test3 em"--> [[".test2"],[".test3","em"]]
    var selectorArr = splitSelector(selector); //返回二维数组

    for (var i = 0; i < selectorArr.length; i++) {
        if (selectorArr[i].length == 1) {
            var node = findNode(selectorArr[i][0]);
            for (var key = 0; key < node.length; key++) {
                result.push(node[key])
            }
        } else { //".text em"
            /*第一种思想：找到.text所有子元素，然后在子元素中找em*/
            /*var tempDom = [];
             tempDom[0] = findNode(selectorArr[i][0]);
             for(var d = 1;d<selectorArr[i].length;d++){
             tempDom[d] = findNode(selectorArr[i][d],tempDom[d-1]);
             }
             for(key=0;key<tempDom[d-1].length;key++){
             for(var t=0;t<tempDom[d-1][key].length;t++){
             result.push(tempDom[d-1][key][t]);
             }

             }
             result.push(tempDom[d-1]);*/

            /*第二种思想：
             .test .test2 em
             先查找em，然后查找其父亲为.text的*/

            var selectorTemp = selectorArr[i];
            var length = selectorTemp.length;
            var nodeLast = findNode(selectorTemp[length - 1]); //根据多级选择器的最后一个查找
            var j = length - 2; //指向上一级的条件，例如$test em ,则j指向$test
            var len = nodeLast.length;

            for (var nodeKey = 0; nodeKey < len; nodeKey++) {

                var tempNode = nodeLast[nodeKey];
                var parent = tempNode.parentNode;

                while (j >= 0 && findSelectorInNode(selectorTemp[j], parent)) {
                    //对每一个节点进行父亲的父亲的判断
                    if (j == 0) { //走到最后一个条件
                        result.push(tempNode);
                    }
                    j--;
                    parent = parent.parentNode;
                }
                j = length - 2;
            }
        }
    }
    result = uniqArray(result);
    //需要对id的进行一个处理
    if(result.length == 1 &&selectorArr.length == 1&&selectorArr[0].length == 1&& selectorArr[0].toString().indexOf("#")==0){
        //代表取id
        return result[0];
    }
    return result;
}

/*
 function nodeInArray(node ,arr){
 for(var i in arr){
 if(arr[i] == node){
 return true;
 }
 }
 return false;
 }
 */



/**
 * 判断node是否包含selector，selector可以是id，tag，属性，class
 * selector 可以是id号，class，tag 以及属性或者是组合字符串
 * @param {string} selector
 * @param {node} node
 * @return {boolean} return true if node has selector
 * */
function findSelectorInNode(selector, node) {
    selector = trim(selector);

    //class相同
    if (selector.indexOf(".") == 0) {
        var classNames = node.className.split(" ");

        if (classNames.indexOf(selector.slice(1)) != -1) {
            //存在这个class
            return true;
        }
    }
    //id相同
    else if (selector.indexOf("#") == 0) {
        if (node.id == selector.slice(1)) {
            return true;
        }
    }
    //属性值相同
    else if (selector.indexOf("[") == 0) {

        var selector1 = trimStringBody(selector);
        var attributeName = selector1.slice(1, selector1.indexOf("="));

        //只有属性名，没有属性值
        if(selector1.indexOf("=")==-1){
            return (node.attributes[attributeName]!=undefined);
        }
        //有属性，且属性有值
        else{
            var attributeValue = selector1.slice(selector1.indexOf("=") + 2, -2);
            if (attributeValue == node.attributes[attributeName]) {
                return true;
            }
        }
    }
    //tag相同
    else {
        if (node.nodeName.toLowerCase() == selector.toLowerCase()) {
            return true;
        }
    }
    return false;
}


/**
 * 去除字符串内的空格
 * @param {string} s
 * @return {string} return s without whitespace
 * */
function trimStringBody(s) {
    s = trim(s);
    var stemp = s.split(" ");
    var result = "";
    for (var i = 0, len = stemp.length; i < len; i++) {
        result = result + stemp[i];
    }
    return result;
}


/*
// 可以通过id获取DOM对象，通过#标示，例如
 $("#adom"); // 返回id为adom的DOM对象

 // 可以通过tagName获取DOM对象，例如
 $("a"); // 返回第一个<a>对象

 // 可以通过样式名称获取DOM对象，例如
 $(".classa"); // 返回第一个样式定义包含classa的对象

 // 可以通过attribute匹配获取DOM对象，例如
 $("[data-log]"); // 返回第一个包含属性data-log的对象

 $("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

 // 可以通过简单的组合提高查询便利性，例如
 $("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象
*/



// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    var addEvent1 = function(element, event, listener){
        if (element.addEventListener) {
            element.addEventListener(event, listener);
        } else if (element.attachEvent) {
            element.attachEvent("on" + event, event);
        } else {
            element["on" + event] = listener;
        }
    };
    if(element.nodeType){
        addEvent1(element, event, listener)
    }else{
        for(var i= 0,len=element.length;i<len;i++){
            addEvent1(element[i], event, listener)
        }
    }

}

/*
// 例如：
function clicklistener(event) {

}
addEvent($("#doma"), "click", a);
*/

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    // your implement
    var removeEvent1 = function(element, event, listener){
        if (element.detachEvent) {
            element.detachEvent("on" + event, listener);
        } else if (element.removeEventListener) {
            element.removeEventListener(event, listener);
        }else{
            element["on"+event] = "";//此处有兼容问题，后续进行修改
        }
    };
    if(element.nodeType){
        removeEvent1(element, event, listener)
    }else{
        for(var i= 0,len=element.length;i<len;i++){
            removeEvent1(element[i], event, listener)
        }
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {

    addEvent(element,'click',listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element,'enter',listener);
}

$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;

/*代理部分未做，后续添加，木有时间鸟。。。对不住，亲爱的导师~~辛苦导师*/


// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    // your implement
    var userAgent = navigator.userAgent.toLowerCase();
    if(userAgent.match(/msie ([\d.]+)/)!=null){
      return   navigator.appVersion.slice(/(msie|MSIE)\s*\w*\d*;/)[0];
    }else {
        return -1;
    }
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var d = new Date();
    d.setTime(d.getTime() + (expiredays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + "; " + expires;
}

// 获取cookie值
function getCookie(cookieName) {
    var name = cookieName + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}


//为ajax写
function getXmlHttpObject(){
    var xmlHttpRequest;
    //不同浏览器获取对象xmlHttpRequest对象方法不同
    if(window.ActiveXObject)
    {
        //是ie内核
        xmlHttpRequest=new ActiveXObject("Microsoft.XMLHTTP");
    }
    else{
        xmlHttpRequest=new XMLHttpRequest();
    }
    return xmlHttpRequest;
}



function ajax(url, options) {
    var myXmlHttpRequest="";
    myXmlHttpRequest=getXmlHttpObject();
    if(myXmlHttpRequest)
    {
        var data = options.data;
        var stringToSend="name="+data.name+"&&pass="+data.password;
        var type = data.type;

        if(type == "get"){
            //****************使用get方式提交*****************************
            //使用true代表使用异步机制,打开请求
            myXmlHttpRequest.open("get",url,true);
            //指定回调函数
            myXmlHttpRequest.onreadystatechange=data.onsuccess;
            //真的发送请求，如果是get，则send null,如果是post，则填入实际的数据
            myXmlHttpRequest.send(null);
        }else if(type == "post"){
            //****************使用post方式提交*****************************
            //打开请求,使用true代表使用异步机制
            myXmlHttpRequest.open("post",url,true);
            myXmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            //指定回调函数
            myXmlHttpRequest.onreadystatechange = data.onsuccess;
            //真的发送请求，如果是get，则send null,如果是post，则填入实际的数据
            myXmlHttpRequest.send(stringToSend);
        }else{
            return null;
        }

    }else{
        return null;
    }
}

// 使用示例：
ajax(
    'http://localhost:8080/server/ajaxtest',
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        }
    }
);
