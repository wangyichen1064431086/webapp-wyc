/*****************时间戳系列************/
////定义：函数updateTimeStamp: 
///功能：用于更新时间戳。具体更新的变量有：
// 此刻的时间——themi:20160819153600
// 此刻的日期——thed:20160819
// 此刻的秒数——thisdayunix:1474271020 (当前时间的秒数的整数值————by 四舍五入处理 当前时间的毫秒数/1000）
// 到期时刻的秒数——expiredayunix:1474271020+7776000(到期时间=当前时间+3个月的时间) 3600\*24\*90=7776000
/// 依赖关系：
//依赖全局变量——thisday、themi、 thed、 thisdayunix、 actionTimeStamp
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



////定义：函数unixtochinese(thetime,datetype)
///功能：将Unix时间戳转换为中文日期和星期
///参数:thetime,datetype
///返回:中文时间戳
///待研究
function unixtochinese(thetime,datetype) {
    var todaystamp,dayArray,dayChar,thehour,theminute,ampm;
    thisday = new Date(thetime * 1000);
    todaystamp = thisday.getFullYear() + '年' + (thisday.getMonth() + 1) + '月' + thisday.getDate() + '日 星期';
    dayArray = '日一二三四五六';
    dayChar = dayArray[thisday.getDay()];
    todaystamp += dayChar;
    if (datetype == 1) {
        thehour = thisday.getHours();
        thehour = ("0" + thehour).slice(-2);      
        theminute = thisday.getMinutes();
        theminute = ("0" + theminute).slice(-2);
        ampm = (thehour < 12) ? 'AM' : 'PM';
        todaystamp += ' ' + thehour + ':' + theminute + ' ' + ampm;
    }
    return todaystamp;
}

/*********************运行环境监测系列**********************/

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



////定义函数checkDevice()
///功能：设备检测。具体说，就是通过uaString来得到不同的osVersion值，并在osVersion为某些值的时候，设置其他变量值。
///参数：无
///返回：无
///依赖关系：
//依赖全局变量uastring、gCustom
//操纵全局变量osVersion、osVersionMore、useFTScroller
///特殊地位：直接写在执行函数里面
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

    ///如果osVersion不为"other",则给osersionMore赋值为(osVersion)
    if (osVersion != "other"){
        osversionMore = "("+ osVersion +")";
    }

    ///根据osVersion值，设置一些cookie或其他全局变量的值
    if((osVersion.indexOf("ios")>=0 || /Android[4-9]/i.test(osVersion) || osVersion.indexOf("bb10")>=0||(typeof window.gCustom ==="object" && gCustom.useFTSCroller === true)) && typeof window.FTScroller==="function"){//如果osVersion是手机的版本，则设置cookie键值对viewpc=0(表示非pc),设置useFTScroller=1(手机使用FTScroller)
        setCookie('viewpc',0);
        useFTScroller=1;
    }else if(osVersion.indexOf("Android2")>=0||osVersion.indexOf("Android1")>=0){//如果osVersion 表示是Android版本，则设置noFixedPosition为1。疑问：这意思是Android1和Android2没有fixed的position吗
        noFixedPosition=1;
    }
}
///原文注释：
// using native vertical scroll doesn't make text selection easy 
// and comes with other problems
// stop using it for now and revisit the issue in the future



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



////定义：函数removehttps(data)
///功能：对data中的某些网址进行替换。
//具体就是说，把data中的'https://api.ftmailbox.com/media/'替换为'http://i.ftimg.net/'
///参数: data
///返回：替换处理后的data
///依赖关系：单一功能小函数
// 不依赖任何其他东西，除了参数data
function removehttps(data){
    return data.replace(/https:[\/\\]+api.ftmailbox.com[\/\\]+media[\/\\]+/g,'http://i.ftimg.net/');
}
///疑问：上述两个网址各是什么网址？？？




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



/********************ga追踪系列*******************/
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
///依赖关系：
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




/*************文章获取系列*****************/
////定义：函数filloneday(onedaydate)
///功能：填充设置弹窗的右下角"版本"部分的内容
///参数：onedaydate
///返回：无
///依赖关系：
//依赖全局变量：_currentVersion,gDeviceId,uaString
function filloneday(onedaydate){//疑问：这个参数有啥作用？？？并没有在函数内部用到啊
    /*ga追踪pv,暂略
    setTimeout(function(){
        httpspv(gDeviceType+'/homepage');
    },2000);
    */

    //关于window.ft_android_id，先删了。
    //疑问：window.ft_android_id是在哪里定义的？还是安卓设备本来就有？？

    $("#storytotalnum").html("版本："+_currentVersion+gDeviceId).unbind().bind("click",function(){
        $(this).html(uaString);//修改：原文这里定义了一个函数内局部变量uaStringFillPage，其和全局变量uaString明明是一模一样的。
        //点击这个"版本"文字部分，会显示uaString内容
    })

}



