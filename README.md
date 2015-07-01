# upload
js上传文件
例子见[DEMO](http://www.lovewebgames.com/jsmodule/upload.html)  
##用法
	<button id="btn_upload">upload</button>
	<script src="../src/jquery-1.9.1.min.js"></script>
	<script src="../src/upload.js"></script>
	<script>
		var upload = new Upload();
		var loadArr = {};
		upload.init({target:$('#btn_upload'),url:"data.html",accept:"png,jpg",startUpload:function(input,i){
			console.log('正在上传中....')
			loadArr[i] = $('<span>正在上传中....</span>');
			$('#preview').append(loadArr[i]);
		}, callback:function(result,i){
			eval( 'result='+result);
			setTimeout(function(){
				//看到正在上传中的效果加了定时器，实际应用中不需要
				loadArr[i] .html('<img src="'+result.url+'" width="200" height="200"/><input type="hidden" value="'+result.url+'"/>');
			},1000)
		}});
	</script>
***
##或者  requirejs:
	<button id="btn_upload">upload</button>
	<script type="text/javascript" src="../dest/require.js"></script>
	<script>
	requirejs.config({
		//By default load any module IDs from js/lib
		baseUrl: '../dest',
		paths: {
			$: 'jquery-1.11.2',
			upload:"upload",
			mobileUpload:"mobile-upload"
		}
	});
	require(['upload','$'], function(Upload,$) {
		var upload = new Upload();
		upload.init({target:$('#btn_upload'),url:"data.html", callback:function(result){
			eval( 'result='+result);
			$('body').append('<img src="'+result.url+'" width="200" height="200"/><input type="hidden" value="'+result.url+'"/>');
		}});
	});
	</script>
#属性和方法
##属性
###accept
	扩展名,如accept:"png,jpg"
###name
	file的name值
###target:
	上传的对象结点(jquery方式调用的为它本身)
###url:
	上传提交地址
###accept：
	文件格式，如"jpg,png,jpeg",不区分大小写
###autoPost:
	是否自动提交表单,默认true,如果为false要指定postTarget
###postTarget:
	当autoPost为false时，需要触发提交上传操作的dom元素
##方法
###callback:function(result,i)
		上传完成后的回调,参数result是返回的数据，这里只作字符串的处理，如果要转json可以使用JSON.parse或上面例子里的eval进行转换  ,i 是一个随机的key，它与当前上传的操作关联
###startUpload:function(input,target,i)
		上传开始时的回调，i 是一个随机的key,它与callback的i是一相同的，可以用它来串联这些回调，比如例子中的loading效果