package com.ly.entity;

import java.io.Serializable;

/**
 * @author
 * Created by Administrator on 2019/1/21.
 */
public class SysRole implements Serializable {

    static final long serialVersionUID = 1L;

    private int id;

    private String name;

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
}

