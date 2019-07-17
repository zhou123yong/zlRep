package com.ly.service.impl;

import com.ly.entity.SysUser;
import com.ly.mapper.SysUserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author
 * Created by Administrator on 2019/1/21.
 */
@Service
public class SysUserService {

    @Autowired
    private SysUserMapper userMapper;

    public SysUser selectById(Integer id) {
        return userMapper.selectById(id);
    }

    public SysUser selectByName(String name) {
        return userMapper.selectByName(name);
    }
}

