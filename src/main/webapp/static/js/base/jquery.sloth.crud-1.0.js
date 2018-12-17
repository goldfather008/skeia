/* *
 * js crud 函数
 * By: yeshujun
 * Version : 1.0
*/
(function($) {  
	/**
	 * 1、提交form（新增、修改）
	 * formId:form id
	 * onSubmit:提交之前的function，不可返回false；一般用于特殊的校验，或一些特殊的操作；
	 * onComplete:提交成功之后之后执行的动作
	 *        在默认操作无法满足时，才需要加这个function
	 * 
	 * $("#formid").submitForm({
	 *      formId:"formId",
		    onSubmit:function(){return true},
		    onComplete:function(){location.reload();//重新加载页面}
	 * });
	 */
	$.fn.submitForm = function(options) {     
	    var defaults = {  
	    	formId:"",
	    	resetForm:true,        /**保存成功后，是否reset Form*/
		    onSubmit:null,        /**提交前的回调函数*/
		    onComplete:null      /**响应完成后的回调函数*/
		};     
		var opts = $.extend(defaults, options); 
		return this.click(function() { 
			if(opts.formId==""){
				alert("请设置form id");
				return;
			}
			$("#"+opts.formId).form('submit', {
				type:"post",
				dataType:"json",
				onSubmit:function(){
			    	// 过滤文本框中的前后空格
			    	$("#"+opts.formId).find(":input[type='text'],:input[type='hidden']").each(function(){
			    		$(this).val($(this).val().trim());
			    	});
			    	
				    if (opts.onSubmit!=null) {
				    	opts.onSubmit();
					};
					if(validateForm(opts.formId)){
						return true;
					}else{
					    if (opts.onValidateError!=null) {
					    	opts.onValidateError();
						};
						return false;
					}
				},
				error:function(){
					alert($.i18n("errorMsg"));
				},
				success:function(data){//easyui form,server返回json时，contentType需为text/html，否则将提示下载内容
					  //将json字符串转化成json
					  try{
						  if(typeof(data) != "object"){
								data = $.parseJSON(data);
							}
					  }catch(e){
						  //不能解析成json的数据，都当作异常处理
						  $("body").html(data);
						  return;
					  }
					  
					  //不存在msg时，当作异常处理
					  if(data.msg==undefined){
						   $("body").html(data);
						   return;
					   }
					       
					  //data.code不是0时，后台操作失败
					  if(data.code!="0"){
						   var msgtemp = "";
						   if(data.msg!=""){
							   msgtemp = data.msg;
						   }
						   if(data.msgs!=null){
							   msgtemp += data.msgs;
						   }
						   alert(msgtemp);
						   $(":button,:submit,:reset").removeAttr("disabled");
					  }else{
					       //json主信息
						    if(data.msg!=null && data.msg!=""){
						    	alert(data.msg);
						    }
					        
						    $(":button,:submit,:reset").removeAttr("disabled");
				      
					        //提交成功后，额外调用的方法
					        if(opts.onComplete!=null) {
					    	    //server传回的其他数据，传递到onComplete方法中,多个数据时，用,号分隔
							    opts.onComplete(data.msgs);
							    //return;
					         }
					      
					         if(opts.resetForm){
						        $("#"+opts.formId)[0].reset();
					         }
					  }
				}
			});
	    });     
	};     
	
	/**
	* 2、删除单笔数据
	* $(".deleteOne").deleteOne({
	*     url:"../../..do"
	* });
	*/
	$.fn.deleteOne = function(options) {     
	    var defaults = {    
		    url: "",
		    dtype:"table",/**tabel：删除的是table列表中的一行*/
		    chooseMsg: $.i18n("deleteChooseMsg"),
			confrimMsg:$.i18n("deleteConfrimMsg"),
			successMsg: $.i18n("deleteSuccessMsg"),
			failMsg:  $.i18n("deleteFailMsg"),
			onComplete:null   /**响应完成后的回调函数*/
		};     
		var opts = $.extend(defaults, options); 
		return this.click(function() { 
			if(opts.url==""){
				alert($.i18n("deleteNoUrl"));
				return;
			}
			var param = $(this).attr("param");/**参数 如 <a param="ids=${id}">删除</a>*/
			if(typeof(param)=="undefined" || param.split("=").length<2){
				alert($.i18n("deleteNoParam"));
				return;
			}
			ajaxDelete(opts.url,opts.dtype,param,1,opts.chooseMsg,opts.confrimMsg,opts.successMsg,opts.failMsg,opts.onComplete,param.split("=")[1]);
	    });     
	};     
	/**
	 * 3、table 列表中的批量删除
	 * $("#batchDelete").batchDelete({
	 *     url:"../../..do",
	 *     paramName:"ids"
	 * });
	 */
	$.fn.batchDelete = function(options) {     
	    var defaults = {    
		    url: "",
		    paramName: "ids", /**服务器端接收的参数名称，table 列中checkbox的namen属性，默认为ids*/
		    chooseMsg: $.i18n("deleteChooseMsg"),
			confrimMsg:$.i18n("deleteConfrimMsg"),
			successMsg: $.i18n("deleteSuccessMsg"),
			failMsg:  $.i18n("deleteFailMsg"),
			onComplete:null   /**响应完成后的回调函数*/
		};     
		var opts = $.extend(defaults, options); 
		return this.click(function() { 
			if(opts.url==""){
				alert($.i18n("deleteNoUrl"));
				return;
			}
			var param = "";//参数
			var paramName = $(this).attr("paramName");//参数名
			var deleteSize=0;//删除的记录条数
			if(typeof(paramName)=="undefined" || paramName==""){
				paramName = opts.paramName;
			}
			if($("input[name='"+paramName+"']").size()==0){
				alert($.i18n("deleteNoUrl")+paramName);
				return;
			}else{
				$("input[name='"+paramName+"']:checked").each(function(){
					param+=","+$(this).val();
					deleteSize++;
				});
				param = param.substring(1);
			}
			if(param==""){
				alert(opts.chooseMsg);
				return;
			}
			ajaxDelete(opts.url,"table",paramName+"="+param,deleteSize,opts.chooseMsg,opts.confrimMsg,opts.successMsg,opts.failMsg,opts.onComplete,param);
	    });
	};
	/**
	* 2、异步处理请求
	* $(".handleAjaxOne").handleAjaxOne({
	*     url:"../../..do"
	*     chooseMsg: "请选择要操作的数据",
	*	  confrimMsg: "您确定要操作吗",
	*	  successMsg: 操作成功,
	*	  failMsg:  服务器出现错误，操作失败,
	* });
	*/
	$.fn.handleAjaxOne = function(options) {
		var oname = $(this).attr("oname");/**操作名称 如 <a oname="恢复用户">恢复</a>*/
		if(typeof(oname)=="undefined"){
			oname="操作"
		}
	    var defaults = {    
		    url: "",
		    dtype:"table",/**tabel：删除的是table列表中的一行*/
		    chooseMsg: $.i18n("handleChooseMsg").replace('操作',oname),
			confrimMsg:$.i18n("handleConfrimMsg").replace('操作',oname),
			successMsg: $.i18n("handleSuccessMsg").replace('操作',oname),
			failMsg:  $.i18n("handleFailMsg").replace('操作',oname),
			onComplete:null   /**响应完成后的回调函数*/
		};     
		var opts = $.extend(defaults, options); 
		return this.click(function() { 
			if(opts.url==""){
				alert($.i18n("handleNoUrl").replace('操作',oname));
				return;
			}
			var param = $(this).attr("param");/**参数 如 <a param="ids=${id}">删除</a>*/
			if(typeof(param)=="undefined" || param.split("=").length<2){
				alert($.i18n("handleNoParam").replace('操作',oname));
				return;
			}
			ajaxPost(opts.url,opts.dtype,param,1,opts.chooseMsg,opts.confrimMsg,opts.successMsg,opts.failMsg,opts.onComplete,param.split("=")[1]);
	    });     
	}; 
	/**
	 * 3、table 列表中的批量异步处理
	 * $("#handleAjaxbatch").handleAjaxbatch({
	 *     url:"../../..do",
	 *     paramName:"ids"
	 * });
	 */
	$.fn.handleAjaxbatch = function(options) {  
		var oname = $(this).attr("oname");/**操作名称 如 <a oname="恢复用户">恢复</a>*/
		if(typeof(oname)=="undefined"){
			oname="操作"
		}   
	    var defaults = {    
		    url: "",
		    paramName: "ids", /**服务器端接收的参数名称，table 列中checkbox的namen属性，默认为ids*/
		    chooseMsg: $.i18n("handleChooseMsg").replace('操作',oname),
			confrimMsg:$.i18n("handleConfrimMsg").replace('操作',oname),
			successMsg: $.i18n("handleSuccessMsg").replace('操作',oname),
			failMsg:  $.i18n("handleFailMsg").replace('操作',oname),
			onComplete:null   /**响应完成后的回调函数*/
		};     
		var opts = $.extend(defaults, options); 
		return this.click(function() { 
			if(opts.url==""){
				alert($.i18n("handleNoUrl").replace('操作',oname));
				return;
			}
			var param = "";//参数
			var paramName = $(this).attr("paramName");//参数名
			var deleteSize=0;//删除的记录条数
			if(typeof(paramName)=="undefined" || paramName==""){
				paramName = opts.paramName;
			}
			if($("input[name='"+paramName+"']").size()==0){
				alert($.i18n("handleNoUrl").replace('操作',oname)+paramName);
				return;
			}else{
				$("input[name='"+paramName+"']:checked").each(function(){
					param+=","+$(this).val();
					deleteSize++;
				});
				param = param.substring(1);
			}
			if(param==""){
				alert(opts.chooseMsg);
				return;
			}
			ajaxPost(opts.url,"table",paramName+"="+param,deleteSize,opts.chooseMsg,opts.confrimMsg,opts.successMsg,opts.failMsg,opts.onComplete,param);
	    });  

	};     

	$.fn.validateForm = function(options) {
		return validateInput($(this));
	};
	//-----------------------------------------以下是私有方法-----------------------------------------------------
	/*  form 校验
		1、	rules="[
			    {notNull:true, message:'姓名不能为空'},
			    {isNumber:true, message:'只能是数字'},
			    {isDigit:true, message:'只能是整数'},
				{isEmail:true,message:'电子邮件格式不正确'},
				{minLength:6,message:'帐号长度至少为6'},
				{maxLength:6,message:'帐号长度最多为6'},
				{minValue:0,message:'年龄最小值为0'},
				{maxValue:100,message:'年龄最大值为100'},
				{equalWith:'newPassword',message:'确认密码需等于新密码'},
				{greaterThan:'startDate',message:'结束日期需大于开始日期'},
				{lessThan:'endDate',message:'开始日期需小于结束日期'},
				{notGreaterThan:'endDate',message:'开始日期需不大于结束日期'},
				{notLessThan:'startDate',message:'结束日期需不小于开始日期'},
				{regExp:/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,message:'自定义正在表达式验证'},
			]"
		2、如果是radio和checkbox，请创建一个hidden域，动态赋值再校验
		3、需校验的text、password、hidden、textarea、radio、checkbox，加上id属性
	*/
	function validateForm(formId){
		//是否验证通过
		 var valide = true;
	     $("#"+formId).find(":input[type='text'],:input[type='password'],:input[type='hidden'],:input[type='file'],select,textarea").each(function(){
	    	 if(!validateInput($(this))){
	    		 valide=false;
	    	 }
		  });
	     if(valide){
	    	 $(":button,:submit,:reset").attr("disabled","disabled");
	     }
		 return valide;
	}

	function validateInput(e){
		var val = $(e).val();
			var isDisabled = $(e).attr("disabled");
			//验证规则
			var rules = $(e).attr("rules");
			
			if(rules!="undefined" && typeof(rules)!="undefined" && !isDisabled){
				//alert(val+"  "+rules);
				//转化成json
				rules = (new Function("return " + rules))();
				if(rules!=null){
					var labelId = $(e).attr("id");
					if(typeof(labelId)=="undefined"){labelId = $(e).attr("name");}
					if($("label[for='"+labelId+"']").size()==0){
						$(e).after("<label for='"+labelId+"' style=\"color: red\"></label>");
					}
					$("label[for='"+labelId+"']").html("");
						for(var i = 0; i < rules.length; i++) {
							var rule = rules[i];
							if(rule.notNull) {
								if(/^\s*$/i.test(val)) {//非空
									if(typeof(rule.message)!="undefined"){
										$("label[for='"+labelId+"']").html("").html("&nbsp;&nbsp;"+rule.message);
									}
									return false;
								}else{
									$("label[for='"+labelId+"']").html("");
								}
							}else if(rule.isNumber) {//只能是浮点数
								if(!$.isNumber(val) && val!="") {
									$("label[for='"+labelId+"']").html("").html("&nbsp;&nbsp;"+rule.message);
									return false;
								}else{
									$("label[for='"+labelId+"']").html("");
								}
							} else if(rule.isDigit) {//只能是整数
								if(!$.isDigit(val) && val!="") {
									$("label[for='"+labelId+"']").html("").html("&nbsp;&nbsp;"+rule.message);
									return false;
								}else{
									$("label[for='"+labelId+"']").html("");
								}
							}  else if(rule.isEmail) {//email
								if(!$.isEmail(val) && val!="") {
									$("label[for='"+labelId+"']").html("").html("&nbsp;&nbsp;"+rule.message);
									return false;
								}else{
									$("label[for='"+labelId+"']").html("");
								}
							} else if(rule.minLength) {//最小长度
								if((val.length < rule.minLength) && val!="") {
									$("label[for='"+labelId+"']").html("").html("&nbsp;&nbsp;"+rule.message);
									return false;
							    }else{
									$("label[for='"+labelId+"']").html("");
								}
							} else if(rule.maxLength) {//最大长度
								if((val.length > rule.maxLength)&& val!="") {
									$("label[for='"+labelId+"']").html("").html("&nbsp;&nbsp;"+rule.message);
									return false;
								}else{
									$("label[for='"+labelId+"']").html("");
								}
							} else if(rule.minValue != undefined) {//最小值
								var test = parseFloat(val.replace(/,/g,""));
								if((!isNaN(test) && test < rule.minValue) && val!="") {
									$("label[for='"+labelId+"']").html("").html("&nbsp;&nbsp;"+rule.message);
									return false;
							    }else{
									$("label[for='"+labelId+"']").html("");
								}
							} else if(rule.maxValue != undefined) {//最大值
								var test = parseFloat(val.replace(/,/g,""));
								if((!isNaN(test) && test > rule.maxValue) && val!="") {
									$("label[for='"+labelId+"']").html("").html("&nbsp;&nbsp;"+rule.message);
									return false;
								}else{
									$("label[for='"+labelId+"']").html("");
								}
							}
							 else if(rule.equalWith) {
									var compareNode = rule.equalWith;
									if(compareNode!="" && val != $("#"+compareNode).val()) {
										$("label[for='"+labelId+"']").html("").html("&nbsp;&nbsp;"+rule.message);
										return false;
									}else{
										$("label[for='"+labelId+"']").html("");
									}
							} 
							 else if(rule.greaterThan) {
									var compareNode = rule.greaterThan;
									if(!/^\s*$/i.test(val) && compareNode!="" && val <= $("#"+compareNode).val()) {
										$("label[for='"+labelId+"']").html("").html("&nbsp;&nbsp;"+rule.message);
										return false;
									}else{
										$("label[for='"+labelId+"']").html("");
									}
							} 
							 else if(rule.lessThan) {
									var compareNode = rule.lessThan;
									if(!/^\s*$/i.test(val) && compareNode!="" && val >= $("#"+compareNode).val()) {
										$("label[for='"+labelId+"']").html("").html("&nbsp;&nbsp;"+rule.message);
										return false;
									}else{
										$("label[for='"+labelId+"']").html("");
									}
							} 
							 else if(rule.notGreaterThan) {
									var compareNode = rule.notGreaterThan;
									if(!/^\s*$/i.test(val) && compareNode!="" && val > $("#"+compareNode).val()) {
										$("label[for='"+labelId+"']").html("").html("&nbsp;&nbsp;"+rule.message);
										return false;
									}else{
										$("label[for='"+labelId+"']").html("");
									}
							} 
							 else if(!/^\s*$/i.test(val) && rule.notLessThan) {
									var compareNode = rule.notLessThan;
									if(compareNode!="" && val < $("#"+compareNode).val()) {
										$("label[for='"+labelId+"']").html("").html("&nbsp;&nbsp;"+rule.message);
										return false;
									}else{
										$("label[for='"+labelId+"']").html("");
									}
							} 
							else if(rule.regExp) {//自定义正则表达式
								if(!rule.regExp.test(val) && val!="") {
									$("label[for='"+labelId+"']").html("").html("&nbsp;&nbsp;"+rule.message);
									return false;
								}else{
									$("label[for='"+labelId+"']").html("");
								}
							} else if(rule.fn) {
								if(!rule.fn.call(e, val)) {
									$("label[for='"+labelId+"']").html("").html("&nbsp;&nbsp;"+rule.message);
									return false;
								}else{
									$("label[for='"+labelId+"']").html("");
								}
							}
						}
				   }
			}
			return true;
	}
	//私有function，ajax 删除数据
    function ajaxDelete(deleteUrl,dtype,param,deleteSize,chooseMsg,confrimMsg,successMsg,failMsg,onComplete,ids){
		if(confirm(confrimMsg)){
				$.ajax({
					url: deleteUrl+"?"+param,
					type: 'GET',
					error: function(){
						alert(failMsg);
					},
					success: function(data){
						//data = $.parseJSON(data);
						if(typeof(data) != "object"){
							data = $.parseJSON(data);
						}
						//不存在msg时，当作异常处理
						if(data.msg==undefined){
							$("body").html(data);
							return;
						}
						//删除成功提示信息
						alert(data.msg);
						
						//修改总条数,删除改行tr
						if(typeof(dtype)!="undefined" && dtype=="table"){
								
							//ids=aa,bb,cc&dd=ww
							var paramArray = param.split("&");
							/*
							 var paramArray = param.split("=")[1];
							 var idsArray = paramArray.split(",");
							 for(var i=0;i<idsArray.length;i++){
								 $("#"+idsArray[i]).hide();
							 }
							*/
								 
							for(var i=0;i<paramArray.length;i++){
								var arr = paramArray[i];
								var arr3 = "";//参数名
								if(arr.indexOf(",")!=-1){//批量删除：ids=aa,bb,cc 要得到 ids=aa,ids=bb,ids=cc
									  var arr2 = arr.split(",");//ids=aa  bb  cc
									  for(var j=0;j<arr2.length;j++){
										  if(j==0){
											   arr3 = arr2[j].split("=")[0];//ids=aa,获得ids
											   $("a[param='"+arr2[j]+"']").parent("td").parent("tr").remove();
										   }else{//bb  cc
											   $("a[param='"+arr3+"="+arr2[j]+"']").parent("td").parent("tr").remove();
										   }
										}
								  }else{//只删除一个
										$("a[param='"+arr+"']").parent("td").parent("tr").remove();
								  }
								}
								$("#pageTotalRecords").text(parseInt($("#pageTotalRecords").text())-deleteSize);//deleteSize
								
								//回调函数
								if(onComplete!=null && $.isFunction(onComplete(ids))) {
									//onComplete();
								}
							}
					}
			    });
		    }
	}
	
	//私有function，ajax请求
    function ajaxPost(poftUrl,dtype,param,deleteSize,chooseMsg,confrimMsg,successMsg,failMsg,onComplete,ids){
		if(confirm(confrimMsg)){
				$.ajax({
					url: poftUrl+"?"+param,
					type: 'POST',
					error: function(){
						alert(failMsg);
					},
					success: function(data){
						//data = $.parseJSON(data);
						if(typeof(data) != "object"){
							data = $.parseJSON(data);
						}
						//不存在msg时，当作异常处理
						if(data.msg==undefined){
							$("body").html(data);
							return;
						}
						//删除成功提示信息
						alert(data.msg);
						
						//修改总条数,删除改行tr
						if(typeof(dtype)!="undefined" && dtype=="table"){
								
							//ids=aa,bb,cc&dd=ww
							var paramArray = param.split("&");
							/*
							 var paramArray = param.split("=")[1];
							 var idsArray = paramArray.split(",");
							 for(var i=0;i<idsArray.length;i++){
								 $("#"+idsArray[i]).hide();
							 }
							*/
								 
							for(var i=0;i<paramArray.length;i++){
								var arr = paramArray[i];
								var arr3 = "";//参数名
								if(arr.indexOf(",")!=-1){//批量删除：ids=aa,bb,cc 要得到 ids=aa,ids=bb,ids=cc
									  var arr2 = arr.split(",");//ids=aa  bb  cc
									  for(var j=0;j<arr2.length;j++){
										  if(j==0){
											   arr3 = arr2[j].split("=")[0];//ids=aa,获得ids
											   $("a[param='"+arr2[j]+"']").parent("td").parent("tr").remove();
										   }else{//bb  cc
											   $("a[param='"+arr3+"="+arr2[j]+"']").parent("td").parent("tr").remove();
										   }
										}
								  }else{//只删除一个
										$("a[param='"+arr+"']").parent("td").parent("tr").remove();
								  }
								}
								$("#pageTotalRecords").text(parseInt($("#pageTotalRecords").text())-deleteSize);//deleteSize
								
								//回调函数
								if(onComplete!=null && $.isFunction(onComplete(ids))) {
									//onComplete();
								}
							}
					}
			    });
		    }
	}
})(jQuery); 

String.prototype.trim=function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim=function(){
	return this.replace(/(^\s*)/g,"");
}
String.prototype.rtrim=function(){
	return this.replace(/(\s*$)/g,"");
}

// 更新当前菜单待办事项数目
function refreshCurrentCount(){
	var $iframe = $(window.parent.document).find("#menuIframe");
	if($iframe.length > 0){
		$iframe[0].contentWindow.refreshCount();
	}
}
function getSearchData(form){
	return $(form).serialize();
}