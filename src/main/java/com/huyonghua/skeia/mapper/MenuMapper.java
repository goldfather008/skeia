package com.huyonghua.skeia.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.huyonghua.skeia.entity.Menu;

public interface MenuMapper {
    int deleteByPrimaryKey(Integer menuId);

    int insert(Menu record);

    int insertSelective(Menu record);

    Menu selectByPrimaryKey(Integer menuId);

    // 通过userId查找菜单
	List<Menu> queryUserMenu(@Param("userId") Integer userId);
	
    int updateByPrimaryKeySelective(Menu record);

    int updateByPrimaryKey(Menu record);
}