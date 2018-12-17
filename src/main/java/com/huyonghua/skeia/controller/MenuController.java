package com.huyonghua.skeia.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.huyonghua.skeia.entity.Menu;
import com.huyonghua.skeia.entity.User;
import com.huyonghua.skeia.service.IMenuService;

@Controller
@RequestMapping("/menu")
public class MenuController {
	private static Logger logger = LoggerFactory.getLogger(MenuController.class);
	
	@Resource
	private IMenuService menuService;
	
	/**
	 * 获取主菜单
	 */
	@RequestMapping("/user_menu")
	@ResponseBody
	public Map<String, Object> queryMainMenu(HttpServletRequest request){
		User user = (User) SecurityUtils.getSubject().getSession().getAttribute("skeia_user");
		logger.info("获取用户菜单，用户ID：{}", user.getUserId());
		
		Map<String, Object> data = new HashMap<>();
		List<Menu> menuList = menuService.queryUserMenu(user.getUserId());
		data.put("menuList", menuList);
		return data;
	}
	
	/**
	 * 左边菜单接口
	 */
	@RequestMapping(value="/menu_left/{menuId}", method=RequestMethod.GET)
	public String queryLeftMenu(@PathVariable("menuId") String menuId, Model model){
		model.addAttribute("menuId", menuId);
		return "menu_left";
	}
	
}
