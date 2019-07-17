/**
 * Description: CustomerCallbackLog数据库实体/领域对象
 * Copyright:   Copyright (c)2017
 * Company:     江苏三六五网络股份有限公司
 *
 * @author: 江苏三六五网络股份有限公司
 * @version: 1.0
 * Create at:   2017-12-29 下午 17:24:59
 * <p>
 * Modification History:
 * Date         Author      Version     Description
 * ------------------------------------------------------------------
 * 2017-12-29   江苏三六五网络股份有限公司   1.0         Initial
 */
package com.ly.entity;

import javax.persistence.*;
import java.util.Date;

/**
 * @author jay
 */
@Entity
@Table(name = "customer_callback_log")
public class CustomerCallbackLogEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int customerId;

    private int managerId;

    private String managerName;

    private String content;

    private Date createTime;

    private String result;

    private String creater;

    private int projectId;

    private int callRecordId;

    private String callRecordName;

    private int callRecordDuration;

    private int source;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getCreater() {
        return creater;
    }

    public void setCreater(String creater) {
        this.creater = creater;
    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public int getCallRecordId() {
        return callRecordId;
    }

    public void setCallRecordId(int callRecordId) {
        this.callRecordId = callRecordId;
    }

    public String getCallRecordName() {
        return callRecordName;
    }

    public void setCallRecordName(String callRecordName) {
        this.callRecordName = callRecordName;
    }

    public int getCallRecordDuration() {
        return callRecordDuration;
    }

    public void setCallRecordDuration(int callRecordDuration) {
        this.callRecordDuration = callRecordDuration;
    }

    public int getSource() {
        return source;
    }

    public void setSource(int source) {
        this.source = source;
    }
}

