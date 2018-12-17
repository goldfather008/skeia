/**
 * 刷新ztree
 */
function refreshTree(id,name){
	var zTree = $.fn.zTree.getZTreeObj("tree");
	var node = zTree.getNodeByParam("id", id, null);
	node.name=name;			  
	zTree.updateNode(node);
}
/**
 * 给ztree添加一个节点
 */
function addNode(iframeId,parentId,id,name,url){
 	var zTree = $.fn.zTree.getZTreeObj("tree");
	var parentNode = zTree.getNodeByParam("id", parentId, null);
	var click="javascript:$.loadIframe('"+iframeId+"','"+url+"')";
	
	var newNode = {pId:parentId,id:id,name:name,click:click,open:true};
	
	zTree.addNodes(parentNode, newNode);
}
/**
 * 删除ztree节点
 */
function removeNodes(ids){
	var zTree = $.fn.zTree.getZTreeObj("tree");
	if(ids.indexOf(",")>-1){
		var idsarray = ids.split(",");
		for (var i=0;idsarray.length;i++) {
			if(typeof(idsarray[i])!="undefined"){
				var node = zTree.getNodeByParam("id",$.trim(idsarray[i]+""), null);
			    zTree.removeNode(node);
			}else{
				break;
			}
		}
	}else{
		var node = zTree.getNodeByParam("id", ids, null);
		zTree.removeNode(node);
	}
}

//=================以下js用于部门和角色=========================================
checkSetting = {
		check: {
			enable: true,
			chkboxType: {"Y":"", "N":""}
		},
		view: {
			dblClickExpand: false
		},
		data: {
			simpleData: {
			  enable: true
			}
		},
		callback: {
			beforeClick: beforeClick,
			onCheck: onCheck
		}
};
radioSetting = {
		check: {
			enable: true,
			chkStyle: "radio",
			radioType: "all"
		},
		view: {
			dblClickExpand: false
		},
		data: {
			simpleData: {
			  enable: true
	     	}
		},
		callback: {
			onClick: onClick,
			onCheck: onCheck
		}
};
function beforeClick(treeId, treeNode) {
		var zTree = $.fn.zTree.getZTreeObj(treeId);
		zTree.checkNode(treeNode, !treeNode.checked, null, true);
		return false;
}
	
function onClick(e, treeId, treeNode) {
		var zTree = $.fn.zTree.getZTreeObj(treeId);
		zTree.checkNode(treeNode, !treeNode.checked, null, true);
		return false;
}

function onCheck(e, treeId, treeNode) {
		var zTree = $.fn.zTree.getZTreeObj(treeId),
		nodes = zTree.getCheckedNodes(true);
		if(treeId=='deptTree'){
			var deptName = "",deptId = "";
			for (var i=0, l=nodes.length; i<l; i++) {
				deptName += nodes[i].name + ",";
				deptId += nodes[i].id + ",";
			}
			if (deptName.length > 0 ) deptName = deptName.substring(0, deptName.length-1);
			if (deptId.length > 0 ) deptId = deptId.substring(0, deptId.length-1);
			$("#deptName").val(deptName);
			$("#deptId").val(deptId);
		}else if(treeId=='roleTree'){
			var roleNames = "",roleIds = "";
			for (var i=0, l=nodes.length; i<l; i++) {
				roleNames += nodes[i].name + ",";
				roleIds += nodes[i].id + ",";
			}
			if (roleNames.length > 0 ) roleNames = roleNames.substring(0, roleNames.length-1);
			if (roleIds.length > 0 ) roleIds = roleIds.substring(0, roleIds.length-1);
			$("#roleNames").val(roleNames);
			$("#roleIds").val(roleIds);
		}else if(treeId=='userTree'){
			var userNames = "",userIds = "";
			for (var i=0, l=nodes.length; i<l; i++) {
				userNames += nodes[i].name + ",";
				userIds += nodes[i].id + ",";
			}
			if (userNames.length > 0 ) userNames = userNames.substring(0, userNames.length-1);
			if (userIds.length > 0 ) userIds = userIds.substring(0, userIds.length-1);
			$("#userNames").val(userNames);
			$("#userIds").val(userIds);
		}
}

function showTreeList(treeId) {

	if(treeId=='deptTree'){
		$("label[for='deptName']").html("");
		var deptO = $("#deptName");
		var deptOffset = $("#deptName").offset();
		$("#menuContentDeptTree").css({left:deptOffset.left + "px", top:deptOffset.top + deptO.outerHeight() + "px"}).slideDown("fast");

		$("body").bind("mousedown", onBodyDownDept);
		
	}else if(treeId=='roleTree'){
		$("label[for='roleNames']").html("");
		var roleO = $("#roleNames");
		var roleOffset = $("#roleNames").offset();
		$("#menuContentRoleTree").css({left:roleOffset.left + "px", top:roleOffset.top + roleO.outerHeight() + "px"}).slideDown("fast");

		$("body").bind("mousedown", onBodyDownRole);
	}else if(treeId=='userTree'){
		$("label[for='userNames']").html("");
		var userO = $("#userNames");
		var userOffset = $("#userNames").offset();
		$("#menuContentUserTree").css({left:userOffset.left + "px", top:userOffset.top + userO.outerHeight() + "px"}).slideDown("fast");

		$("body").bind("mousedown", onBodyDownUser);
	}
}

function hideMenuUser() {
	$("#menuContentUserTree").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDownUser);
}
function onBodyDownUser(event) {
   if (!(event.target.id == "menuBtnUser" || event.target.id == "menuContentUserTree" || $(event.target).parents("#menuContentUserTree").length>0)) {
		hideMenuUser();
   }
}


