package com.huyonghua.skeia.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.huyonghua.skeia.entity.Permis;

public interface PermisMapper {
    int deleteByPrimaryKey(Integer permisId);

    int insert(Permis record);

    int insertSelective(Permis record);
    
    List<Permis> selectByUserId(@Param("userId") Integer userId);

    Permis selectByPrimaryKey(Integer permisId);

    int updateByPrimaryKeySelective(Permis record);

    int updateByPrimaryKey(Permis record);
}