////定义：函数updateTimeStamp: 
///功能：用于更新时间戳。具体更新的变量有：
// 此刻的时间——themi:20160819153600
// 此刻的日期——thed:20160819
// 此刻的秒数——thisdayunix:1474271020 (当前时间的秒数的整数值————by 四舍五入处理 当前时间的毫秒数/1000）
// 到期时刻的秒数——expiredayunix:1474271020+7776000(到期时间=当前时间+3个月的时间) 3600\*24\*90=7776000
/// 依赖关系说明：单一功能小函数
//全局变量——thisday、themi、 thed、 thisdayunix、 actionTimeStamp
function updateTimeStamp() {
    thisday = new Date();

    themi = thisday.getHours() * 10000 + thisday.getMinutes() * 100;//eg:153600即15：36
		
    thed = thisday.getFullYear() * 10000 + thisday.getMonth() * 100 + thisday.getDate();//eg:20160819
    
	themi=thed*1000000+themi;//eg:20160819153600

    thisdayunix = Math.round(thisday.getTime() / 1000);//eg:Math.round(474271019744/1000)=1474271020

    expiredayunix = thisdayunix + 7776000;//3个月以后的时间

    actionTimeStamp=Math.round(thisday.getTime() / 1000);
}
/// 知识说明
//关于时间方法：
// getTime()返回表示日期的毫秒数
// getHours()返回日期中的小时数：0~23
// getMinutes()返回日期中的分钟数：0~59
// getFullYear()返回四位数年份
// getMonth()返回日期中的月份:0~11
// getDate()返回日期月份中的天数：1~31
// Math.round()四舍五入为整数


/*********************运行环境监测系列**********************/
////定义：函数getpvalue(theurl, thep)：
///功能：获取指定url（theurl）中的指定参数名(thep)的参数值。
///参数:
// theurl:一个url字符串
// thep:url中后面接的一个参数的名称
///返回：该url中参数名的参数值
///依赖关系：单一功能小函数
//- 依赖参数：theurl ,thep
function getpvalue(theurl, thep) {
    var k,thev;
    if (theurl.toLowerCase().indexOf(thep + "=")>1) {
        k = theurl.toLowerCase().indexOf(thep) + thep.length + 1;//被查询参数的参数值的起始位置
        thev = theurl.toLowerCase().substring(k,theurl.length);//截取参数值起始位置到最后的字符串，也可以直接 .substring(k)
        thev = thev.replace(/\&.*/g,"");//将该参数值后面&及其后的部分全部去掉，即得到该参数值
    } else {
        thev = "";
    }
    return thev;
}






////定义：函数historyAPI()
///功能：检测运行环境是否有window.history这个API
///参数: 无
///返回：true/false
///依赖关系：单一功能小函数
// 依赖全局变量：osVersion
function historyAPI() {
    var ua = navigator.userAgent || navigator.vendor || "";

     // 如果ua中含有Android 2或osVersion为Android2,则返回false
    if (/Android 2/i.test(ua) || osVersion == "Android2") {
        return false;
    }

    // 如果浏览器存在window.history.pushState，则返回true
    if (window.history.pushState) {//修改：原文为window.history&&window.history.pushState
        return true;
    }
}
///知识说明：
//（1）navigator对象：识别客户端浏览器的事实标准，详见《JS高级》P210
//	- navigator.vendor:浏览器品牌
//	- navigator.userAgent:浏览器的用户代理字符串
//（2）history对象新添方法pushState()/replaceState()
//HTML5引入了history.pushState()和history.replaceState()这两个方法，他们允许添加和修改history实体。这些方法会和window.onpostate事件一起工作。
//pushState 用于向 history 添加当前页面的记录，而 replaceState 和 pushState 的用法完全一样，唯一的区别就是它用于修改当前页面在 history 中的记录。
//详见<http://www.cnblogs.com/xcsn/p/4517581.html><https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_pushState()_method>