function hideMenuRole() {
		$("#menuContentRoleTree").fadeOut("fast");
		$("body").unbind("mousedown", onBodyDownRole);
}
function onBodyDownRole(event) {
	   if (!(event.target.id == "menuBtnRole" || event.target.id == "menuContentRoleTree" || $(event.target).parents("#menuContentRoleTree").length>0)) {
			hideMenuRole();
	   }
}

function hideMenuDept() {
		$("#menuContentDeptTree").fadeOut("fast");
		$("body").unbind("mousedown", onBodyDownDept);
}
function onBodyDownDept(event) {
	   if (!(event.target.id == "menuBtnDept" || event.target.id == "menuContentDeptTree" || $(event.target).parents("#menuContentDeptTree").length>0)) {
			hideMenuDept();
	   }
}
/**
 * 展示数的下拉菜单
 * showDivId：要展示下拉树的div的ID.
 * clickId:点击触发树展示的ID。
 */
function showDiyMenu(showDivId,clickId) {
	var cityObj = $("#"+clickId);
	var cityOffset = $("#"+clickId).offset();
	if(cityObj.attr("type")!="text"){
		$("#"+showDivId).css({left:cityOffset.left +cityObj.outerWidth()+ "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");
	}else{
		$("#"+showDivId).css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");
	}
	$("body").bind("mousedown",{showDivId:showDivId,clickId:clickId}, onDiyBodyDown);
	
}
/**
 * 隐藏树的下拉菜单
 * showDivId：要展示下拉树的div的ID.
 * clickId:点击触发树展示的ID。
 */
function hideDiyMenu(showDivId,clickId) {
	$("#"+showDivId).fadeOut("fast");
	$("body").unbind("mousedown",{showDivId:showDivId,clickId:clickId}, onDiyBodyDown);
	
}
/**
 * 绑定body事件
 */
function onDiyBodyDown(event) {
	if (!(event.target.id == "menuBtn" || event.target.id ==event.data.showDivId || $(event.target).parents("#"+event.data.showDivId).length>0)) {
		hideDiyMenu(event.data.showDivId,event.data.clickId);
		
	}
}

/**
 * 
 * @param e event 对象获取触发对象，可以为空 如果treeId 为空则不可为空 
 * @param treeId 树的ID,可以为空 ， 如果e 为空 则不可为空 可用于初始化树的选择事件 onDiyCheck(null,"treeDemo",null);
 * @param treeNode 树节点对象
 * 树ul 中需设置
 *  inputId="要返回树节点id的对象id:分隔符（默认为,）" 
 *  inputName="要返回树节点name的对象id:分隔符（默认为,）" 
 *  inputOther="要显示树节点name的对象id（以内容的方式）:分隔符:显示父节点的内容（共显示多少级父节点）" 
 *  例如：inputId="uids:," inputName="unames:," inputOther="uNamesDiv:<br>:1"
 */

function onDiyCheck(e, treeId, treeNode) {
	var zTree;
	var treeUl;
	if(e!=null){
		zTree = $.fn.zTree.getZTreeObj(e.target.id);
		treeUl = e.target
	}else{
		zTree = $.fn.zTree.getZTreeObj(treeId );
		treeUl = $("#"+treeId);
		
		
	}
	
	var nodes = zTree.getCheckedNodes(true),
	k="",v="",o="";
	for (var i=0, l=nodes.length; i<l; i++) {
		k += nodes[i].id + ",";
		v += nodes[i].name + ",";
		var tLevel=0;
		if(typeof($(treeUl).attr("inputOther"))!="undefined"&& $(treeUl).attr("inputOther")!=""){
			var tValues = $(treeUl).attr("inputOther").split(":");
			tLevel = tValues[2];
		}
		var po="";
		if(typeof(tLevel)!="undefined"&& tLevel!=""){
			
			
			var pnote = nodes[i];
			for(var j=0;j<tLevel;j++){
				pnote = pnote.getParentNode();
				if(typeof(pnote)!="undefined"&& pnote!=null){
					po = pnote.name + "-" + po;
				}else{
					break ;
				}
			}
			
		}
		
		o += po+nodes[i].name+",";
		
	
	}
	
	if (k.length > 0 ) k = k.substring(0, k.length-1);
	if (v.length > 0 ) v = v.substring(0, v.length-1);
	if (o.length > 0 ) o = o.substring(0, o.length-1);
	
	if(typeof($(treeUl).attr("inputId"))!="undefined"&& $(treeUl).attr("inputId")!=""){
		var tValues = $(treeUl).attr("inputId").split(":");
		var tId = tValues[0];
		var tSplit = "";
		if(tValues.length>1){
			tSplit = tValues[1];
		}
		k=k.replace(new RegExp(",","gm"), tSplit);
		$("#"+tId).val(k);
	}
	if(typeof($(treeUl).attr("inputName"))!="undefined"&& $(treeUl).attr("inputName")!=""){
		var tValues = $(treeUl).attr("inputName").split(":");
		var tId = tValues[0];
		var tSplit = "";
		if(tValues.length>1){
			tSplit = tValues[1];
		}
		v=v.replace(new RegExp(",","gm"), tSplit);
		$("#"+tId).val(v);
	}
	if(typeof($(treeUl).attr("inputOther"))!="undefined"&& $(treeUl).attr("inputOther")!=""){
		var tValues = $(treeUl).attr("inputOther").split(":");
		var tId = tValues[0];
		var tSplit = "";
		if(tValues.length>1){
			tSplit = tValues[1];
		}
		o=o.replace(new RegExp(",","gm"), tSplit);
		$("#"+tId).html(o);
	}
	
	
	
}



		