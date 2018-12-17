<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@include file="common.jsp" %>
    <!-- 导航菜单 -->
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/css/menu.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/css/self_layout.css"  media="screen" />
    <style type="text/css">
    	.countspan{color:#fff; background-color:#f90; padding:0px 5px; border-radius:5px; font-size:10px; display:none; }
    </style>
    <script type="text/javascript">
	    var ctx = '';
	    $(function(){
	    	getLeftMenu();
	    	
	    	var load = $(".arrowlistmenu > ul:first").find("a").first();
	    	if(load.attr("onclick")==undefined){
	    		load = $(".arrowlistmenu > h3:first");
	    	}
	    	load.click();
		});
	    
	    function focusMenu(id){
			$('li').removeClass('ahover');
			$('#'+id).addClass('ahover');
		}
	    
	    function loadIframe(src){
	    	$(window.parent.document).find("#menuIframeId").attr("style","width:100%;height:99%;").attr("src",ctx+src);
	    }
	    
	    
	    /**
	     * 获取用户菜单
	     */
	    function getLeftMenu() {
	    	$.ajax({
	    		// 这里使用同步，先把页面元素拼凑好，在绑定事件，否则后面的插件可能绑定不成功
	    		async : false,
	    		// 提交数据的类型 POST GET
	    		type : "POST",
	    		// 提交的网址
	    		url : "${pageContext.request.contextPath}/menu/user_menu",// 从HomeController.contentData方法获取数据
	    		// 提交的请求参数
	    		// data:{name:"sanmao", password:"sanmaoword"},
	    		// 返回数据的格式
	    		datatype : "json",// "xml", "html", "script", "json", "jsonp", "text".
	    		// 成功返回之后调用的函数
	    		success : function(data) {
	    			console.log(data);
	    			var result = jQuery.parseJSON(data);
	    			handleMenu(result.menuList, "${menuId }");
	    		},
	    		// 调用出错执行的函数
	    		error : function() {
	    			alert("请求出错处理");
	    		}
	    	});
	    }
	    
	    /**
	     * 输出主菜单menuId下面的二、三级菜单
	     * 
	     * @param menuList
	     */
	    function handleMenu(menuList, menuId) {
	    	var menuLeft = "";

	    	for (var i = 0; i < menuList.length; i++) {
	    		if (menuList[i].menuLevel == 2 && menuList[i].parentId == menuId) {
	    			menuLeft = "<h3 class='menuheader expandable'><i></i>" + menuList[i].menuText 
	    				+ "&nbsp;<span class='countspan secondMenuCount'></span><b></b></h3>";
	    			menuLeft = menuLeft + "<ul class='categoryitems' style='border:0'>";
	    			for (var j = 0; j < menuList.length; j++) {
	    				if (menuList[j].menuLevel == 3 && menuList[j].parentId == menuList[i].menuId){
	    					//输出三级菜单
	    					menuLeft += "<li id=" + menuList[j].menuId + " class='self_li_file'><a style='cursor:pointer;' onclick='focusMenu("
	    						+ menuList[j].menuId + ");loadIframe()'><i></i>"
	    						+ menuList[j].menuText 
	    						+ "&nbsp;<span id='count_1' class='countspan thirdMenuCount'></span></a></li>";
	    				}
	    			}
	    			menuLeft += "</ul>";
	    			menuLeft += "<div class='leftmar'></div>";
	    			$(".arrowlistmenu").append(menuLeft);
	    		}
	    	}
	    }
	    
   </script>
	 <!--  插件后面在加载  -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/jquery/ddaccordion-2.0.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/base/initDdaccordion.js"></script>   
</head>

<body>
	<div class="arrowlistmenu">
		
		<!--  
		<h3 class="menuheader expandable">
			<i></i>
			项目承接
			&nbsp;<span class="countspan secondMenuCount">new</span>
			<b></b>
		</h3>			
			
			<ul class="categoryitems" style="border: 0">
				
					<li id="402881eb543b757001543bfe053b0001" class="self_li_file" countUrl="/project/personDistribute_getCount.do" ><a
						style="cursor: pointer;"
						onclick="focusMenu('402881eb543b757001543bfe053b0001');loadIframe('person_distribution_list.html')">
							<i></i> 
							人员分配
								
									<script type="text/javascript">
										$(function(){
											getCount("402881eb543b757001543bfe053b0001");
										});
									</script>
								
								&nbsp;<span id="count_402881eb543b757001543bfe053b0001" class="countspan thirdMenuCount"></span>
					</a></li>
						
				
			</ul>
			<div class="leftmar"></div>
		 -->
		
		
	</div>
</body>
</html>