////定义：函数isOnline
///功能：判断是否处于离线状态，如果返回结果为"no",则为离线状态；返回结果为"possible",则为在线状态。
///参数: 无
///返回：possible/no
///依赖关系：单一功能小函数
// 依赖全局变量：osVersion
function isOnline() {//iOS和BB10可以准确判断离线状态，某些Android设备会返回完全错误的信息
    if ((osVersion.indexOf("ios")>=0 || osVersion == "bb10") && navigator && navigator.onLine==false) {
        return "no";
    }
    return "possible";
}
///知识补充
//- BB10是 黑莓系统
//- navigator.onLine:表示浏览器是否连网，连网为true,否则为false
///疑问：为何不返回true/false，而要返回possible/no呢？有什么深意吗？


function checkDevice(){
    ///根据全局变量uaString的值给全局变量osVersion赋值：
    if(/OS[0-9]+\_/i.test(uaString) && (/iPhone/i.test(uaString) ||/iPad/i.test(uaString) || /iPod/i.test(uaString))){
        osVersion = "ios" + uaString.replace(/^.*OS([0-9]+).*$/ig,"$1");//可学习：这种写正则的方法，这种捕获组的用法
    }else if (/BB10/i.test(uaString) && /mobile/i.test(uaString)){
        osVersion = "bb10";
    } else if (/Android 2/i.test(uaString) || /Android\/2/i.test(uaString)){
        osVersion = "Android2";
    } else if (/Android 1/i.test(uaString) || /Android\/1/i.test(uaString)){
        osVersion="Android1";
    } else if (/Android 4/i.test(uaString) || /Android\/4/i.test(uaString)) {
        osVersion = "Android4";
    } else if (/Android 5/i.test(uaString) || /Android\/5/i.test(uaString)) {
        osVersion = "Android5";
    } else if (/Android 6/i.test(uaString) || /Android\/6/i.test(uaString)) {
        osVersion = "Android6";
    } else if (/Android 7/i.test(uaString) || /Android\/7/i.test(uaString)) {
        osVersion = "Android7";
    } else if (/Android/i.test(uaString)) {
        osVersion = "Android";
    } else if(/MSIE [0-9]+/i.test(uaString)){//MSIE是IE浏览器
        osVersion = "MSIE" +uaString.replace(/^.*MSIE([0-9]+).*$/ig,"$1")
    } else{
        osVersion = "other";
    }

    ///如果osVersion不为"other",则给osersionMore赋值为
    if (osVersion != "other"){
        osversionMore = "("+ osVersion +")";
    }
    if((osVersion.indexOf("ios")>=0 || /Android[4-9]/i.test(osVersion) || osVersion.indexOf("bb10")>=0||(typeof window.gCustom ==="object" && gCustom.useFTSCroller === true)) && typeof window.FTScroller==="function"){
        setCookie('viewpc',0);
        useFTScroller=1;
    }else if(osVersion.indexOf("Android2")>=0||osVersion.indexOf("Android1")>=0){//疑问：这意思是Android1和Android2没有fixed的position吗
        noFixedPosition=1;
    }
}
////定义：函数checkhttps(data)
///功能：如果当前url满足一定条件，则对data中的某些网址进行替换。
//具体就是说，如果当前url包含"https:"且包含"api.ftmailbox.com",则把请求到的data中的某些网址替换为"https://api.ftmailbox.com/media"
//最新版本这一段被替换掉了，也不知道为什么--疑问
///参数: data
///返回：data
///依赖关系：单一功能小函数
// 不依赖任何其他东西，除了参数data
function checkhttps(data) {
    /*
     var url = window.location.href.toLowerCase();//将当前url字母全部转换为小写

    if (url.indexOf('https:') >= 0 && url.indexOf('api.ftmailbox.com') >= 0) {//如果url中包含"https:"且包含"api.ftmailbox.com"

        data = data.replace(/http:[\/\\]+i.ftimg.net[\/\\]+/g, 'https://api.ftmailbox.com/media/').replace(/http:[\/\\]+media.ftchinese.com[\/\\]+/g, 'https://api.ftmailbox.com/media/');
        //则将data中的"http://i.ftimg.net/g"替换为"https://api.ftmailbox.com/media/",将"http://media.ftchinese.com/g"也替换为"https://api.ftmailbox.com/media"
    }
    */
    return data;
}



