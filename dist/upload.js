!function(t,e){"function"==typeof define&&define.amd?define(["$"],e):"object"==typeof exports?module.exports=e():t.Upload=e(window.Zepto||window.jQuery||$)}(this,function(t){function e(){}return t.extend(e.prototype,{init:function(t){window.uploadCount=window.uploadCount||0,window.uploadCount++;var e=Math.random().toString().replace(".","");this.id="upload_"+e+window.uploadCount.toString(),this.settings=t,this.settings.iframe=!0,this.settings.zIndex=this.settings.zIndex||9999,this.url=this.settings.url,this.name=this.settings.name||"files",this.target=this.settings.target,this.postTarget=this.settings.postTarget,this.autoPost="undefined"==typeof this.settings.autoPost?!0:this.settings.autoPost,this.createIframe(),this.createFile(),this.bindEvent(),this.bindFileChange()},createIframe:function(){if(this.frameId="iframe_upload",0==t("#"+this.frameId).length){var e='<iframe src="about:blank" id="'+this.frameId+'" name="'+this.frameId+'" width="0" height="0" frameborder="0"></iframe>';t("body").append(e)}this.frame=t("#"+this.frameId)},createFile:function(){var e=this;e.form&&e.form.remove(),e.form=t('<form method="post" ENCTYPE="multipart/form-data"><input type="file"  id="'+e.id+'" name="'+e.name+'"/></form>'),e.form.attr("target",e.frameId),e.form.css({height:0,width:0}),e.form.attr("action",e.url),t("body").append(e.form),e.fileInput=t("#"+e.id),e.fileInput.css({width:60,height:20,opacity:0,zIndex:e.settings.zIndex}),this.bindFileChange()},postFrame:function(e,i,n){for(var s=e.value.split("."),a=s[s.length-1],o=this,r=this.settings.accept&&this.settings.accept.split(",")||[],f=!1,h=r.length-1;h>=0;h--){var l=new RegExp(r[h],"i");l.exec(a)&&(f=!0)}if(!f&&r.length){var d="文件格式错误,支持格式："+this.settings.accept;return t.alert?t.alert(d):alert(d),!1}return o.form.submit(),o.createFile(),this.frame.off("load"),this.frame.on("load",function(){var e=t(t(this.contentWindow.document).find("body")),i=e.children()[0],s=e.html();i&&1==i.nodeType&&(s=i.innerHTML),"string"==typeof s&&"json"===o.settings.type&&(s=new Function("return "+s)()),o.settings.callback&&o.settings.callback.call(o,s,o.fileInput,o.name,o.target,n)}),!0},touch:function(e,i){function n(t){return i.call(this,t)}var s;t(e).on("click",n),t(e).on("touchmove",function(t){s=!0}).on("touchend",function(t){if(t.preventDefault(),!s){var e=i.call(this,t,"touch");e||(t.preventDefault(),t.stopPropagation())}s=!1})},bindEvent:function(e){var i=this;t(this.target).mousemove(function(e){var n=e.pageX-30,s=e.pageY-10;t(i.fileInput).css({left:n,top:s,position:"absolute"})}),i.bindFileEvent(),this.postTarget&&this.touch(t(this.postTarget),function(t,e){i.args.length&&i.postFrame.apply(i,i.args)&&i.settings.startUpload&&i.settings.startUpload.apply(i,i.args)})},bindFileEvent:function(){t(this.fileInput).click(function(t){t.stopPropagation()})},bindFileChange:function(){var e=this;t(e.fileInput).off("change"),t(e.fileInput).on("change",function(t){var i=(t.target.files,"up_"+Math.random().toString().replace(".",""));e.args=[this,t,i],e.settings.selected&&e.settings.selected.call(this,this,t,i),e.settings.iframe&&e.autoPost&&e.postFrame(this,t,i)&&e.settings.startUpload&&e.settings.startUpload(e.fileInput,e.target,i)})}}),e});