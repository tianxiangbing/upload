/*
 * Created with Sublime Text 2.
 * license: http://www.lovewebgames.com/jsmodule/index.html
 * User: 田想兵
 * Date: 2015-04-29
 * Time: 11:06:03
 * Contact: 55342775@qq.com
 */
;
(function(root, factory) {
	//amd
	if (typeof define === 'function' && define.amd) {
		define(['$', 'mobile-upload'], factory);
	} else if (typeof exports === 'object') { //umd
		module.exports = factory();
	} else {
		root.Upload = factory(window.Zepto || window.jQuery || $, Mobile_upload);
	}
})(this, function($, Mobile_upload) {
	function Upload() {}
	Upload.prototype = Extend(Upload.prototype, Mobile_upload);
	$.extend(Upload.prototype, {
		init: function(settings) {
			this.settings = settings;
			this.settings.iframe = true;
			this.url = this.settings.url;
			this.name = this.settings.name || "files";
			this.createIframe();
			this.base.init.call(this, this.settings);
		},
		createIframe: function() {
			this.frameId = 'iframe_upload';
			if ($('#' + this.frameId).length == 0) {
				var ifm = '<iframe src="about:blank" id="' + this.frameId + '" name="' + this.frameId + '" width="0" height="0" frameborder="0"></iframe>';
				$('body').append(ifm);
			}
			this.frame = $('#' + this.frameId);
		},
		createFile: function() {
			var _this = this;
			_this.form && _this.form.remove();
			_this.form = $('<form method="post" ENCTYPE="multipart/form-data"><input type="file" style="position:absolute;top:0;left:0;width:1px;height:1px;opacity:0;" id="' + _this.id + '" name="' + _this.name + '"/></form>');
			_this.form.attr("target", _this.frameId);
			_this.form.css({
				height: 0,
				widht: 0,
				padding: 0
			});
			_this.form.attr("action", _this.url);
			$('body').append(_this.form);
			_this.fileInput = $('#' + _this.id);
			this.base.bindFileChange.call(this);
		},
		postFrame: function(input, e, key) {
			var arr = input.value.split('.');
			var ext = arr[arr.length - 1];
			var _this = this;
			var typelist = (this.settings.accept && this.settings.accept.split(',')) || [];
			var hasext = false;
			for (var i = typelist.length - 1; i >= 0; i--) {
				var re = new RegExp(typelist[i], "i");
				if (re.exec(ext)) {
					hasext = true;
				}
			};
			if (!hasext && typelist.length) {
				var msg = '文件格式错误,支持格式：' + this.settings.accept;
				if ($.alert) {
					$.alert(msg);
				} else {
					alert(msg);
				}
				return false;
			}
			this.form.submit();
			this.frame.off('load');
			this.frame.on('load', function() {
				var body = $($(this.contentWindow.document).find('body'));
				var child = body.children()[0];
				var result = body.html();
				if (child&&child.nodeType == 1) {
					result = child.innerHTML;
				}
				_this.settings.callback && _this.settings.callback(result, _this.fileInput, _this.name,_this.target, key);
			});
			_this.createFile();
			return true;
		}
	});
	//实现继承并可调用base方法
	function Extend(child, parent) {
		child =new parent;
		child.base = {};
		$.extend(child.base, child);
		//chid = $.extend(child, parent);
		return child;
	}
	return Upload;
});