package com.huyonghua.skeia.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.huyonghua.skeia.entity.Role;
import com.huyonghua.skeia.mapper.RoleMapper;
import com.huyonghua.skeia.service.IRoleService;

@Service
public class RoleService implements IRoleService{
	
	private static final Logger logger = LoggerFactory.getLogger(RoleService.class);

	@Resource
	private RoleMapper roleMapper;
	@Override
	public int deleteByPrimaryKey(Integer roleId) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insert(Role record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Role selectByPrimaryKey(Integer roleId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Role> selectByUserId(Integer userId) {
		// TODO Auto-generated method stub
		logger.info("根据用户ID，查询角色，用户ID：{}", userId);
		return roleMapper.selectByUserId(userId);
	}

	@Override
	public List<Role> selectAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int updateByPrimaryKeySelective(Role record) {
		// TODO Auto-generated method stub
		return 0;
	}

}
