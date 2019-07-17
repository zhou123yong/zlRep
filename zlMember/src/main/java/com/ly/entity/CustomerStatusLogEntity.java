/**
 * Description: 客户状态变更纪录数据库实体/领域对象
 * Copyright:   Copyright (c)2016
 * Company:     江苏三六五网络股份有限公司
 *
 * @author: 江苏三六五网络股份有限公司
 * @version: 1.0
 * Create at:   2016-09-19 下午 14:08:32
 * <p>
 * Modification History:
 * Date         Author      Version     Description
 * ------------------------------------------------------------------
 * 2016-09-19   江苏三六五网络股份有限公司   1.0         Initial
 */
package com.ly.entity;

import javax.persistence.*;
import java.util.Date;

/**
 * @author jay
 */
@Entity
@Table(name = "customer_status_log")
public class CustomerStatusLogEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int fromStatusId;

    private int toStatusId;

    private String fromStatusName;

    private String toStatusName;

    private String remark;

    private String creater;

    private Date createTime;

    private Date occurTime;

    private int customerId;

    private int projectId;

    private int isRepeat;

    private int nonStatistic;

    private int customerManagerId;

    private String customerManagerName;

    private int isDelete;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getFromStatusId() {
        return fromStatusId;
    }

    public void setFromStatusId(int fromStatusId) {
        this.fromStatusId = fromStatusId;
    }

    public int getToStatusId() {
        return toStatusId;
    }

    public void setToStatusId(int toStatusId) {
        this.toStatusId = toStatusId;
    }

    public String getFromStatusName() {
        return fromStatusName;
    }

    public void setFromStatusName(String fromStatusName) {
        this.fromStatusName = fromStatusName;
    }

    public String getToStatusName() {
        return toStatusName;
    }

    public void setToStatusName(String toStatusName) {
        this.toStatusName = toStatusName;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getCreater() {
        return creater;
    }

    public void setCreater(String creater) {
        this.creater = creater;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getOccurTime() {
        return occurTime;
    }

    public void setOccurTime(Date occurTime) {
        this.occurTime = occurTime;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public int getIsRepeat() {
        return isRepeat;
    }

    public void setIsRepeat(int isRepeat) {
        this.isRepeat = isRepeat;
    }

    public int getNonStatistic() {
        return nonStatistic;
    }

    public void setNonStatistic(int nonStatistic) {
        this.nonStatistic = nonStatistic;
    }

    public int getCustomerManagerId() {
        return customerManagerId;
    }

    public void setCustomerManagerId(int customerManagerId) {
        this.customerManagerId = customerManagerId;
    }

    public String getCustomerManagerName() {
        return customerManagerName;
    }

    public void setCustomerManagerName(String customerManagerName) {
        this.customerManagerName = customerManagerName;
    }

    public int getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(int isDelete) {
        this.isDelete = isDelete;
    }
}

