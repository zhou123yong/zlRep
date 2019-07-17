/**
 * Description: 客户信息数据库实体/领域对象
 * Copyright:   Copyright (c)2016
 * Company:     江苏三六五网络股份有限公司
 *
 * @author: 江苏三六五网络股份有限公司
 * @version: 1.0
 * Create at:   2016-09-15 下午 15:36:13
 * <p>
 * Modification History:
 * Date         Author      Version     Description
 * ------------------------------------------------------------------
 * 2016-09-15   江苏三六五网络股份有限公司   1.0         Initial
 */
package com.ly.entity;

import javax.persistence.*;
import java.util.Date;

/**
 * @author jay
 */
@Entity
@Table(name = "customer")
public class CustomerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String phone;

    private String actSource;

    /**
     * 客户状态 一般 都是0 未约看 400电话过来的客户为99 未跟踪，我的客户列表不展示，已跟踪客户置为0，微信端已删除客户置为99,400已删除仍然展示在我的客户中
     */
    private int status;

    private String createSource;

    private Date createTime;

    private String buyIntention;

    private int managerId;

    private String managerName;

    private String cityCode;

    private String cityName;

    private int actSourceId;

    private int isDelete;

    private Date bindTime;

    private int isWaitCall;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getActSource() {
        return actSource;
    }

    public void setActSource(String actSource) {
        this.actSource = actSource;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getCreateSource() {
        return createSource;
    }

    public void setCreateSource(String createSource) {
        this.createSource = createSource;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getBuyIntention() {
        return buyIntention;
    }

    public void setBuyIntention(String buyIntention) {
        this.buyIntention = buyIntention;
    }

    public int getManagerId() {
        return managerId;
    }

    public void setManagerId(int managerId) {
        this.managerId = managerId;
    }

    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public String getCityCode() {
        return cityCode;
    }

    public void setCityCode(String cityCode) {
        this.cityCode = cityCode;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public int getActSourceId() {
        return actSourceId;
    }

    public void setActSourceId(int actSourceId) {
        this.actSourceId = actSourceId;
    }

    public int getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(int isDelete) {
        this.isDelete = isDelete;
    }

    public Date getBindTime() {
        return bindTime;
    }

    public void setBindTime(Date bindTime) {
        this.bindTime = bindTime;
    }

    public int getIsWaitCall() {
        return isWaitCall;
    }

    public void setIsWaitCall(int isWaitCall) {
        this.isWaitCall = isWaitCall;
    }

}

