package com.huyonghua.skeia.service;

import java.util.List;

import com.huyonghua.skeia.entity.User;

/**
 * 用户服务接口
 * @author win10
 *
 */
public interface IUserService {
	
	int deleteByPrimaryKey(Integer userId);

	int insert(User record);

	User selectByPrimaryKey(Integer userId);
	
	User selectByUserName(String userName);

	int updateByPrimaryKeySelective(User record);
	
	List<User> selectAll(); 
}
