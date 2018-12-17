package com.huyonghua.skeia.mapper;

import com.huyonghua.skeia.entity.RolePermis;

public interface RolePermisMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(RolePermis record);

    int insertSelective(RolePermis record);

    RolePermis selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(RolePermis record);

    int updateByPrimaryKey(RolePermis record);
}