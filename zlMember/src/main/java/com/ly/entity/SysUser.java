package com.ly.entity;

import java.io.Serializable;

/**
 * @author
 * Created by Administrator on 2019/1/21.
 */
public class SysUser implements Serializable {
    static final long serialVersionUID = 1L;

    private int id;

    private String name;

    private String password;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