////定义：函数adclick()
///功能：如果当前url中含有"phone.html"，将本页面中href以"open"为开头的a元素的href、target属性进行处理。
///参数: 无
///返回：无
///依赖关系：单一功能小函数
// 不依赖任何其他东西
function adclick(){
    var lo=window.location.href.toLowerCase();
    if(lo.indexOf('phone.html')>0){
        $('a[href^="open"]').each(function(){
            var thelink=$(this).attr("href");
            thelink=thelink.replace(/openads:\/\//g,'').replace(/opensafari:\/\//g,'');
            $(this).attr("href",thelink).attr("target","_blank");
        })
    }
}
///疑问
//1. 当前url为什么会包含"phone.html"？——可以参见gulpfile.js中的任务copy，即有把index.html拷贝为phone.html的步骤。问题是为什么要对这种为"phone.html"的情况特殊处理？
//2. 这里a替换后的href含有"opensafari://",这是否表明是从safari浏览器中打开这个链接？？




/****************错误处理系列***************/
////定义：函数removeBrokenIMG()
///功能：移除所有img元素
///参数：无
///依赖关系：
//依赖库：jquery.min.js
function removeBrokenIMG(){
    $("img").unbind().bind("error",function(){
        $(this).remove();
    })
}


////定义：函数pauseallvideo()
///功能：暂停所有video元素
///参数：无
///依赖关系：
//依赖库：jquery.min.js
function pauseallvideo(){
    $("video").each(function(){
        this.pause();
    })
}



/********************ga错误追踪系列*******************/
////定义：函数trackErr(err,err_location)
///功能：错误追踪
///参数：
// err——错误
// err_location——错误页面的url??待研究
///依赖关系：
//依赖全局变量uaString、_currentVersion、_localStorage
//依赖函数ga()、fa()——待研究
function trackErr(err,err_location){
    var k=err.toString() + ". ua string: " + uaString + ". url: " + location.href + ". version: " + _currentVersion;
    if(_localStorage===1){//待研究：_localStorage在什么情况下会变成1
        ga('send','event','CatchError',err_location,k);
        fa('send','event','CatchError',err_location,k)
    }else{
        new Image().src='http://m.ftchinese.com/track/ga.php?utmac=MO-1608715-1&utmn=2013101610&utmr=-&utmp=%2Fphone%2Ferror%2FlocalStorage&guid=ON';//疑问：这个图片的作用是啥？
    }
}


////定义函数trackFail(err,err_location)
///功能：服务器请求失败追踪
///参数：
// err——错误
// err_location——错误页面的url??待研究
///依赖关系：
//依赖全局变量uaString、_currentVersion、_localStorage
//依赖函数ga()、fa()——待研究
//服务器请求失败追踪
function trackFail(err, err_location) {
    var k=err.toString() + ". url: " + location.href + ". version: " + _currentVersion;
    if (_localStorage===1) {
        ga('send','event', 'CatchError', err_location, k);
        fa('send','event', 'CatchError', err_location, k);
    } else {
        new Image().src = 'http://m.ftchinese.com/track/ga.php?utmac=MO-1608715-1&utmn=2013101610&utmr=-&utmp=%2Fphone%2Ferror%2FlocalStorage&guid=ON';
    }
}
///疑问：函数trackErr和trackFail没啥实质性区别吧？好像看起来区别就是k中一个是全局变量uaString,一个是location.href。



/*********************离线存储系列**********************/

////定义：函数setCookie (name, value , sec , path , domain)
///功能：设置cookie
///参数:
//name——cookie名称
//value——cookie值
//sec——有效的时间长度（单位s）
//path——路径
//domain——域
///返回：无
///依赖关系：单一功能小函数
//依赖函数：trackErr
function setCookie (name, value , sec , path , domain) {//参数依次为名称，值，有效时间(秒)，路径，域
    try {
        var argv = arguments,
            argc,
            expires = new Date(),//先将expires设置为当前时间
            secure;
        argc = argv.length;//参数数量
        sec = sec ? 1000 * sec : 51840000000;//有效的毫秒数
        expires.setTime (expires.getTime() + sec);//expires为失效时间

        //依次检查以下三个参数是否存在，处理好不存在的情况
        path = (argc > 3) ? argv[3] : null;
        domain = (argc > 4) ? argv[4] : null;
        secure = (argc > 5) ? argv[5] : false;

        document.cookie = name + "=" + decodeURI(value) +//修改：原文为escape(value),可对字符串进行编码,不提倡，应该使用decodeURI()
            ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
            ((path == null) ? "/" : ("; path=" + path)) +
            ((domain == null) ? "" : ("; domain=" + domain)) +
            ((secure == true) ? "; secure" : "");
    } catch (err) {
        trackErr(err, "setCookie");
    }
}


////定义函数：getCookie(name)
///功能：获取cookie值
///参数:
//name——cookie名称
///返回：对应cookie名称的cookie值
///依赖关系：单一功能小函数
//依赖函数：trackErr
function getCookie(name){
    var start,len,end;
    try{
        start=document.cookie.indexOf(name+"=");
        if(start==-1){
            return null;
        }
        len=start+name.length+1;
        end=document.cookie.indexOf(";",len);
        if(end==-1){
            end=document.cookie.length;
            return decodeURIComponent(document.cookie.substring(len,end));
        }catch(err){
            trackErr(err,"setCookie");
            return ""
        }
    }
}
///待研究：这个写法是不是太啰嗦，应该还有更好的获取cookie的写法


////定义函数:deleteCookie(name)
///功能：删除cookie值
///参数:
//name——cookie名称
///返回：无
///依赖关系：单一功能小函数
//依赖函数：无
function deleteCookie(name){
    var exp=new Date(),cval=getCookie(name);
    exp.setTime(exp.getTime()-1);
    document.cookie=name+"="+cval+"; expires=" + exp.toGMTString();//办法就是将截止时间设置为当前时间的前1ms。待研究：还有其他更好的办法么？
}


////定义函数：saveValue(thekey,thevalue)
///功能：设置localStorage(出错则设置为cookie)
///参数: 
//theKey——localStorage的键
//thevalue——localStorage的值
///返回：无
///依赖关系：单一功能小函数
// 依赖函数setCookie
function saveValue(thekey,thevalue){///修改：直接将原文savevalue和saveLocalStorage合并，不然太啰嗦了。
    try{
        localStorage.setItem(thekey,thevalue);//修改：原文还多了一句localStorage.removeItem(thekey),本来localStorage中同样的key自然就会以新值覆盖
    }catch(err){
        setCookie(thekey,thevalue);//修改：原文为setCookie(thekey, thevalue, '', '/')，但本来setCookie这个函数研究处理了后面几个参数不存在的情况。疑问：哪有浏览器不支持localStorage的？有必要这样吗？
    }
}


////定义函数：getValue(thekey)
///功能：获取localStorage（出错则获取对应cookie)
///参数: 
//theKey——localStorage的键
///返回：localStorage值
///依赖关系：单一功能小函数
// 依赖函数getCookie
function getvalue(thekey){
    var thevalue="";
    try{
        thevalue=localStorage.getItem(thekey);
    }catch(err){
        thevalue=getCookie(thekey);
    }
    return thevalue;
}

