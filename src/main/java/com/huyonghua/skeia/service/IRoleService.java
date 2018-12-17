package com.huyonghua.skeia.service;

import java.util.List;

import com.huyonghua.skeia.entity.Role;


public interface IRoleService {
    int deleteByPrimaryKey(Integer roleId);

    int insert(Role record);

    Role selectByPrimaryKey(Integer roleId);
    
    /**
     * 根据用户ID查询用户角色列表
     * @param userId
     * @return
     */
    List<Role> selectByUserId(Integer userId);
    
    List<Role> selectAll();

    int updateByPrimaryKeySelective(Role record);
}
