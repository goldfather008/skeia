package com.huyonghua.skeia.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.huyonghua.skeia.entity.User;
import com.huyonghua.skeia.mapper.UserMapper;
import com.huyonghua.skeia.service.IUserService;

@Service
public class UserService implements IUserService{
	private static final Logger logger = LoggerFactory.getLogger(UserService.class);
	
	@Resource
	private UserMapper userMapper;
	

	@Override
	public int deleteByPrimaryKey(Integer userId) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insert(User record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public User selectByPrimaryKey(Integer userId) {
		// TODO Auto-generated method stub
		logger.info("查询用户：{}", userId);
		return userMapper.selectByPrimaryKey(userId);
	}
	
	@Override
	public User selectByUserName(String userName) {
		// TODO Auto-generated method stub
		logger.info("通过用户名查询用户，用户userName：{}", userName);
		return userMapper.selectByUserName(userName);
	}

	@Override
	public int updateByPrimaryKeySelective(User record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<User> selectAll() {
		// TODO Auto-generated method stub
		return null;
	}

}
