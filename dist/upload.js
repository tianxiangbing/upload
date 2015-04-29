!function(t,e){"function"==typeof define&&define.amd?define(["$"],e):"object"==typeof exports?module.exports=e():t.Mobile_upload=e(window.Zepto||window.jQuery||$)}(this,function(t){function e(){var t=Math.random().toString().replace(".","");this.id="upload_"+t,this.fileInput}return t.fn.Mobile_upload=function(i){var n=[];return t(this).each(function(){var a=new e,s=t.extend({target:t(this)},i);a.init(s),n.push(a)}),n},e.prototype={init:function(e){this.settings=t.extend({},this.settings,e),this.target=this.settings.target,this.createFile(),this.name=this.settings.name||"files",this.bindEvent(),this.bindFileChange()},touch:function(e,i){function n(t){return i.call(this,t)}var a;t(e).on("click",n),t(e).on("touchmove",function(t){a=!0}).on("touchend",function(t){if(t.preventDefault(),!a){var e=i.call(this,t,"touch");e||(t.preventDefault(),t.stopPropagation())}a=!1})},createFile:function(){var e=this;e.fileInput&&e.fileInput.remove(),e.fileInput=t('<input type="file" style="position:absolute;top:0;left:0;width:1px;height:1px;opacity:0;"  accept="image/*" id="'+e.id+'"/>'),t(e.target).after(e.fileInput),this.settings.multiple&&this.fileInput.attr("multiple","multiple"),this.bindFileChange()},bindEvent:function(e){var i=this;this.touch(t(this.target),function(e,n){return t(this).parent().siblings().size()>=i.settings.max?i.settings.maxCallback&&i.settings.maxCallback(this):t(i.fileInput).trigger("click"),!1}),i.bindFileEvent()},bindFileEvent:function(){t(this.fileInput).click(function(t){t.stopPropagation()})},bindFileChange:function(){var e=this;t("#"+e.id).off("change"),t("#"+e.id).on("change",function(i){var n=/^image\//i,a=i.target.files;if(e.settings.iframe){var s="up_"+Math.random().toString().replace(".","");e.settings.startUpload&&e.settings.startUpload(e.target,s),e.postFrame(this,i,s)}else if(a)for(var o=a.length-1;o>=0;o--){var r=a[o];!function(i){var a=("key_"+Math.random().toString().replace(".",""),Math.random().toString().replace(".","")),s="up_"+a;if(n.test(i.type)){if(t("#"+e.id).parent().siblings().size()+1>=e.settings.max&&e.settings.maxCallback&&e.settings.maxCallback(t("#"+e.id)),window.FileReader){var o=new FileReader;e.settings.startUpload&&e.settings.startUpload(e.target,s),o.onload=function(){if(e.createFile(),e.bindFileEvent(),e.settings.imageReady&&e.settings.imageReady(e.target,this.result,s),e.settings.ajax){var n={};n[e.settings.ajax.name||"file"]=this.result,t.ajax({type:"post",url:e.settings.ajax.url,data:n,dataType:"json",success:function(t){e.settings.callback&&e.settings.callback(t,s)},complete:function(){e.settings.endUpload&&e.settings.endUpload(e.target,s)}}),this.result=null,o.onload=null,o=null}else e.settings.callback&&e.settings.callback(this.result,i,e.name,s)},o.readAsDataURL(i)}}else alert("不是图片文件")}(r)}})}},e}),function(t,e){"function"==typeof define&&define.amd?define(["$","mobileUpload"],e):"object"==typeof exports?module.exports=e():t.Upload=e(window.Zepto||window.jQuery||$,Mobile_upload)}(this,function(t,e){function i(){}function n(e,i){return e.base={},chid=t.extend(e.base,i),chid=t.extend(e,i),e}return i.prototype=n(i.prototype,new e),t.extend(i.prototype,{init:function(t){this.settings=t,this.settings.iframe=!0,this.url=this.settings.url,this.createIframe(),this.base.init.call(this,this.settings)},createIframe:function(){if(this.frameId="iframe_upload",0==t("#"+this.frameId).length){var e='<iframe src="about:blank" id="'+this.frameId+'" name="'+this.frameId+'" width="0" height="0" frameborder="0"></iframe>';t("body").append(e)}this.frame=t("#"+this.frameId)},createFile:function(){var e=this;e.form&&e.form.remove(),e.form=t('<form method="post" ENCTYPE="multipart/form-data"><input type="file" style="position:absolute;top:0;left:0;width:1px;height:1px;opacity:0;" id="'+e.id+'"/></form>'),e.form.attr("target",e.frameId),e.form.css({height:0,widht:0,padding:0}),e.form.attr("action",e.url),t(e.target).after(e.form),e.fileInput=t("#"+e.id),this.base.bindFileChange.call(this)},postFrame:function(e,i,n){for(var a=e.value.split("."),s=a[a.length-1],o=this,r=this.settings.accept&&this.settings.accept.split(",")||[],l=!1,f=r.length-1;f>=0;f--){var c=new RegExp(r[f],"i");c.exec(s)&&(l=!0)}if(!l&&r.length){var h="文件格式错误,支持格式："+this.settings.accept;return t.alert?t.alert(h):alert(h),!1}this.form.submit(),this.frame.off("load"),this.frame.on("load",function(){o.settings.callback&&o.settings.callback(t(this.contentWindow.document).find("body").html(),n)}),o.createFile()}}),i});