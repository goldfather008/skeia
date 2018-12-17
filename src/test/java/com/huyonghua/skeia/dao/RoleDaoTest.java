package com.huyonghua.skeia.dao;

import javax.annotation.Resource;

import org.junit.Test;

import com.huyonghua.skeia.entity.Role;
import com.huyonghua.skeia.entity.User;
import com.huyonghua.skeia.mapper.RoleMapper;
import com.huyonghua.skeia.mapper.UserMapper;

public class RoleDaoTest extends TestBase{
	
	@Resource
	private RoleMapper roleMapper;
	
	@Test
	public void testSelectById() {
		try {
			Role role = roleMapper.selectByPrimaryKey(1);
			System.out.println(role);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

	}

}
