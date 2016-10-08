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
        }
    }catch(err){
        trackErr(err,"setCookie");
        return "";
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
                    },500);
            }else if(touchendx-touchstartx>30){
                cs=cs-1;
                $('#imgslides div').eq(ls).animate({
                    left:'999px'
                },500);
            }else{
                $('#imgslides div').eq(ls).animate({
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
///功能：如果当前url中含有"phone.html"，将本页面中href以"open"为开头的a元素(即广告链接）的href、target属性进行处理。
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


////定义函数：gotowebapp(url)
///功能:跳转至指定url
///参数：url
///返回:无
///依赖关系：isOnline
function gotowebapp(url) {
    if (isOnline()=="possible") {//如果是在线状态
        window.location.href = url;
    } else {
        alert('您现在处于离线状态，无法使用本功能');
    }
}



/*************滚动处理******************/
////定义：函数homeScrollEvent
///功能：重新加载首页首屏部分的广告
///依赖关系：
//依赖全局变量:screenHeight
function homeScrollEvent(){
    //修改：删去对全局变量screenHeight的重新求值。$(window).heigth不就等于screen.height么？？

    $("#fullbody .adiframe:visible:not(.loaded-in-view)").each(function(){//三个广告div，其内各有一个iframe
        var FrameID;

        if($(this).offset().top>=0 && $(this).offset().top<=screenHeight){//如果这个广告相对于document顶部的距离在0~screenHeight之间，则重新加载这个广告————待确认：那就是首页首屏部分的广告iframe要重新加载？？？
            try{
                FrameID=$(this).find("iframe").eq(0).attr("id");//FrameID即为广告iframe的id值
                document.getElementById(FrameID).contentDocument.location.reload(true);// 重新加载iframe内容。
            }catch(ignore){

            }

            $(this).addClass("loaded-in-view");
        }
    })
}
///识说明：
//1. elem.offset()：获取元素相对于document的坐标，eg:Object {top: 2239, left: 37.5}
//2.location.reload(true):传递参数true就是强制从服务器重新加载，没有传递true则可能从缓存加载




////定义：函数addHomeScroller
///功能：为主页添加垂直方向scroller,根据变量nativeVerticalScroller的值来决定使用原生scroller还是FT的scroller
///依赖关系：
//依赖函数：homeScrollEvent()
//依赖全局变量：useFTScroller,nativeVerticalScroll,theScroller,gVerticalScrollOpts
//疑问：变量useFTScroller,nativeVerticalScroll分别指示的是什么？？？
function addHomeScroller(){
    if(useFTScroller===0){//初始就为0
        return;
    }

    if(nativeVerticalScroll===true){//初始为false
        $('#homeScroller').css({//'homeScroller'是主体页面整个部分的id
            'overflow-y':'scroll',//当内容溢出元素框时发生的事情
            '-webkit-overflow-scrolling':'touch',
            'overflow-scrolling':'touch'//疑问：有这个属性吗？为何只查到'-webkit-overflow-scrolling'
        });
        document.getElementById('homeScroller').addEventListener('scroll',function(){
            homeScrollEvent();//重新加载首页首屏部分的广告
        });
    }else if(typeof theScroller !== "object"&& typeof FTScroller==="function"){//修改：原为没有条件 typeof FTScroller==="function"
        theScroller = new FTScroller(document.getElementById("fullbody"),gVerticalScrollOpts);//创建一个FT的scroller
        theScroller.addEventListener("scrollend",function(){
            homeScrollEvent();
        })
    }
}
///说明：
//-webkit-overflow-scrolling:控制触摸设备是否使用基于动量的scrolling



////定义：函数addnavScroller(theId)
///功能：给特定id的元素添加scroller,根据变量nativeVerticalScroller的值来决定使用原生scroller还是FT的scroller
///参数:theId:要添加scroller的元素的id
///返回：无
///说明：和addHomeScroller写法几乎一模一样
function addnavScroller(theId){
    if(nativeVerticalScroll===true){
        $('#'+theId).css({
            'overflow-y':'scroll',
            '-webkit-overflow-scrolling':'touch',
            'overflow-scrolling':'touch'
        });
    }else if(typeof thenavScroller!=="object" && typeof window.FTScroller==="function"){//修改：原文为thenavScroller === undefined && typeof window.FTScroller === "function"
        thenavScroller=new FTScroller(document.getElementById(theId),gVerticalScrollOpts);
    }
}


////定义：函数checkSectionScroller()
///功能：决定显示/隐藏导航菜单条左右两侧滚轮
///参数:$currentSlide——可为$("#fullbody")
///返回：无
///依赖关系：
//依赖全局变量：sectionScroller
function checkSectionScroller($currentSlide){//实参为:$("#fullbody")
    ///控制导航菜单条左侧滚轮是否显示
    if(sectionScroller.scrollerLeft>0){
        $currentSlide.find(".navleftcontainer").show();//(".navleftcontaiiner")是导航菜单条左侧滚轮
    }else{
        $currentSlide.find(".navleftcontainer").hide()
    }

    ///控制导航菜单条左侧滚轮是否显示
    if(sectionScroller.scrollerLeft+$(window).width()<sectionScroller.scrollWidth){
        $currentSlide.find(".navrightcontainer").show();
    }else{
        $currentSlide.find(".navrightcontainer").hide();
    }
}




////定义：函数navScroller()
///功能：创建主页上部导航条的scroller
///参数:$currentSlide——可为$("#fullbody")
///返回：无
///依赖关系：
//依赖全局变量：sectionScroller、sectionScrollerX、
//依赖函数:checkSectionScroller
function navScroller($currentSlide){//实参为:$("#fullbody")
    if($currentSlide.find(".navigationScroller").length<=0||typeof window.FTScroller!=="function"){//".navigationScroller"是主页上部导航菜单条
        return;
    }

    var currentView=$currentSlide.attr("id"),//值为"fullbody"
        liNumber,
        newPadding,
        liWidth;

    if(typeof sectionScroller==="object"){
        sectionScroller.destroy("removeElements");//疑问：这个destroy()方法是哪里来的
    }

    $currentSlide.find(".navigationScroller").attr("id","scroller_"+currentView);//设置导航菜单条的id="scroller_fullbody"

    sectionScroller=new FTScroller(document.getElementById('scroller_'+currentView),{
        scrollingY:false,
        snapping:false,
        scrollbars:false,
        updateOnChanges:true,
        updateOnwindowResize:true,
        windowScrollingActiveFlag:"gFTScrollerActive"
    });//待研究：关于通过new FTScroller创建的scroller对象

    if(sectionScrollerX>0){//初始值为0
        sectionScroller.scrollTo(sectionScrollerX,0);
    }

    sectionScroller.addEventListener("scrollend",function(){
        sectionScrollerX=sectionScroller.scrollLeft;//为导航条左侧已经滚过的距离
    });

    if (sectionScroller.scrollWidth<=$(window).width() && sectionScroller.scrollWidth<=1024) {//如果用scroller算出来导航条的宽度小于窗口宽度，且小于1024像素，--待细研究
        liNumber=$("#gamecontent ul.navigation li").length;
        newPadding=10;
        liWidth=0;
        $("#gamecontent ul.navigation li").each(function(){
            liWidth+=$(this).outerWidth();
        });
        if (liNumber>0 && liWidth<sectionScroller.scrollWidth) {
            newPadding=10+parseInt((sectionScroller.scrollWidth-liWidth)/(2*liNumber), 10);
        }
        $("#gamecontent ul.navigation li").css("padding","0 "+newPadding+"px");
    } else {//此为正常情况：即导航条宽度大于屏幕宽度
        $("#gamecontent ul.navigation li").css("padding","0 10px");
        checkSectionScroller($currentSlide);
        sectionScroller.addEventListener("scrollend", function(){
            checkSectionScroller($currentSlide);
        });
    }//实参为$("#fullbody")
}
///知识补充：
//.outerWidth():获取元素当前的计算宽度，包括padding和border






/*************文章获取系列*****************/
////定义：函数filloneday(onedaydate)
///功能：填充设置弹窗的右下角"版本"部分的内容
///参数：onedaydate
///返回：无
///依赖关系：
//依赖全局变量：_currentVersion,gDeviceId,uaString
function filloneday(){//修改：这个参数并没有在函数内部用到，故删去
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


////定义函数：fillContent
///功能：填充主页内容
///依赖关系：
//依赖函数:filloneday、histback、showchannel、gotowebapp、addHomeScroller
//依赖全局变量:uaString
function fillContent(loadType){
    var searchnote = '输入关键字查找文章',
        mpdata,
        hcdata,
        message={},
        hashURL=location.hash||"",
        _channel_name,
        _channel_title,
        theTimeStamp=new Date();
        lastActionTime,
        thestoryId,
        parts;
    
    filloneday();//填充设置弹窗的右下角"版本"部分的内容

    $('.closestory,.back,.backbutton').unbind().bind('click',function(){//返回按钮
        histback();
    });

    ///广告点击打开iframe(原文注释)
    adclick();//对href以open开头的a元素（即广告）的href等属性进行设置

    ///从广告返回主页或文章页（原文注释）
    $('.adback').click(function(){
        closead();//关闭广告
    });

    ///点击各频道/栏目等按钮载入其他HTML的页面
    $('.channel').unbind().bind("click",function(){//所有栏目频道按钮都带有channel样式
        pageStarted=1;//初始值为0
        _popstate=0;//初始值为1。待确认：这里表示不是点击了浏览器的前进后退按钮？？？
        showchannel($(this).attr('url'),$(this).html(),($(this).hasClass('require-log-in')==true)?1:0);
    });

    ///进入其他Webapp(原文注释)
    $('.webapp').click(function(){//疑问：这个('.webapp')在哪？目前没找到
        gotowebapp($(this).attr('url'));//跳转至其他url
    });

    ///导航栏首页按钮标红（实际上是变蓝）
    $('.navigation .home').addClass('on');

    /////为主页添加垂直方向scroller
    setTimeout(function(){
        addHomeScroller();
    },10);

    ///创建主页上部导航条scroller
    navScroller($("#fullbody"));

    ///关于首页垂直滑动的其他额外处理
    if(useFTScroller==1&&nativeVerticalScroll===false){//当满足这两个条件时，整个主页都不能上下滑动
        document.getElementById('fullbodycontainer').addEventListener('touchmove',function(e){
            e.preventDefault();
        });
    }else if(nativeVerticalScroll===true){//首页固定尾部（即每日英语、我的FT、刷新、设置部分），不能滑动
        document.getElementById('contentRail').addEventListener('touchmove',function(e){
            e.preventDefault();
        })
    }


    ///给用户的提示（原文注释）暂略，待研究
    if(!!pmessage){
        $('.bodynote').append(pmessage);
    }else{
        $('.bodynote').hide();
    }

    ///在搜索弹窗的搜索框处理-----待修改：这段改为一个单独的函数吧
    $('#searchtxt').val(searchnote);//搜索框中填入提示文字
    $('#searchtxt').focus(function(){//为搜索弹框绑定focus事件，即在focus时，将字体颜色设置为黑色并清空提示文字
        var it=$(this);
        it.css('color','#000');
        if(it.val()==searchnote){
            it.val('');
        }
    });
    $('#searchtxt').blur(function(){//为搜索框绑定blur事件
        var it=$(this);
        it.css('color','#666');
        if(it.val()==''){
            it.val(searchnote);
        }
    });

    ///检查读者是否已经登录
    checkLogin();//待写


    ///读者发表评论
    //待写

    ///查看旧刊的日历
    //待写

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



////定义：函数showThisImage(ele,imgUrl)
///功能：在ele的父元素的父元素中显示url为imgUrl的img元素
///参数：ele——一个img元素，imgUrl——一个图片的url
///返回：无
///依赖关系：无
function showThisImage(ele,imgUrl){
    ele.parent().parent().addClass('imageloaded').removeClass('image').html('<img src="'+imgUrl+'">');//为元素的父元素的父元素改写内容为一个img
}



////定义：函数showAppImage
///功能：显示文章概要图片
///参数：ele——实参为'fullbody'
///返回：无
///依赖关系：
//依赖函数:showThisImage()
function showAppImage(ele){//实参为'fullbody'
    $('#'+ele+' .image>figure>img').each(function(){
        var imgUrl=this.src||'';
        if(this.complete){//如果图片已下载
            showThisImage($(this),imgUrl);
            // this image already loaded
            // do whatever you would do when it was loaded
        }else{//如果图片未下载
            $(this).load(function(){
                showThisImage($(this),imgUrl);
            });
        }
    })
}


////定义：函数loadTohome(data,loadType)
///功能：准备好主页内容，即完成主页内容的填充及其他处理
///参数：data,loadType
///返回：无
///依赖关系：
//依赖函数:fillContent、addstoryclick、removeBrokenIMG、showAppImage
//依赖全局变量:uaString
function loadTohome(data,loadType){
    ///填充主页文章内容数据
    $('#homecontent').html(data);

    ///填充其他主页内容
    if(loadType!==undefined){
        fillContent(loadType);
    }else{
        fillContent();
    }

    ///为文章列表添加点击后可以打开对应文章的事件
    addstoryclick();

    ///移除出错的图片
    removeBrokenIMG();

    ///显示各文章的概要图片
    showAppImage('fullbody');

    ///在uaString中含有'baidu'或'micromessenger'字样时，显示“下载原生app”的按钮——待修改：应该写成应该函数封装起来
    if(/baidu|micromessenger/i.test(uaString)){
        $('#download-native').removeClass('hidden');
    }
}




////定义：函数loadHomePage
///功能：移除启动页，打开主页
///依赖关系：
//依赖函数:updateStartStatus、loadToHome、showDateStamp、startFromOffline
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
        
        $('#homeload .loadingStatus').html('加载'+dateDescription+'主页...');//这是已经到了主页，更新主页的‘#homecontent’部分的顶部内容
    
    }else if(loadType!=='start'){
        $("#homeload .loadingStatus").html("加载最新主页...");

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



////定义：函数startpage()
function startpage(){
    var savedhomepage;
    updateTimeStamp();//更新时间戳
    gStartStatus = "startpage start";

    try{
        updateStartStatus()
    }catch(ignore){

    }

    var k;
    var oneday = '';
    var ccode = getpvalue(window.location.href,"utm_campaign") || "";
    if (ccode !== "") {
        setCookie("ccode", ccode, '', '/', '.ftchinese.com');
    }
    username = getCookie('USER_NAME') || '';
    langmode = getCookie('langmode') || 'ch';
    if (historyAPI()==true) {
        k=location.href;
        window.history.replaceState(null, null, gAppRoot + "#/home");
        window.history.pushState(null, null, k);
    }
    try {
        window.tracker = new FTCTracker();
        //console.log (tracker);
    }catch(err){
        //console.log (err);
        trackErr(err, "FTCTracker");
    }
    if (useFTScroller===0) {window.scrollTo(0, 0);}
    //从网络获取数据的情况，判断其网络连接的好坏

    try {
        ipadstorage.init();
    } catch(err) {
        trackErr(err, "ipadStorage");
    }
    document.body.className = 'fullbody';
    gNowView = 'fullbody';
    try {
        gStartPageStorage = localStorage.getItem(gHomePageStorageKey) || '';
        _localStorage=1;
        //loadFromLocalStorage(gStartPageStorage);
    } catch (err) {
        gStartPageStorage = "";
        _localStorage=0;
    }
    if (isOnline() === 'no' && gStartPageStorage === '') {
        $('#startstatus').html('您没有联网');
        setTimeout(function(){
            loadHomePage('start');
        },2000);
    } else {
        loadHomePage('start');
    }
    //if user use wifi, download the latest 25 stories
    if (window.gConnectionType !== 'data' && window.gConnectionType !== 'no') {
        setTimeout(function () {
            downloadStories('start');
        }, 1000);
    }

    try{
        if (_localStorage===1 && localStorage.getItem(gNewStoryStorageKey)) {
            savedhomepage = localStorage.getItem(gNewStoryStorageKey);
            loadStoryData(savedhomepage);
        }
    } catch (ignore) {
        
    }

    requestTime = new Date().getTime();
    //gStartStatus = "startpage get_last_updatetime";
    $.get(gGetLastUpdateTime + requestTime, function(data) {
        lateststory = data;
    });
    setInterval(function() {
        requestTime = new Date().getTime();
        $.get(gGetLastUpdateTime + requestTime, function(data) {
            if (lateststory !== data) {
                loadHomePage('refresh');
                if (window.gConnectionType !== 'data' && window.gConnectionType !== 'no') {
                    downloadStories('refresh');
                }
            }
            lateststory = data;
            connectInternet="yes";
            setTimeout(function(){
                connectInternet="unknown";
            },299000);
        });
        checkbreakingnews();
    },100000);
    if (isOnline()=="possible") {checkbreakingnews();}
    //gStartStatus = "startpage useFTScroller";
    if (useFTScroller === 1) {
        try {
            document.getElementById('fullbodycontainer').addEventListener('touchstart', function(e) {
                gNowView = document.body.className;
                gIsSwiping = false;
                if (typeof window.gFTScrollerActive === "object" || $('#slideShow').hasClass('on') === true ) {
                    gTouchStartX = -1;
                    gTouchStartY = -1;
                    return false;
                }
                gTouchStartX = e.changedTouches[0].clientX;
                gTouchStartY = e.changedTouches[0].clientY;
            }, false);

            document.getElementById('fullbodycontainer').addEventListener('touchmove', function(e) {
                var xDistance;
                var yDistance;
                gNowView = document.body.className;
                //if (gNowView==='fullbody') {return;}
                if ( (typeof window.gFTScrollerActive === "object" && gIsSwiping === false) || $('#slideShow').hasClass('on') === true ) {
                    gTouchStartX = -1;
                    gTouchMoveX = -1;
                    gTouchStartY = -1;
                    gTouchMoveY = -1;
                    return false;
                }
                gTouchMoveX = e.changedTouches[0].clientX;
                gTouchMoveY = e.changedTouches[0].clientY;
                xDistance = Math.abs(gTouchMoveX - gTouchStartX);
                yDistance = Math.abs(gTouchMoveY - gTouchStartY);
                if (gTouchStartX !== -1) {
                    //whether the user is swiping or scrolling
                    if (((xDistance > gStartSwipe && gMoveState ===0) || (xDistance > gMinSwipe && gMoveState<0)) && typeof window.gFTScrollerActive !== "object" && yDistance < 30 && yDistance/xDistance < 0.5) {
                        window.gFTScrollerActive = {};
                        gIsSwiping = true;
                    }
                    //If the swiping is true
                    if (gIsSwiping === true) {
                        if ((gTouchMoveX - gTouchStartX > gMinSwipe && gMoveState === 0)) {
                            if (gTouchStartX < gSwipeEdge) {
                                if (gNowView==='fullbody') {
                                    switchNavOverlay('on');
                                } else {
                                    histback('pinch');
                                }
                            }
                            ga('send','event', 'App Feature', 'Swipe', 'Back');
                            //console.log ('go right!');
                            gTouchStartX = -1;
                        } else if (gTouchMoveX - gTouchStartX < -gMinSwipe && gMoveState ===0){
                            if (gNowView==='fullbody') {
                                switchNavOverlay('off');
                            }
                            //console.log ('go left!');
                            gTouchStartX = -1;
                        } else if ((gTouchMoveX - gTouchStartX > gMinSwipe && gMoveState<0) || (gTouchMoveX - gTouchStartX < -gMinSwipe && gMoveState>0)) {
                            //console.log ('donot go!');
                            gTouchStartX = -1;
                        }
                    }
                   
                }
            }, false);

            document.getElementById('fullbodycontainer').addEventListener('touchend', function(e) {
                gTouchStartX = -1;
                gTouchMoveX = -1;
                window.gFTScrollerActive = false;
                gIsSwiping = false;
            }, false);
        } catch (ignore){
        
        }
    }
    //Delegate Click Events for Any New Development
    //gStartStatus = "startpage inline-video-container";
    $('body').on('click','.inline-video-container',function(){
        var videoId = $(this).attr('video-url') || $(this).attr('id') || $(this).attr('vsource') || '';
        var videoTitle = $(this).attr('title') || '视频';
        var cmsId = $(this).attr('vid') || '';
        var cmsImage = $(this).attr('image') || gIconImage;
        if (videoId!=='') {
            if (videoId.indexOf('http')<0 && videoId.indexOf('/')>=0) {
                videoId = 'http://v.ftimg.net/' + videoId;
            }
            watchVideo(videoId, videoTitle, cmsId, videoTitle, cmsImage);
        }
    });
    $('body').on('click', '.outbound-link', function(){
        ga('send','event','Outbound Link in App', 'click', $(this).attr('href') + '/' + window.location.href);
    });
    
    //click navOverlay to close navigation
    $('body').on('click', '#navOverlay', function(e){
        var k = e.target.id;
        if (typeof k !== 'undefined' && k === 'navOverlay') {
            closeOverlay();
            $(".channelNavButton").removeClass("open");
        }
    });
    //gStartStatus = "startpage end";
    //Delegate Click on Home Page
    $("body").on("click",".track-click",function(){
        var eventCategory,eventAction,eventLabel;
        eventCategory = "Phone App";
        eventAction = "Click";
        eventLabel = $(this).attr("eventLabel") || "";
        if (eventLabel !== "") {
            ga('send','event',eventCategory, eventAction, eventLabel);
        }
    });
    
    //Window Oriention Change event
    try {
    window.addEventListener("orientationchange", function() {
        httpspv(gDeviceType + '/rotate');
    }, false);
    }catch(ignore){

    }
    
    if (gShowStatusBar == 1) {
        $("html").addClass("show-status-bar");
    }
}


/*************重量级函数****************/
