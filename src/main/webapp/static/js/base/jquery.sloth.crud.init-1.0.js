/* *
 * 页面包含crud操作时，初始化就加载的js函数
 * By: yeshujun
 * Version : 1.0
*/
$(function() {
	//=============================新增修改页面js===========================================
	//清除验证信息
	$(":input[type='text'],:input[type='password'],select,textarea").clearValideMsg();
	
	//=============================列表页面js===============================================
	
	//table列表页面，checkbox全选或全部取消
	$(".ltable #checkId").toggleAllCheckbox({checkName: 'ids'});

	//奇数行加色
	$(".ltable tr:even").changeEvenTrColor();
	
	//删除数据，同时删除ztree节点
	if(typeof(deleteAndRemoveTreeNode)!="undefined" && deleteAndRemoveTreeNode){
		$(".deleteOne").deleteOne({
			url:deleteurl,
			onComplete:function(param){
			     parent.removeNodes(param);
			}
		});
		$("#batchDelete").batchDelete({
		    url:deleteurl,
		    onComplete:function(param){
				parent.removeNodes(param);
			}
		 });
	}else if(typeof(deleteurl)!="undefined"){//删除数据
		$(".deleteOne").deleteOne({url:deleteurl});
	    $("#batchDelete").batchDelete({url:deleteurl});
	}
});