package com.ly.kit;

import com.google.gson.annotations.SerializedName;

import java.util.List;
import java.util.Map;

/**
 * @author Created by wxp4532 on 2016/8/3.
 */
public class BasePageRequest<T> {

    private List<T> list;

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

    private Integer pageSize;

    private Integer pageNumber;

    private String userId;

    private Boolean getIsAdmin;


    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(Integer pageNumber) {
        this.pageNumber = pageNumber;
    }


    @SerializedName("data")
    private T data;

    private Map<String, String> query;

    public T getData() {
        return data;
    }


    public void setData(T data) {
        this.data = data;
    }

    public Map<String, String> getQuery() {
        return query;
    }

    public void setQuery(Map<String, String> query) {
        this.query = query;
    }

    public Boolean getGetIsAdmin() {
        return getIsAdmin;
    }

    public void setGetIsAdmin(Boolean getIsAdmin) {
        this.getIsAdmin = getIsAdmin;
    }

    @Override
    public String toString() {
        return "BasePageRequest{" +
                "list=" + list +
                ", pageSize=" + pageSize +
                ", pageNumber=" + pageNumber +
                ", userId='" + userId + '\'' +
                ", getIsAdmin=" + getIsAdmin +
                ", data=" + data +
                ", query=" + query +
                '}';
    }
}
