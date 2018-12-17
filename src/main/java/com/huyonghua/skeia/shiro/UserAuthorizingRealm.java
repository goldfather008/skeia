package com.huyonghua.skeia.shiro;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.collections.CollectionUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huyonghua.skeia.entity.Permis;
import com.huyonghua.skeia.entity.Role;
import com.huyonghua.skeia.entity.User;
import com.huyonghua.skeia.service.IPermisService;
import com.huyonghua.skeia.service.IRoleService;
import com.huyonghua.skeia.service.IUserService;

/**
 * 自定义认证、授权
 * @author win10
 *
 */
public class UserAuthorizingRealm extends AuthorizingRealm{
	
	private static Logger logger = LoggerFactory.getLogger(UserAuthorizingRealm.class);

	@Resource
	private IUserService userService;
	@Resource
	private IRoleService roleService;
	@Resource
	private IPermisService permisService;
	
	private static final String USER_SESSION_KEY = "skeia_user";
	
	/**
	 * 授权查询回调函数, 进行鉴权但缓存中无用户的授权信息时调用.
	 * 比如遇到@RequiresPermissions注解时，会调用
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		// TODO Auto-generated method stub
		// 获取登录是输入的用户名
		Session session = SecurityUtils.getSubject().getSession();
		User user = (User) session.getAttribute(USER_SESSION_KEY);
		
		// 权限信息对象，用来存放查出的用户的所有的角色（role）及权限（permission）等
		SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
		if (null != user) {
			authorizationInfo.setRoles(this.getUserRoles(user.getUserId()));
			authorizationInfo.setStringPermissions(this.getUserPermissions(user.getUserId()));
		}

		return authorizationInfo;
	}
	
	/**
	 * 认证回调函数,登录时调用
	 */	

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		// TODO Auto-generated method stub
		logger.info("认证回调函数");

		UsernamePasswordToken authcToken = (UsernamePasswordToken) token;
		User user = null;
		try {
			// 通过用户名查找用户
			user = userService.selectByUserName(authcToken.getUsername());
		} catch (Exception e) {
			logger.error("身份认证发生异常", e);
			throw new AuthenticationException("身份认证发生异常");
		}

		if (null == user) {
			logger.warn("身份认证失败，登录名不存在");
			throw new UnknownAccountException("身份认证失败，登录名不存在");
		}
		
		if (1 != user.getStatus()) {
			logger.warn("身份认证失败，用户已被禁用");
			throw new LockedAccountException("身份认证失败，用户已被禁用");
		}

		// 密码验证
		if (!user.getPassword().equals(String.valueOf(authcToken.getPassword()))) {
			logger.warn("身份认证失败，登录密码不正确");
			throw new IncorrectCredentialsException("身份认证失败，登录密码不正确");
		}

		Session session = SecurityUtils.getSubject().getSession();
		session.setAttribute(USER_SESSION_KEY, user);

		return new SimpleAuthenticationInfo(authcToken.getUsername(), authcToken.getPassword(), getName());
	}
	
	///////////////////////////////////////// private////////////////////////////////////
	/**
	 * 获取用户角色
	 * 
	 * @param userId
	 * @return
	 */
	private Set<String> getUserRoles(Integer userId) {
		List<Role> roleList = roleService.selectByUserId(userId);

		Set<String> roles = new HashSet<>();
		if (CollectionUtils.isEmpty(roleList)) {
			return roles;
		}

		for (Role or : roleList) {
			roles.add(or.getRoleCode());
		}

		return roles;
	}

	/**
	 * 获取用户权限
	 * 
	 * @param userId
	 * @return
	 */
	private Set<String> getUserPermissions(Integer userId) {
		List<Permis> permisList = permisService.selectByUserId(userId);
		Set<String> stringPermissions = new HashSet<>();
		if (CollectionUtils.isEmpty(permisList)) {
			return stringPermissions;
		}

		for (Permis op : permisList) {
			stringPermissions.add(op.getPermisCode());
		}

		return stringPermissions;
	}	

}
