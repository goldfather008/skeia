/**
 * 自定义一级菜单效果
 */
$(function(){
	var menu_a = $('#self_menu ul li a');
	menu_a.click(function(){
		$(this).parent("li").addClass('current_li').siblings('li').removeClass('current_li');
	});
});