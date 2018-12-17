package com.huyonghua.skeia.service;

import java.util.List;

import com.huyonghua.skeia.entity.Menu;
/**
 * 获取菜单接口
 * @author win10
 *
 */

public interface IMenuService {
    int deleteByPrimaryKey(Integer menuId);

    int insert(Menu record);

    Menu selectByPrimaryKey(Integer menuId);
    
    List<Menu> queryUserMenu(Integer userId);
    
    List<Menu> selectAll();

    int updateByPrimaryKeySelective(Menu record);
}
