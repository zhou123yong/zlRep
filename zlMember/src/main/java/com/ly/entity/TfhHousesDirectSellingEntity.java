/**
 * Description: 直销楼盘数据库实体/领域对象
 * Copyright:   Copyright (c)2018
 * Company:     江苏三六五网络股份有限公司
 *
 * @author: 江苏三六五网络股份有限公司
 * @version: 1.0
 * Create at:   2018-03-26 下午 14:35:12
 * <p>
 * Modification History:
 * Date         Author      Version     Description
 * ------------------------------------------------------------------
 * 2018-03-26   江苏三六五网络股份有限公司   1.0         Initial
 */
package com.ly.entity;

import java.util.Date;

public class TfhHousesDirectSellingEntity {

    private int id;

    private String newHouseId;

    private String projectId;

    private String channel;

    private String housesName;

    private String pinyin;

    private Integer showState;

    private Integer indexshow;

    private Integer vrshow;

    private Integer sortNum;

    private String cityId;

    private String districtId;

    private String districtName;

    private String tags;

    private String priceArea;

    private String avgPrice;

    private String selfPrice;

    private String areaCode;

    private String telnum;
    private String cornet;
    private String description;
    private String signBaseNum;
    private String addSign;
    private String deStartTime;
    private String deEndTime;

    private String acreageArea;

    private Date createTime;
    private Date updateTime;

    private Object mainUnit;
    private Integer userId;

    private String linkAddr;

    private String blockId;

    private String hxnav;

    private int isVrHouse;

    private String bindName;

    public Integer getVrshow() {
        return vrshow;
    }

    public void setVrshow(Integer vrshow) {
        this.vrshow = vrshow;
    }

    public Integer getIndexshow() {
        return indexshow;
    }

    public void setIndexshow(Integer indexshow) {
        this.indexshow = indexshow;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSignBaseNum() {
        return signBaseNum;
    }

    public void setSignBaseNum(String signBaseNum) {
        this.signBaseNum = signBaseNum;
    }

    public String getAddSign() {
        return addSign;
    }

    public void setAddSign(String addSign) {
        this.addSign = addSign;
    }

    public String getDeStartTime() {
        return deStartTime;
    }

    public void setDeStartTime(String deStartTime) {
        this.deStartTime = deStartTime;
    }

    public String getDeEndTime() {
        return deEndTime;
    }

    public void setDeEndTime(String deEndTime) {
        this.deEndTime = deEndTime;
    }

    public String getCornet() {
        return cornet;
    }

    public void setCornet(String cornet) {
        this.cornet = cornet;
    }

    public String getAreaCode() {
        return areaCode;
    }

    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode;
    }

    public String getTelnum() {
        return telnum;
    }

    public void setTelnum(String telnum) {
        this.telnum = telnum;
    }

    public String getSelfPrice() {
        return selfPrice;
    }

    public void setSelfPrice(String selfPrice) {
        this.selfPrice = selfPrice;
    }

    /**
     * 获取新房ListId
     *
     * @return 新房ListId
     */
    public String getNewHouseId() {
        return this.newHouseId;
    }

    /**
     * 设置新房ListId
     * @param newHouseId 新房ListId
     */
    public void setNewHouseId(String newHouseId) {
        this.newHouseId = newHouseId;
    }

    /**
     * 获取新房PrjId
     *
     * @return 新房PrjId
     */
    public String getProjectId() {
        return this.projectId;
    }

    /**
     * 设置新房PrjId
     *
     * @param projectId 新房PrjId
     */
    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    /**
     * 获取楼盘物业类型   1住宅2写字楼3别墅4商铺5公寓
     *
     * @return 楼盘物业类型   1住宅2写字楼3别墅4商铺5公寓
     */
    public String getChannel() {
        return this.channel;
    }

    /**
     * 设置楼盘物业类型   1住宅2写字楼3别墅4商铺5公寓
     * @param channel 楼盘物业类型   1住宅2写字楼3别墅4商铺5公寓
     */
    public void setChannel(String channel) {
        this.channel = channel;
    }

    /**
     * 获取楼盘名称
     *
     * @return 楼盘名称
     */
    public String getHousesName() {
        return this.housesName;
    }

    /**
     * 设置楼盘名称
     * @param housesName 楼盘名称
     */
    public void setHousesName(String housesName) {
        this.housesName = housesName;
    }

    /**
     * 获取楼盘拼音
     * @return 楼盘拼音
     */
    public String getPinyin() {
        return this.pinyin;
    }

    /**
     * 设置楼盘拼音
     * @param pinyin 楼盘拼音
     */
    public void setPinyin(String pinyin) {
        this.pinyin = pinyin;
    }

