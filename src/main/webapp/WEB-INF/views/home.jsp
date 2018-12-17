<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<title>环评项目管理系统</title>
<head>
<%@include file="common.jsp" %>
    <!-- 导航菜单 -->
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/css/font-awesome-4.7.0/css/font-awesome.min.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/css/menu.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/css/self_layout.css"  media="screen" />
	<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/jquery/ddaccordion-2.0.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/base/initDdaccordion.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/base/self_layout.js"></script>
    <style type="text/css">
			a{cursor:pointer;}
		</style>
    <script type="text/javascript">
       
    	//var menuObj; // 菜单对象
	    $(function(){
			
	    	getUserMenu();
	    	
        });
    	
		function changeMenu(menuId) {
			//$("#menuIframe").attr("src", "/system/menu_left.do?id="+id );
			$("#menuIframe").attr("src", "${pageContext.request.contextPath }/menu/menu_left/" + menuId);
		}

    
	    //退出
	    function logout() {
	    	// 用var声明为局部变量
			var r = confirm("确定要退出？");
			if(r == true) {
				$.ajax({
					type:"POST",
					url:"logout",
					success: function () {
						window.location.href = "login";
					},
					error: function () {
						alert("请求发生错误");
					}
				});
			}
		}
	    
	    /**
	     * 获取用户菜单
	     */
	    function getUserMenu() {
	    	$.ajax({
	    		// 提交数据的类型 POST GET
	    		type : "POST",
	    		// 提交的网址
	    		url : "menu/user_menu",// 从HomeController.contentData方法获取数据
	    		// 提交的请求参数
	    		// data:{name:"sanmao", password:"sanmaoword"},
	    		// 返回数据的格式
	    		datatype : "json",// "xml", "html", "script", "json", "jsonp", "text".
	    		// 成功返回之后调用的函数
	    		success : function(data) {
	    			var result = jQuery.parseJSON(data);
	    			handleMenu(result.menuList);
	    	    	var load = $("#self_menu > ul:first").find("a").first();
	    	    	load.click(); //点击第一栏菜单
	    		},
	    		// 调用出错执行的函数
	    		error : function() {
	    			alert("请求出错处理");
	    		}
	    	});
	    }
	    
	    /**
	     * 输出一级菜单
	     * 
	     * @param menuList
	     */
	    function handleMenu(menuList) {
	    	var menuUl = "";

	    	for (var i = 0; i < menuList.length; i++) {
	    		if (menuList[i].menuLevel == 1) {
	    			//menuUl = "<li>" + menuList[i].menuText + "</li>";
		    		menuUl = "<li><a href='javascript:void(0)' onclick='changeMenu(" + menuList[i].menuId + ")'>" 
		    				+ menuList[i].menuText + "</a></li>";
		    		$("#menuUl").append(menuUl);
	    		}
	    	}
	    }
	    
   </script>
</head>

<body class="easyui-layout">
  
	<div data-options="region:'north',border:false" style="height:45px;padding-top:5px;background:#212831;overflow:hidden;"> 
	   

<div id="head">
	<form action="/system/layout_layout.do" method="post" id="changeRoleForm">
	   <input type="hidden" value="zh_CN" name="request_locale" id="request_locale"/>
	   <div style="float: left;margin-left: 10px">
		   欢迎您 ${currentUser }
		   <a style="color:#E0EEEE;" href="javascript:void(0)" onclick="logout()">退出</a>
		   
		</div>
	</form>
	<!--导航菜单-->
	<div id="self_menu">
		<ul id="menuUl">			
							 <!--  <li><a href="javascript:void(0)" onclick="changeMenu('待办事项')">待办事项</a></li>  -->
																
		</ul>
	</div>	
	<div class="self_menu_right">
		<img src="${pageContext.request.contextPath}/static/images/logo-icon.png">
		<span class="project-name">
		&nbsp;环评项目管理系统
		</span>
		<span class="version-number">
		&nbsp;[&nbsp;V1.3.0&nbsp;]
		</span>	
 	</div>

</div>
		 <div class="customer1" style="display: none"> 
			  <img id="headUpDown" border="0" src="${pageContext.request.contextPath}/static/images/up.png" alt="" />
		</div>
	</div>
	<!-- 左边菜单导航 -->
   <div data-options="region:'west',collapsible:false,split:true,title:'菜单导航'" style="width:230px;padding-top:0px;padding-right:5px">
		<iframe id="menuIframe" class="menu-iframe" frameborder="0" src="" width="100%" height="99%"></iframe>	
	</div>
	
    <div data-options="region:'center',title:''" id="deskTitle" style="padding-top:20px;"> 
		<iframe id="menuIframeId" name="menuIframeId" frameborder="0" src="" width="100%" height="99%"></iframe>
	 </div>
	 <div data-options="region:'south',border:true" id="divCopyright" class="bottom-copyright"> 
		河北环境评价科技有限公司&nbsp;&nbsp;
		技术支持： <a id="cc" href="http://www.itqingning.com" target="_blank">清宁智能科技石家庄有限公司</a>
	 </div>
	
 </body>
</html>