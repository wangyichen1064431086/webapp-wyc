///定义函数handleLogoError
//功能： 用文字填充启动页加载失败的图标图片
//用法：启动页启动时，如果启动页的图标图片加载错误则执行该函数，即相当于document.querySelector("#bookname img").onerror=handleLogoError;
//依赖关系：无
function handleLogoError(){
    document.getElementById("bookname").innerHTML='FINANCIAL TIMES';//用文字填充加载失败的图标图片
}



///定义全局变量uaForMail
//功能：存储浏览器相关信息
var uaForMail=navigator.userAgent||navigator.vendor||"";
uaForMail=uaForMail+"%0D%0A%0D%0Amy URL: "+location.href;


///定义全局变量_currentVersion
//功能：指明当前app版本的全局变量：
var _currentVersion=1117;


///定义函数commonProblem
//功能：替换启动页面元素内容
//用法：点击启动页面“报告问题”，执行函数：commonProblem
//即document.getElementById("startFeedback").onclick=commonProblem;//点击启动页面“报告问题”：一方面执行函数commonProblem;一方面由于("#startFeedback")为a元素，故会同时打开其href指定的邮箱页面。
//依赖关系：全局变量：uaForMail,_currentVersion
function commonProblem(){
	if(/ip(hone|od|ad)/i.test(uaForMail)){
		document.getElementById("bookname").innerHTML="";
		document.getElementById("startstatus").innerHTML='<div style="font-size:0.8em;padding:10px;">亲爱的读者，现在您似乎连接不上我们的服务器，如果您确定您的手机网络正常，请尝试一下我们的备用服务器，方法如下：<br>1. 用iPhone上的Safari打开<br><a href=http://app001.ftmailbox.com/phone.html target=_blank style="font-size:0.9em;">http://app001.ftmailbox.com/phone.html</a><br>2. 点击Safari程序下方的分享按钮，将新的应用添加到您的主屏幕上<br><br><a href="mailto:ftchinese.feedback@gmail.com?subject=Feedback about FTC Web App - from start screen&body=%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0AMy UA String for Your Reference: %0D%0A%0D%0A'+uaForMail+'%0D%0A%0D%0AResources version: '+window._currentVersion+'%0D%0A%0D%0AScreen Mode: '+screen.width+'X'+screen.height+'%0D%0A%0D%0Amy URL: ' + location.href +'">如问题仍未解决，请点击此处发邮件至ftchinese.feedback@gmail.com，我们会尽一切能力解决您的问题。</a></div>'
	}
}


///Google Analysis
//---完全不懂，ga的后面专门来研究，从ga文档开始看起

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','/log/ga.js','ga');
		ga('create', 'UA-1608715-1');ga('require', 'displayfeatures');
		ga('send', 'pageview');

(function(i,s,o,g,r,a,m){
	i['GoogleAnalyticsObject']=r;
	i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)
	},
	i[r].l=1*new Date();
	a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];
	a.async=1;
	a.src=g;
	m.parentNode.insertBefore(a,m);
})(window,document,'script','/log/analytics.js','fa');//看不懂这是什么写法？？？
fa('create','UA-XXXX-Y',{'alwaysSendReferrer':true});
fa('send','pageview');


////定义函数updateStartStatus
///功能：修改启动页面“报告问题”a元素的href,即修改打开的邮箱
///用法：
	//1.直接启动后就执行updateStartStatus(),如下所示。
///依赖关系:全局变量uaForMail、_currentVersion
///修改：删去参数startMessage，因为该参数并没有被应用在函数内部啊！！
function updateStartStatus(){
	document.getElementById("startFeedback").href="mailto:ftchinese.feedback@gmail.com?subject=Feedback about FTC Web App - ' +  + '&body=%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0AMy UA String for Your Reference: %0D%0A%0D%0A"+uaForMail+"%0D%0A%0D%0AResources version: "+window._currentVersion+"%0D%0A%0D%0AScreen Mode: "+screen.width+"X"+screen.height+"%0D%0A%0D%0Amy URL: " + location.href;
}

////执行函数updateStartStatus
///修改：删去了实参'JS not loaded'
//updateStartStatus();//疑问：为什么这句话不注释掉的话，页面过一会儿就会变成空白？


////执行setTimeout：在延迟8s后
///功能：启动页面加载8s后，替换启动页面状态信息。
setTimeout (function(){
	if( document.getElementById("loadNow")){
		document.getElementById("loadNow").innerHTML="无法成功连接，请检查您的网络连接";
	}
},8000);

