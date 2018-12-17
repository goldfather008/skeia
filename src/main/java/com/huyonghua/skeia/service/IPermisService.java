package com.huyonghua.skeia.service;

import java.util.List;

import com.huyonghua.skeia.entity.Permis;


public interface IPermisService {
	int deleteByPrimaryKey(Integer permisId);

	int insert(Permis record);

	Permis selectByPrimaryKey(Integer permisId);

	/**
	 * 按用户ID查询用户权限
	 * 
	 * @param userId
	 * @return
	 */
	List<Permis> selectByUserId(Integer userId);

	List<Permis> selectAll();

	int updateByPrimaryKeySelective(Permis record);	
}
