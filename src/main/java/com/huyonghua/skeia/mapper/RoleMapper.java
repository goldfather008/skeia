package com.huyonghua.skeia.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.huyonghua.skeia.entity.Role;

public interface RoleMapper {
    int deleteByPrimaryKey(Integer roleId);

    int insert(Role record);

    int insertSelective(Role record);
    
    List<Role> selectByUserId(@Param("userId") Integer userId);

    Role selectByPrimaryKey(Integer roleId);

    int updateByPrimaryKeySelective(Role record);

    int updateByPrimaryKey(Role record);
}