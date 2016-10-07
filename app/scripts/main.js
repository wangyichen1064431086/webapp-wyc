/**********本文件只存放执行代码**********/



////执行：为全局变量gStartPageTemplate赋值
///功能：根据不同屏幕尺寸，即如果大于700和小于700两种情况，为gStartPageTemplate赋上不同值。
///涉及全局变量：screenWidth、gStartPageTemplate
///说明：我们的基本假设是，不管横屏还是竖屏，只要宽度小于700，那就是手机；否则就是平板。（来自原有注释）
if(screenWidth>=700){
	gStartPageTemplate = '/index.php/ft/channel/phonetemplate.html?channel=nexthome&screentype=wide&';
}else{
	gStartPageTemplate = '/index.php/ft/channel/phonetemplate.html?channel=nexthome&';
}
///疑问：导入的phonetemplate.html作用是什么？是不是对应于文件tpl\channel\phonetemplate.html?



////执行：为gIsInSWIFT赋值
///功能：判断是否在原生iOS中运行
///涉及全局变量：gIsInSWIFT
if(window.location.href.indexOf('isInSWIFT')>=0){//运行时的url里含有'isInSWIFT'的话就说明在原生iOS中运行
	gIsInSWIFT=true;
}
///疑问:这个规则“运行时的url里含有'isInSWIFT'的话就说明在原生iOS中运行”，应该是在iPhoneApp项目中定义的吧？



////执行：本地测试
///功能：待总结
///涉及全局变量gApiUrl,gPostMethod,gHomePageVideo,gSkyZ,giPadVideo,gGetLastUpdateTime,gHotStory,gWebRoot,screenWidth,gStartPageTemplate
if (window.location.hostname === 'localhost' || window.location.hostname.indexOf('192.168') === 0 || window.loc影响ation.hostname.indexOf('10.113') === 0 || window.location.hostname.indexOf('127.0') === 0) {//本机服务器地址的几种形式吧？
	///在本地测试的话就直接使用本地api下的已经通过gulpfile.js的任务ea准备好了的几个json文件
    gApiUrl.a10001 = 'api/ea001.json';
    gApiUrl.a10003 = 'api/ea003.json';
    gApiUrl.a10007 = 'api/ea007.json';
    gApiUrl.aBackUp = 'api/ea001-backup.json';

    gPostMethod = 'GET';//gPostMethod由"POST"变为"GET"

	///在本地测试的话这几个文件也使用本地路径
    gHomePageVideo = 'api/homepagevideo.tpl?';
    gSkyZ = 'api/skyZ.tpl?';
    giPadVideo = 'api/ipadvideo.tpl?';
    gGetLastUpdateTime = 'api/get_last_updatetime.json?';
    gHotStory = 'api/hotstory.json?';

    gWebRoot = 'http://m.ftchinese.com';
    if (screenWidth >= 700) {
        gStartPageTemplate = 'api/homecontentwide.html?';
    } else {
        gStartPageTemplate = 'api/homecontent.html?';
    }
}



////执行：选择模板
///功能：待总结
///依赖关系：
//取决于全局变量gCustom
//影响于全局变量gStartPageTemplate,gStartPageAPI,gAppName,gHomePageStorageKey,gNewStoryStorageKey,gPullRefresh
if(typeof window.gCustom==="object"){
	if(typeof window.gCustom.template==="string"){
		gStartPageTemplate=window.gCustom.template;
	}
	if(typeof window.gCustom.startapi==="boolean"){
		gStartPageAPI=window.gCustom.startapi;
	}
	if(typeof window.gCustom.appname==="string"){
		gAppName=window.gCustom.appname;
	}
	if(typeof window.gCustom.homePageStorageKey==="string"){
		gHomePageStorageKey=window.gCustom.homePageStorageKey;
	}
	if(typeof window.gCustom.newStoryStorageKey==="string"){
		gNewStoryStorageKey=window.gCustom.newStoryStorageKey;
	}
	if(typeof window.gCustom.pullRefresh==="boolean"&&window.gCustom.pullRefresh===true){
		gPullRefresh =true;
	}
}


////执行：Start the web app
try{
	checkDevice();
	startPage();
}catch(err){
	trackErr(err+", where: "+ gStartStatus,"startpage");
}