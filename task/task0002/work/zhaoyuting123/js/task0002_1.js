var button = $("#toArray");
var button2 = $("#toArray2");
var button3 = $("#toArray3");

/*
 * 第一阶段

 在页面中，有一个单行输入框，一个按钮，输入框中用来输入用户的兴趣爱好，
 允许用户用半角逗号来作为不同爱好的分隔。

 当点击按钮时，把用户输入的兴趣爱好，按照上面所说的分隔符分开后保存到一个数组，
 过滤掉空的、重复的爱好，在按钮下方创建一个段落显示处理后的爱好。

 * */
addEvent(button,"click",function(){
    var inputT = $("#myHobby");
    var node = $("#hobbyArray");
    var arr = trim(inputT.value).split(/[,，]/);
    arr = uniqArray(arr);
    var str = "";
    for(var i in arr){
        str = str + arr[i]+"/";
    }
    node.innerText = "您的爱好是："+str.slice(0,-1);
});
/*
 * 第二阶段

 单行变成多行输入框，一个按钮，输入框中用来输入用户的兴趣爱好，
 允许用户用换行、空格（全角/半角）、逗号（全角/半角）、顿号、分号来作为不同爱好的分隔。

 当点击按钮时的行为同上
 */
addEvent(button2,"click",function(){
    var inputT = $("#myHobby2");
    var node = $("#hobbyArray2");
    var arr = trim(inputT.value).split(/[,，  \n、；;]/);
    arr = uniqArray(arr);
    var str = "";
    for(var i in arr){
        str = str + arr[i]+"/";
    }
    node.innerText = "您的爱好是："+str.slice(0,-1);
});


/*

 第三阶段

 用户输入的爱好数量不能超过10个，也不能什么都不输入。当发生异常时，
 在按钮上方显示一段红色的错误提示文字，并且不继续执行后面的行为；
 当输入正确时，提示文字消失。

 同时，当点击按钮时，不再是输出到一个段落，
 而是每一个爱好输出成为一个checkbox，爱好内容作为checkbox的label。
 **/

var inputT = $("#myHobby3");
var showFlag = false;
addEvent(inputT,"keyup",function(){
    setTimeout(function(){
        //每次进去设定初始值
        inputT.removeAttribute("maxLength");
        showFlag = false;

        var arr = trim(inputT.value).split(/[,，  \n、；;]/);
        arr = uniqArray(arr);
        //没有输入，或者输入的全是空格
        if(arr.length == 1&&arr[0]==""){
            $("#warn").innerText = "人不能木有爱好哦·~~~";

        }
        //超过10个
        else if(arr.length >10){
            $("#warn").innerText = "不同的爱好不能超过10个哦~~~~";
            inputT.maxLength = inputT.value.length;
        }
        //刚好10个不同的爱好
        else if(arr.length ==10){
            inputT.maxLength = inputT.value.length;
            showFlag = true;
        }
        //小于10个
        else{

            $("#warn").innerText = "";
            showFlag = true;
        }
    },1500);
});
addEvent(button3,'click',function(){
    if(showFlag){
        var arr = trim(inputT.value).split(/[,，  \n、；;]/);
        arr = uniqArray(arr);
        var node = $("#hobbyArray3");
        var str = "";
        var label = "<label for='hobbyName1'></label><input type='checkbox' id='hobbyName1'/>";

        for(var i in arr){
            str = str + "<label for='hobbyName"+i+"'>"+arr[i]+"</label><input type='checkbox' id='hobbyName"+i+"'/>"+" ";
        }
        node.innerHTML = str;
    }
});