////定义：函数saveoneday(onedaydate,data)
///功能：将data存储为localStorage
///参数：onedaydate,data
///返回：无
///依赖关系：
//依赖全局变量：gNewStorageKey
function saveoneday(onedaydate,data){
    if(!onedaydate){//如果ondaydate不存在
        try{
            saveValue(gNewStoryStorageKey,data)//gNewStoryStorageKey初始值为"homepage"
            //修改：我直接用了saveValue，原文用了saveLocalStorage，还先用了localStorage.removeItem
        }catch(ignore){

        }
    }
}



////定义：函数notifysuccess()
///功能：将中文时间戳添加到homecontent部分的第一行
///参数：无
///返回：无
///依赖关系：
//依赖全局变量：latestunix
//依赖函数:unixtochinese
function notifysuccess(){
    if(typeof latestunix==='string'){
        var todaystamp=unixtochinese(latestunix,0);//将latestunix转换为中文时间戳
        $('#homeload .loadingStatus').html(todaystamp+"出版"); //即为主页id="homecontent"部分下的第一行“x年x月x日 出版”
    }
}



////定义：函数loadStoryData(data)
///功能：将文章数据数组准备好，具体来说就是将请求获得的原始数据data(type为Json字符串)处理为干净的allstories(type为array)
///参数：data
///返回：无
///依赖关系：
//依赖函数：updateStartStatus、trackErr
//影响全局变量:allstories
function loadStoryData(data){
    var jsonHeadPosition,
        jsonWrong,
        jsondata,
        dataStatus = 'unknown',
        thedata=data;

    try{
        updateStartStatus();//修改：去掉了实参'loading story data',因为这个updateStartStatus函数内部根本没用处理参数啊。。
    }catch(ignore){

    }

    ///如果data长度不足1000，说明此次返回的数据根本就不对，跳出函数(原文注释)
    if(thedata.length<1000){
        return;
    }

    try{
        jsonHeadPosition=thedata.indexOf('{"head"');
        if(jsonHeadPosition>0){//如果返回的数据前有服务器返回的乱码（参见jsoneerror.html），则先去除它(原文注释)
            jsonWrong=thedata.substring(0,100);
            thedata=thedata.slice(jsonHeadPosition);//从{"head"开始取，才是有用的data

            ///根据gOnlineAPI的值，判断其是处于在线or离线状态，然后执行不同的trackErr
            if(gOnlineAPI===true){
                trackErr(jsonWrong,"wrong jsondata live");
            }else{
                trackErr(jsonWrong,"wrong jsondata cache");
            }
        }

        jsondata=$.parseJSON(thedata);//将json字符串thedata解析为对象

    }catch(err){
        thedata=thedata.substring(0,22);//疑问：这里的22是任意取的吧？？？

        if (gOnlineAPI === true) {
            trackErr(err + "." + thedata, "fillPage jsondata");
            dataStatus = 'online error';
        } else {
            trackErr(err + "." + thedata, "fillPage jsondata cache");
            dataStatus = 'cache error';
        }
    }

    try{
        if(jsondata.body.odatalist.length>=0){
            jsondata=jsondata.body.odatalist;
        }else{//待研究：这部分又是发送了一种ga
            ga('send','event', 'CatchError', 'API Error', '{errorcode: "' + jsondata.body.oelement.errorcode + '", host: "' + location.host + '"}');
            fa('send','event', 'CatchError', 'API Error', '{errorcode: "' + jsondata.body.oelement.errorcode + '", host: "' + location.host + '"}');
        }
    }catch(ignore){

    }

    $.each(jsondata,function(entryIndex,entry){
        allstories[entry.id]=entry;
    })//知识补充：$.each(array,callback(index,value)):对数组array遍历执行callback

}



////定义：函数showDateStamp
///功能：展示中文时间戳。疑问：它和notifysuccess函数感觉挺类似的，谁先谁后执行？
///参数：无
///返回：无
///依赖关系：无
function showDateStamp(){
    var ele=$('#homeload .loadingStatus');//即#homecontent部分顶部的中文时间戳
    var myStamp=ele.attr('data-pubdate');//"2016年07月25日 出版"
    ele.html(myStamp);
}



