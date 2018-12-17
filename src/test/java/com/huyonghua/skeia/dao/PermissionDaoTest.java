package com.huyonghua.skeia.dao;

import javax.annotation.Resource;

import org.junit.Test;

import com.huyonghua.skeia.entity.Permis;
import com.huyonghua.skeia.mapper.PermisMapper;


public class PermissionDaoTest extends TestBase{
	
	@Resource
	private PermisMapper permissionMapper;
	
	@Test
	public void testSelectById() {
		try {
			Permis permission = permissionMapper.selectByPrimaryKey(1);
			System.out.println(permission);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

	}

}
