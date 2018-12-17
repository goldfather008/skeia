package com.huyonghua.skeia.dao;

import javax.annotation.Resource;

import org.junit.Test;

import com.huyonghua.skeia.entity.User;
import com.huyonghua.skeia.mapper.UserMapper;

public class UserDaoTest extends TestBase{
	
	@Resource
	private UserMapper userMapper;
	
	@Test
	public void testSelectById() {
		try {
			User user = userMapper.selectByPrimaryKey(1);
			System.out.println(user);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

	}

}