////定义：函数downloadStories(downloadType)
///功能：执行GET文章数据的请求，并在请求成功后执行updateStartStatus、loadStoryData、saveoneday、showDateStamp函数
///依赖关系：
//依赖全局变量:gConnectionType、gStartPageAPI、gHomeAPIRequest、gHomeAPISuccess、gApiUrl、gHomeAPIFail、gOnlineAPI、ipadstorage
//依赖函数：updateStartStatus、loadStoryData、saveoneday、unixtochinese、showDateStamp
function downloadStories(downloadType){
    var apiurl,
        loadcontent,
        savedhomepage,
        uaStringFillPage,
        todaystamp,
        loadingBarContent='',
        message,
        connectionType=window.gConnectionType||'unknown connection';//疑问：gConnectionType这个全局变量是不是一开始并没有定义？怎么找不到？？

    try{
        updateStartStatus();
    }catch(ignore){

    }

    if(gStartPageAPI===true){//初始值就为true
        $('#homeload .loadingStatus').html('下载文章供离线阅读...');
        apiurl=gApiUrl.a10001;//值为'/index.php/jsapi/get_new_story?rows=25&'
        message={//修改：原文为一个属性一个属性赋值，我这里直接改为对象字面量
            head:{
                transactiontype:'10001',
                source:'web'
            },
            body:{
                ielement:{
                    num:30
                }
            }
        }


        gHomeAPIRequest=new Date().getTime();


        $.ajax({
            method:gApi001Method,//值为'GET'
            url:apiurl+'?'+themi,//themi是时间戳相关的全局变量
            dataType:'text'
        })
        .done(function(data){
            gHomeAPISuccess=new Date().getTime();//当前时间戳的毫秒数
            var timeSpent=gHomeAPISuccess-gHomeAPIRequest;//请求成功后的时间-请求开始前的时间

            ///ga先略

            if(data.length<=300){
                return;
            }
            gOnlineAPI=true;
            loadStoryData(data);
            saveoneday('',data);
            todaystamp=unixtochinese(lateststory,0);
            showDateStamp();

            if(ipadstorage){//ipadstorage全局变量定义在androidapptest.html和html5storage.html中，待研究，应该是和ipad设备有关的吧？？
                setTimeout(function(){
                    ipadstorage.droptable();
                },10000);
            }
        }).fail(function(jqXHR){
            ///ga先略

            todaystamp=unixtochinese(lateststory,0);
            $('#homeload .loadingStatus').html('未能下载成功');
            setTimeout(function(){
                showDateStamp();
            },2000);
            gOnlineAPI=false;//表示离线状态
            gHomeAPIFail=new Date().getTime;//请求失败后的时间戳
            var timeSpent=gHomeAPIFail-gHomeAPIRequest;

            ///trackFail,先略
        })



    }

}

/******************************************************/
/****明天从函数loadTohome、startFromoffline写起********/
/******************************************************/
function loadTohome(){

}


function startFromOffline() {
    var data = gStartPageStorage || '';
    if (data !== '' && data.indexOf('data-pubdate') > 0) { //Use data from the local storage
        data = checkhttps(data);
        loadToHome(data);
        $('#startstatus').html('连接失败，加载缓存');
        try {
            updateStartStatus('load cache to start');
        } catch (ignore) {

        }
        $("#startbar").animate({width:"100%"},300,function(){
            $("#screenstart").remove();
            showDateStamp();
        });  
    } else {
        try {
            updateStartStatus('start fail and no cache');
        } catch (ignore) {

        }
        $('#startstatus').html('连接失败，请稍候再次刷新');
    }
}

