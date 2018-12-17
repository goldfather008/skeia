package com.huyonghua.skeia.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.huyonghua.skeia.entity.Menu;
import com.huyonghua.skeia.mapper.MenuMapper;
import com.huyonghua.skeia.service.IMenuService;

@Service
public class MenuService implements IMenuService{

	private static final Logger logger = LoggerFactory.getLogger(MenuService.class);
	
	@Resource
	private MenuMapper menuMapper;
	
	@Override
	public int deleteByPrimaryKey(Integer menuId) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insert(Menu record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Menu selectByPrimaryKey(Integer menuId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Menu> queryUserMenu(Integer userId) {
		// TODO Auto-generated method stub
		logger.info("查询用户菜单，userId{}", userId);
		return menuMapper.queryUserMenu(userId);
	}

	@Override
	public List<Menu> selectAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int updateByPrimaryKeySelective(Menu record) {
		// TODO Auto-generated method stub
		return 0;
	}

}