    /**
     * 获取显示状态  (4 显示 5 不显示)
     *
     * @return 显示状态  (4 显示 5 不显示)
     */
    public Integer getShowState() {
        return this.showState;
    }

    /**
     * 设置显示状态  (4 显示 5 不显示)
     * @param showState 显示状态  (4 显示 5 不显示)
     */
    public void setShowState(Integer showState) {
        this.showState = showState;
    }

    /**
     * 获取列表排序
     *
     * @return 列表排序
     */
    public Integer getSortNum() {
        return this.sortNum;
    }

    /**
     * 设置列表排序
     *
     * @param sortNum 列表排序
     */
    public void setSortNum(Integer sortNum) {
        this.sortNum = sortNum;
    }

    /**
     * 获取城市Id
     *
     * @return 城市Id
     */
    public String getCityId() {
        return this.cityId;
    }

    /**
     * 设置城市Id
     *
     * @param cityId 城市Id
     */
    public void setCityId(String cityId) {
        this.cityId = cityId;
    }

    /**
     * 获取区属Id
     *
     * @return 区属Id
     */
    public String getDistrictId() {
        return this.districtId;
    }

    /**
     * 设置区属Id
     *
     * @param districtId 区属Id
     */
    public void setDistrictId(String districtId) {
        this.districtId = districtId;
    }

    /**
     * 获取区属名称
     * @return 区属名称
     */
    public String getDistrictName() {
        return this.districtName;
    }

    /**
     * 设置区属名称
     * @param districtName 区属名称
     */
    public void setDistrictName(String districtName) {
        this.districtName = districtName;
    }

    /**
     * 获取特色标签
     *
     * @return 特色标签
     */
    public String getTags() {
        return this.tags;
    }

    /**
     * 设置特色标签
     *
     * @param tags 特色标签
     */
    public void setTags(String tags) {
        this.tags = tags;
    }

    /**
     * 获取总价区间
     *
     * @return 总价区间
     */
    public String getPriceArea() {
        return this.priceArea;
    }

    /**
     * 设置总价区间
     *
     * @param priceArea 总价区间
     */
    public void setPriceArea(String priceArea) {
        this.priceArea = priceArea;
    }

    /**
     * 获取均价
     *
     * @return 均价
     */
    public String getAvgPrice() {
        return this.avgPrice;
    }

    /**
     * 设置均价
     *
     * @param avgPrice 均价
     */
    public void setAvgPrice(String avgPrice) {
        this.avgPrice = avgPrice;
    }

    /**
     * 获取面积段
     *
     * @return 面积段
     */
    public String getAcreageArea() {
        return this.acreageArea;
    }

    /**
     * 设置面积段
     *
     * @param acreageArea 面积段
     */
    public void setAcreageArea(String acreageArea) {
        this.acreageArea = acreageArea;
    }


    /**
     * 获取创建时间
     * @return 创建时间
     */
    public Date getCreateTime() {
        return this.createTime;
    }

    /**
     * 设置创建时间
     * @param createTime 创建时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * 获取主力户型
     * @return 主力户型
     */
    public Object getMainUnit() {
        return this.mainUnit;
    }

    /**
     * 设置主力户型
     * @param mainUnit 主力户型
     */
    public void setMainUnit(Object mainUnit) {
        this.mainUnit = mainUnit;
    }

    /**
     * 获取直销人员id
     * @return 直销人员id
     */
    public Integer getUserId() {
        return this.userId;
    }

    /**
     * 设置直销人员id
     * @param userId 直销人员id
     */
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    /**
     * 获取详情页广告图跳转链接
     * @return 详情页广告图跳转链接
     */
    public String getLinkAddr() {
        return this.linkAddr;
    }

    /**
     * 设置详情页广告图跳转链接
     *
     * @param linkAddr 详情页广告图跳转链接
     */
    public void setLinkAddr(String linkAddr) {
        this.linkAddr = linkAddr;
    }

    /**
     * 获取blockId
     * @return blockId
     */
    public String getBlockId() {
        return this.blockId;
    }

    public void setBlockId(String blockId) {
        this.blockId = blockId;
    }

    public String getHxnav() {
        return this.hxnav;
    }

    public void setHxnav(String hxnav) {
        this.hxnav = hxnav;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }


    public String getBindName() {
        return bindName;
    }

    public void setBindName(String bindName) {
        this.bindName = bindName;
    }

    public int getIsVrHouse() {
        return isVrHouse;
    }

    public void setIsVrHouse(int isVrHouse) {
        this.isVrHouse = isVrHouse;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}

