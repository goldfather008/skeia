package com.huyonghua.skeia.entity;

import java.io.Serializable;
import java.sql.Date;

public class Menu implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Integer menuId;
	private Integer parentId;
	private Integer menuLevel;
	private String menuText;
	private String url;
	private Integer permisId;
	private Integer enableFlag;
	private Integer menuOrder;
	private Date createTime;
	private Date updateTime;
	public Integer getMenuId() {
		return menuId;
	}
	public void setMenuId(Integer menuId) {
		this.menuId = menuId;
	}
	public Integer getParentId() {
		return parentId;
	}
	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}
	public String getMenuText() {
		return menuText;
	}
	public void setMenuText(String menuText) {
		this.menuText = menuText;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Integer getPermisId() {
		return permisId;
	}
	public void setPermisId(Integer permisId) {
		this.permisId = permisId;
	}
	public Integer getEnableFlag() {
		return enableFlag;
	}
	public void setEnableFlag(Integer enableFlag) {
		this.enableFlag = enableFlag;
	}
	public Integer getMenuLevel() {
		return menuLevel;
	}
	public void setMenuLevel(Integer menuLevel) {
		this.menuLevel = menuLevel;
	}
	public Integer getMenuOrder() {
		return menuOrder;
	}
	public void setMenuOder(Integer menuOrder) {
		this.menuOrder = menuOrder;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	@Override
	public String toString() {
		return "Menu [menuId=" + menuId + ", parentId=" + parentId + ", menuText=" + menuText + ", url=" + url
				+ ", permisId=" + permisId + ", enableFlag=" + enableFlag + ", menuOrder=" + menuOrder + ", createTime="
				+ createTime + ", updateTime=" + updateTime + "]";
	}


}