////定义：函数loadHomePage
///功能：打开主页
///依赖关系：
//依赖函数:startFromOffline()
function loadHomePage(loadType){
    var dateDescription='',
        dateStamp='',
        homePageRequest=new Date().getTime(),
        connectionType=window.gConnectionType||'unknown connection';

    try{
        updateStartStatus();
    }catch(ignore){

    }

    updateTimeStamp();//更新时间戳
    $('html').addClass('is-refreshing');//为html元素增加'is-refreshing'的class


    ///只有loadTypea为'start',才是更新启动页文字；其他两种情况都是更新主页的#homecontent首部文字
    if(loadType==='start'){
        gStartStatus='startFromOnline start';//全局变量gStartStatus初始为空字符串
        $("#startstatus").html("加载最新主页");//更新启动页的“正在连接服务器”那一块儿
    
    }else if(/^[0-9]{4}\-[0-9]{1,2}\-[0-9]{1,2}$/.test(loadType)){//这个正则是年-月-日的意思吧？？
        dateDescription=loadType.replace(/^([0-9]{4})\-([0-9]{1,2})\-([0-9]{1,2})$/,'$1年$2月$3日');//将年月日换成中文描述形式
        }
        $('#homeload .loadingStatus').html('加载'+dateDescription+'主页...');//这是已经到了主页，更新主页的‘#homecontent’部分的顶部内容
    
    }else if(loadType!=='start'){
        $('#homeload .loadingStatus').html('加载最新主页...');

    }

    ///ga先略

    requests.push(
        $.ajax({
            url:gStartPageTemplate + themi +dateStamp,///index.php/ft/channel/phonetemplate.html?channel=nexthome&+20160819153600+'',
            success:function(data){
                var homePageSuccess=0;
                var timeSpent=homePageSuccess-homePageRequest;

                gStartStatus="startFromOnline success";

                $("#startstatus").html("版面成功加载");
                connectInternet="yes";//原始值为"no"
                setTimeout(function(){
                    connectInternet="unknown";
                },300000);//过300s即5min以后，改变connectInternet值
                loadToHome(data,loadType);//函数loadToHome写到前面去
                showDateStamp();

                ///判断首页是否是最新的
                if(/^[0-9]{4}\-[0-9]{1,2}\-[0-9]{1,2}$/.test(loadType)){
                    gHomePageIsLatest=false;//初始值为true
                }else{
                    gHomePageIsLatest=true;
                }

                ///将请求得来的data以"homepage"命名存储为localStorage
                try{
                    saveValue(gHomePageStorageKey,data);//修改：直接用我的saveValue。gHomePageStorageKey="homePage"
                }catch(ignore){

                }

                $("#startbar").animate(
                    {
                        width:"100%"//properties:目标CSS属性值
                    },
                    300,//duration:持续时间，default为400
                    function(){//动画完成后的回调函数
                        $("screenstart").remove();//移除启动页面，显示出主页
                    }
                );

                $('html').removeClass('is-refreshing');

                ///ga先略
            },
            error:function(){
                gStartStatus="startFromOnline error";
                ///ga先略

                if(loadType==='start'){
                    $("#startstatus").html("服务器开小差了");
                    try{
                        updateStartStatus();
                    }catch(ignore){

                    }
                    startFromOffline();///该函数待研究
                }else{
                    $('#homeload .loadingStatus').html('服务器开小差了!');
                    try{
                        updateStartStatus();
                    }catch(ignore){

                    }
                }
                $('html').removeClass('is-refreshing');
                setTimeout(function(){
                    showDateStamp();
                },2000);
            }
        })
    )

    if(loadType==="start"){//这个一定是先于Ajax请求完成，因为这个是同步的，Ajax是异步的
        setTimeout(function(){
            if(gStartStatus==='startFromOnline start'){
                $('#startstatus').html('准备加载缓存的内容...');
                setTimeout(function(){
                    if(gStartStatus==='startFromOnline start'){
                        startFromOffline();//待研究
                    }

                    $('html').removeClass('is-refreshing');
                },2000);
            }
        },3000);
    }
}


////定义：函数addstoryclick
///功能：
///依赖关系：
//依赖全局变量：pageStarted、_popstate(待研究:这俩全局变量的作用？？？)
///依赖函数:readstory
function addstoryclick(){
    $('.story').unbind().bind('click',function(){//('.story')就是主页的文章列表
        var storyid=$(this).attr('storyid'),//获取被点击文章的'storyid'属性，
            storyHeadline=$(this).find(".headline, .h1").html()||"";//获取被点击文章下的('.headlines,.h1')元素的内容，即文章标题
        pageStarted=1;//初始值为0
        _popstate=0;//初始值为1
        readstory(storyid,storHeadline);//先放着
    })
}


