package com.huyonghua.skeia.dao;

import java.util.List;

import javax.annotation.Resource;

import org.junit.Test;

import com.huyonghua.skeia.entity.Menu;
import com.huyonghua.skeia.entity.Permis;
import com.huyonghua.skeia.mapper.PermisMapper;
import com.huyonghua.skeia.service.impl.MenuService;


public class MenuServiceTest extends TestBase{
	
	@Resource
	private MenuService menuService;
	
	@Test
	public void testQueryUserMenu() {
		try {
			List<Menu> userMenu = menuService.queryUserMenu(1);
			System.out.println(userMenu);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

	}

}
