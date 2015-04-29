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
		define(['$', 'mobileUpload'], factory);
	} else if (typeof exports === 'object') { //umd
		module.exports = factory();
	} else {
		root.Upload = factory(window.Zepto || window.jQuery || $, Mobile_upload);
	}
})(this, function($, Mobile_upload) {
	function Upload() {}
	Upload.prototype = Extend(Upload.prototype, new Mobile_upload);
	$.extend(Upload.prototype, {
		init: function(settings) {
			this.settings = settings;
			this.settings.iframe = true;
			this.url = this.settings.url;
			this.createIframe();
			this.base.init.call(this,this.settings);
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
			_this.form = $('<form method="post" ENCTYPE="multipart/form-data"><input type="file" style="position:absolute;top:0;left:0;width:1px;height:1px;opacity:0;"  accept="image/*" id="' + _this.id + '"/></form>');
			_this.form.attr("target", _this.frameId);
			_this.form.attr("action", _this.url);
			$(_this.target).after(_this.form);
			_this.fileInput = $('#' + _this.id);
			this.base.bindFileChange.call(this);
		},
		postFrame: function() {
			var _this = this;
			this.form.submit();
			this.frame.off('load');
			this.frame.on('load', function() {
				_this.settings.callback && _this.settings.callback($(this.contentWindow.document).find('body').html());
			});
			_this.createFile();
		}
	});
	//实现继承并可调用base方法
	function Extend(child, parent) {
		child.base = {};
		chid = $.extend(child.base, parent);
		chid = $.extend(child, parent);
		return child;
	}
	return Upload;
});