////定义：函数jumpToPage 待写到别处
function jumpToPage(){
    var hashURL=location.hash||"",
        _channel_name,
        _channel_title,
        k;
    if(hashURL.indexOf("story/")>=0){
        k=hashURL.replace(/^.*story\//g,"");
        if(document.body.className!='storyview'||readingid!=k){

        }
    }
}


/*************滚动处理******************/


/***************界面操作*************/

////定义：函数getURLParameter(url,name)
///功能：获取指定url（eurl）中的指定参数名(name)的参数值。
///参数:
// url:一个url字符串
// name:url中后面接的一个参数的名称
///返回：该url中参数名的参数值
///依赖关系：
//- 依赖参数：theurl ,thep
///疑问：这个函数getpvalue(theurl,thep)作用不是一样的吗？为何还要使用另外一种方法再定义一次？？？
function getURLParameter(url,name){//eg:url为"http://localhost:9000/#/channel//index.php/ft/channel/phonetemplate.html?channel=column&20160625120000",name为"channel"
    return decodeURIComponent((
            new RegExp(
                '[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)'
            ).exec(url)//执行exec(url)后返回的是存放匹配结果的数组,该例结果为["?channel=column&", "column", "&"]
            ||[undefined,""]//若上述匹配结果数组为空，则使用[undefined,""]
        )[1]//取数组中的索引1，即第二个捕获组，该例即为"column"
        .replace(/\+/g,'%20')//将第二个捕获组的+替换成'%20'？？
    )||null;//该例最终返回"column"
}



////定义函数startslides()
///疑问：待研究，这个到底是控制哪的？'#channelview'下根本就没有imgslides
function startslides(){
    var cv=$('#channelview'),//cv是id为channelview的元素
        lasttouch=-1,
        thistouch,
        sh,
        ch,
        k;

    if(cv.find('.imgslides div').length>0){//如果$('#channeview')下具有('.imgslides div')元素

        cv.find('.imgslides:first').after(//选择$('#channelview')下的第一个('.imgslides')元素,在其后面插入以下元素
            '<div class="slidedots"></div>'
        );

        cv.find('.imgslides div').each(//对于('#channelview')下的每一个('.imgslides div')元素都执行以下函数
            function(index){//index即为('.imgslides div')的索引数，从0开始
                cv.find('.slidedots:first').append('<span n='+ index + '>&nbsp;&#149;&nbsp;</span>');//对于('#channelview')下的第一个('.slidedots'),向其添加一个子元素span
            }
        );

        cv.find('.slidedots span').click(//如果点击('#channelview')下的各('.slidedots span')
            function(){
                cv.find('.slidedots span').removeClass('grey');//移除所有('.slidedots span')元素class'grey'
                $(this).addClass('grey');//为当前点击的元素添加class'grey'
                cv.find('.imgslides div').hide();//隐藏('.imgslides div')
                cs=$(this).attr('n');//获取当前元素的属性n的值
                cs=parseInt(cs,10);//将n值以10进制转换为数值
                $('#channelview .imgslides div').eq(cs)//选择这种元素的第cs+1个
                    .css('left',0)//设置left为0
                    .fadeIn(500);//过0.5s渐渐显现出来
            }
        );

        $('#channelview .imgslides div:first' ).show();
        $('#channelview .slidedots span:first').addClass('grey');


        ///手指滑动翻页效果（原有注释）
        
        cs=0;

        ///touchmove事件
        document.getElementById('imgslides').addEventListener('touchmove',function(e){//touchmove事件
                thistouch=e.changedTouches[0].clientX;//对于touchmove事件而言，e.changedTouches是一系列的改变了的触摸点。此处thistouch就是touchmove发生后的第一个触摸点的横坐标
                if(lasttouch>0){
                    sh=$('#imgslides div').eq(cs).css('left').replace(/px/g,'');
                    ch=thistouch-lasttouch;
                    sh=parseInt(sh,10);
                    k=sh+ch;
                    $('#channelheight').html(thistouch+':'+lasttouch+':'+sh+':'+k);
                    $('#imgslides div').eq(cs).css('left',k);
                }
                lasttouch=thistouch;//将当前thistouch赋值给下一次touchmove事件的lasttouch
            },false
        );

        ///touchstart事件
        document.getElementById('imgslides').addEventListener('touchstart',function(e){
            lasttouch=e.changedTouches[0].clientX;
            touchstartx=lasttouch;
        },false);

        ///touchend事件
        document.getElementById('imgslides').addEventListener('touchend',function(e){
            touchendx=e.changedTouches[0].clientX;
            $('#channelheight').html(touchendx+':'+touchstartx);
            var ls=cs;
            if(touchendx-touchstartx<-30){
                cs=cs+1;
                $('#imgslides div').eq(ls).animate({
                        left:'-999px'
                    },500)；
            }else if(touchendx-touchstartx>30){
                cs=cs-1;
                $('#imgslides div').eq(ls).animate({
                    left:'999px'
                },500);
            }else{
                #('#imgslides div').eq(ls).animate({
                    left:0
                },500);
            }
            if(cs==-1){
                cs=$('#imgslides div').length=-1;
            }else if(cs==$('#imgslides div').length){
                cs=0;
            }
            if(cs!=ls){
                setTimeout(function(){
                    $('#imgslides div').hide();
                    $('#imgslides div').eq(cs).css('left',0).fadeIn(500);
                },500);
            }
            $('#channelview .slidedots span').removeClass('grey');
            $('#channelview .slidedots span').eq(cs).addClass('grey');

        },false);
    }
}


