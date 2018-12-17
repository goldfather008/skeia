<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/static/css/login.css" />
<style type="text/css">
.login {
	position: relative;
}
</style>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/jquery/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/jquery/jquery.cookie.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/base/jquery.sloth.utils-1.0.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/base/security.js"></script>
<script type="text/javascript">
// 登录超时处理
// 账号在其他地方登录
// 记住我登录
        var ctx = "";
	    $(function() {	    	
	    	
	    	if($("#password").val()!=""){
	    		$("#password").show();
	    		$("#passwordTemp").hide();
	    	}
//focus()获得焦点事件
//blur()市区焦点事件
	    	$("#loginName,#passwordTemp,#password").focus(function(){$(".errtips").hide();$(this).addClass("focus");}).blur(function(){$(this).removeClass("focus");});
	    
	    	$("#loginName,#passwordTemp,#password").textRemindAuto();
	    	
	    	$("#passwordTemp").focus(function(){
	    		$(this).hide();
	    		$("#password").show().focus();
	    	});
	    	$("#password").blur(function(){
	    		if($(this).val()==""){
	    			$(this).hide();
	    		    $("#passwordTemp").show();
	    		}
	    	});

	    });
	    
	     function submitLogin(){
	          if($("#loginName").val()!="" && $("#loginName").val()!="请输入账号" && $("#password").val()!="" && $("#password").val()!="请输入密码"){
	    		$("#submitBtn").val("登录中...").removeClass("green").addClass("grey").attr("disabled","disabled");
				$("#loginForm").submit();
	        }
         }
</script>
</head>
<body style="background:#fff;">
	<div class="login">

		<div class="loginBg">

			<div id="title">
				<h1>环评项目管理系统</h1>
				<h2>EIA Project Management System</h2>
			</div>
			<div class="loginForm">
				<form id="loginForm" method="post" action="home">
					<table>
						<tr>
							<td>用&nbsp;户&nbsp;名:</td>
							<td colspan="2" class="txt-td"><input type="text"
								class="txt" id="loginName" name="loginName" value=""
								title="请输入账号" /><span></span></td>
							<td>&nbsp;</td>
						</tr>
						<tr>
							<td>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</td>
							<td colspan="2" class="txt-td"><input type="text"
								class="txt" id="passwordTemp" value="" title="请输入密码" /> <input
								type="password" style="display: none" class="txt" id="password"
								name="password" value=""
								onkeydown="if(event.keyCode==13||event.which==13)submitLogin();" />
							</td>
							<td>&nbsp;</td>
						</tr>
						<tr id="vcode">
						</tr>
						<tr>
							<td></td>
							<td colspan="2" class="txt-td"><label for="rememberMe"
								style="display:inline-block;padding-right:10px;"> <input
									id="rememberMe" name="rememberMe" type="checkbox" value="Y">
									一周内自动登录
							</label> <input type="button" class="button green" value="登录"
								id="submitBtn" onclick="submitLogin()"
								style="width: 120px;height: 38px;font-size: 18px" />
								<!-- <input type="submit" class="button green" value="登录" 
								style="width: 120px;height: 38px;font-size: 18px" /> --></td>
							<td>&nbsp;</td>
						</tr>
					</table>
					<span class="errtips" id="tips" >${errorMsg }</span>
				</form>
			</div>
		</div>

		<!-- 消息列表定位容器 -->
		<div class="msg-box">
			<!-- 循环消息部分 -->

		</div>
		<!-- /msg-box -->

	</div>

</body>
</html>
