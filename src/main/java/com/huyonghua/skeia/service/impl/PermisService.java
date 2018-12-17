package com.huyonghua.skeia.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.huyonghua.skeia.entity.Permis;
import com.huyonghua.skeia.mapper.PermisMapper;
import com.huyonghua.skeia.service.IPermisService;

@Service
public class PermisService implements IPermisService{
	private static final Logger logger = LoggerFactory.getLogger(PermisService.class);
	
	@Resource
	private PermisMapper permisMapper;

	@Override
	public int deleteByPrimaryKey(Integer permisId) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insert(Permis record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Permis selectByPrimaryKey(Integer permisId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Permis> selectByUserId(Integer userId) {
		logger.info("按用户ID查询用户权限，用户ID：{}", userId);
		return permisMapper.selectByUserId(userId);
	}

	@Override
	public List<Permis> selectAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int updateByPrimaryKeySelective(Permis record) {
		// TODO Auto-generated method stub
		return 0;
	}
	

}
