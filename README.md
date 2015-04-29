# upload
js上传文件
例子见[DEMO](http://www.lovewebgames.com/jsmodule/upload.html)  
*这个组件继承自mobile-upload[mobile-upload](http://www.lovewebgames.com/jsmodule/mobile-upload.html)  *
##用法
	<button id="btn_upload">upload</button>
	<script src="../src/jquery-1.9.1.min.js"></script>
	<script src="../src/upload.js"></script>
	<script>
	var upload = new Upload();
	upload.init({target:$('#btn_upload'),url:"data.html", callback:function(result){
		eval( 'result='+result);
		$('body').append('<img src="'+result.url+'" width="200" height="200"/><input type="hidden" value="'+result.url+'"/>');
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
###target:
		上传的对象结点(jquery方式调用的为它本身)
###url:
		上传提交地址
###accept：
		文件格式，如"jpg,png,jpeg",不作大小写判断
##方法
###callback:function(result)
		上传完成后的回调,参数result是返回的数据，这里只作字符串的处理，如果要转json可以使用JSON.parse或上面例子里的eval进行转换