////定义：函数closead
///功能：关闭广告
///依赖关系：
//依赖全局变量:gNowView、useFTScroller、scrollHeight、gDeviceType
//依赖函数:httpspv、recordAction
function closead(){
    document.body.className=gNowView;
    if(useFTScroller===0){
        setTimeout(function(){
            window.scrollTo(0,scrollHeight);
        },10);
    }
    $('body').css('background','#FFF1E0');
    $('#adiframe').attr('src','');

    ///记录首页pv(原文注释)
    /*先去掉ga追踪相关
    httpspv(gDeviceType+'/homepage');
    recordAction('/phone/homepage');
    */
}





////定义：函数histback()
///依赖关系：
//依赖函数：closeOverlay(),backhome()
//依赖全局变量：hist
function histback(){

}



////定义：函数closeOverlay()
///功能：关闭所有弹窗及相关处理
///依赖关系：
//依赖全局变量：scrollOverlay(其初始化为0)、noFixedPosition
//依赖函数:pauseallvideo()
function closeOverlay(){
    pauseallvideo();//暂停所有video元素
    $(".overlay").removeClass("on");//overlay弹窗全部移除class"on"
    $("button.open").removeClass("open");//带有样式open的button移除样式"open"
    if(noFixedPosition==1){//如果设备是Android1或Android2，即无fixed的position
        window.scrollTo(0,scrollOverlay);
        scrollOverlay=0;
    }
    $("#videoContent").empty();//"#videoContent"元素内的东西全部清空
}



////定义：函数turnonOverlay(theId)
///功能：显示id为theId的弹窗
///依赖关系：
//依赖全局变量：scrollOverlay(其初始化为0)、noFixedPosition
//依赖参数：theId
function turnonOverlay(theId){
    $(".overlay").removeClass("on");
    $("#"+theId).addClass("on");

    if(noFixedPosition==1){//疑问：这个对没有fiexed定位的设备的处理没怎么懂
        scrollOverlay=window.pageYOffset;
        window.scrollTo(0,0);
    }
}
///说明：window.pageYOffset是window.scrollY的别名，其为document从顶部滑动过的垂直距离,单位为px


////定义：函数shareArticle()
///功能：分享文章按钮点击后执行
///依赖关系：
//依赖全局变量：noFixedPosition、shareScroller、FTScroller
//依赖参数：theId
function shareArticle() {
    $("#shareStory").addClass("on");

    if (noFixedPosition==1) {
        scrollOverlay=window.pageYOffset;
        window.scrollTo(0, 0);
    }

    if (shareScroller === undefined && typeof window.FTScroller === "function") {
        shareScroller = new FTScroller(document.getElementById("shareScroller"), gVerticalScrollOpts);
    }
}


////定义：函数closeShareArticle()
///功能：文章分享弹窗中关闭按钮点击后执行
///依赖关系：无
function closeShareArticle(){
    $("#shareStory").removeClass("on");
}



////定义：函数openClip()
///功能：点击剪报按钮后执行
///依赖关系：
//依赖函数:turnonOverlay(theId)
function openClip(){
    turnonOverlay('clipStory');
    $("#addfavlink").empty(''); 
    $("#clipButton").show();
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




////定义大函数：showchannel
///依赖关系：
//依赖传入参数：url,channel,requireLogin,openIniframe,channelDescription
// 依赖全局变量：
// 依赖函数；turnonOverlay、closeOverlay、 getURLParameter、historyAPI、httpspv、recordAction、handlelinks、addChannelScroller、navScroller、 checkLogin、updateShare、 pauseallvideo、 removeBrokenIMG


/*************重量级函数****************/
