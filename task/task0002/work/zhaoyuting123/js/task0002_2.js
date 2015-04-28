$.click($("#calculate"),function(){
    //时间符合标准
    if(/\d\d\d\d-\d\d-\d\d/.test($("#myTime").value)){
        var now = new Date();
        var myTime = new Date($("#myTime").value+" 00:00:00");
        var s = diff(myTime,now);
        $("#clock").innerText = s;
        var intervalId = setInterval(function(){
            now = new Date();
            var myTime = new Date($("#myTime").value+" 00:00:00");
            var s=diff(myTime,now);
            if(s == null){
                clearInterval(intervalId);
                $("#clock").innerText = "倒计时完成";
            }else{
                $("#clock").innerText = s;
            }
        },1000);
    }else{
        alert("请输入符合标准的值");
    }

});

//返回绝对值
function diff(myDate,now){

    var diffMs = Math.abs(myDate-now);
    if(diffMs<1000){
        return null;
    }
    console.log("时间差为："+diffMs);
    //1分钟=60*1000ms
    var hourDiff = parseInt(diffMs/(60*60*1000));
    var minuteDiff = parseInt((diffMs - hourDiff*(60*60*1000))/(60*1000));
    var secondDiff = parseInt((diffMs - hourDiff*(60*60*1000)-minuteDiff*(60*1000))/1000);
    hourDiff = checkTimeName(hourDiff);
    minuteDiff = checkTimeName(minuteDiff);
    secondDiff = checkTimeName(secondDiff);
    if(myDate-now<0){
        return "-"+hourDiff+":"+minuteDiff+":"+secondDiff;
    }else if(myDate-now>0){
        return hourDiff+":"+minuteDiff+":"+secondDiff;

    }else{
        //两者相等
        return null;
    }

}

function checkTimeName(name){
    if(name<10&&name>0){
        return "0"+name;
    }else{
        return name;
    }
}