///执行setTimeout：在延迟12s后
///功能：启动页面加载12s后，替换启动页面状态信息，并使得点击改状态信息可以将当前location.href替换为备用地址，从而从备用地址重新加载
setTimeout(function(){
	if(document.getElementById("loadNow")&&navigator.onLine!=false){//修改：删去了一个&&条件——&&navigator，因为navigator.onLine都存在了那navigator肯定也存在啊！！！

		document.getElementById("loadNow").innerHTML="点这里切换到备用服务器试试<br>如果长期连接不上服务器，可尝试先删除应用程序再重新下载";//改变启动页状态说明文字

		var backupHost;//用以存储设置的location.host的值
		///根据目前location.host的值，给backupHost赋上其他host值
		//疑问：默认打开的location.host是什么？？？
		if(location.host=="m.ftchinese.com"){
			backupHost="http://app001.ftmailbox.com";
		}else if(location.host=="app001.ftchinese.com"){
			backupHost="http://app002.ftmailbox.com";
		}else if(location.host=="app002.ftchinese.com"){
			backupHost="http://app003.ftmailbox.com";
		}else if(location.host=="app003.ftchinese.com"){
			backupHost="http://app004.ftmailbox.com";
		}else if(location.host=="app004.ftchinese.com"){
			backupHost="http://app005.ftmailbox.com";
		}else if(location.host=="app005.ftchinese.com"){
			backupHost="http://m.corp.ftchinese.com";//修改:把m.ftmailbox.com改为了m.corp.ftchinese.com，不然都没有出现m.corp.ftchinese.com
		}else if(location.host=="m.corp.ftchinese.com"){
			backupHost="http://m.ftchinese.com";
		}else{
			backupHost="http://m.ftchinese.com";
		}

		var backupUrl;//用以存储设置的location.href的文件部分
		if(location.href.indexOf("phoneapp")>=0){
			backupUrl="phoneapp.html";
		}else{
			backupUrl="phone.html";
		}

		///为"#loadNow"添加click事件处理函数
		document.getElementById("loadNow").addEventListener("click",function(){
			location.href=backupHost+"/"+backupUrl;//点击后，当前href变更为由backupHost和backupUrl组成的新值。
			//修改：把window.location直接改为location,这俩不是等价的么
		});
	}
},12000);


////似乎是用于处理缓存的---暂略，用法待研究
try{
	var cacheStatusValues=["uncached","idle","checking","downloading","undateready","obsolete"],
		cacheListening=["cached","checking","downloading","error","noupdate","obsolete","progress","updateready"],
		cache=window.applicationCache;//cache存放applicationCache对象

	window.applicationCache.addEventListener("updateready",function(){
		window.applicationCache.swapCache();
		console.log("swap cache has been called")
	},false);

	setTimeout(function(){
		try{//修改:为setTimeout的回调函数添加try...catch,因为try...catch对异步编程而言不一定有用
			if(cache && navigator.onLine==true){
				cache.update();
			}
		}catch(error){
			console.log(error);
		}
	
	},10000);
}catch(error){
	console.log(error);
}
//cache用法待研究

////执行scrollTo(0,0)
///功能：将页面的左上角显示在屏幕左上角
///疑问：不太清楚这里执行这么一句话是干嘛的
window.scrollTo(0,0);


////定义全局变量FTAdch
var FTAdch="NP_Home";

////定义函数checkJS
///功能：待研究
function checkJS(jsName,jsUrl,runJS){
	if(localStorage.getItem(jsName)){//修改：原文为 localStorage&&localStorage.getItem(jsName)
		if(runJS==true){
			localStorage.getItem(jsName);//获取localStorage变量jsName
			//修改：原文为eval(localStorage.getItem(jsName)),不懂为什么此处要用个eval
			runJS=false;
		}
	}

	if(window.jQuery && navigator.onLine!=false){//
	//说明：这里充分证明了放在jquery.js文件后面导入的必要性。
		$.get(jsUrl+"?"+theMinute,function(data){//$.get(url,callback):url为请求的页面地址
			if(runJS==true){
				eval(data);//将get方法获取的数据(type自然是String)以JavaScript代码的方式执行
			}
			localStorage.removeItem(jsName);//移除localStorage变量jsName
			localStorage.setItem(jsName,data);//重新设置localStorage变量jsName,且其值为data
		});
	}
}

////
