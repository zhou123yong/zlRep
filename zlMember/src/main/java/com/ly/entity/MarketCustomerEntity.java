/**
 * Description: 客户信息数据库实体/领域对象
 * Copyright:   Copyright (c)2017
 * Company:     江苏三六五网络股份有限公司
 *
 * @author: 江苏三六五网络股份有限公司
 * @version: 1.0
 * Create at:   2017-12-05 下午 19:21:01
 * <p>
 * Modification History:
 * Date         Author      Version     Description
 * ------------------------------------------------------------------
 * 2017-12-05   江苏三六五网络股份有限公司   1.0         Initial
 */
package com.ly.entity;

import javax.persistence.*;
import java.util.Date;

/**
 * @author jay
 */
@Entity
@Table(name = "market_customer")
public class MarketCustomerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String phone;

    private String actSource;

    /**
     * 客户状态 0 待派 1 已派 2 超时 3 放弃
     * 待派：所有可以进行派工的数据，包括超时又返回至当前活动的数据内容。
     * 已派：所有已进行派工的数据。
     * 超时：超时且未派的数据。
     */
    private int status;

    private String createSource;

    private Date createTime;

    private String cityCode;

    private String cityName;

    private int actSourceId;

    private int isDelete;

    private Date bindTime;

    private String signUpSourceId;

    private String signUpSourceName;

    private int customerId;

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

    public String getSignUpSourceId() {
        return signUpSourceId;
    }

    public void setSignUpSourceId(String signUpSourceId) {
        this.signUpSourceId = signUpSourceId;
    }

    public String getSignUpSourceName() {
        return signUpSourceName;
    }

    public void setSignUpSourceName(String signUpSourceName) {
        this.signUpSourceName = signUpSourceName;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }
}

