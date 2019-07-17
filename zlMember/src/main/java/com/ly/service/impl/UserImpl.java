package com.ly.service.impl;


import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ly.dao.UserDao;
import com.ly.entity.User;
import com.ly.kit.BasePageRequest;
import com.ly.mapper.UserMapper;
import com.ly.service.interfaces.IUserInterface;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Created by Administrator on 2018/12/29.
 */
@Service
public class UserImpl implements IUserInterface {

    @Autowired
    private UserDao dao;
    @Autowired
    private UserMapper mapper;

    @Override
    public User findByName(String name) {
        Map<String, Object> map = new HashMap<>(5);
        map.put("userName", name);
        User user;
        List<User> list = mapper.queryByCondition(map);
        if (CollectionUtils.isNotEmpty(list)) {
            user = list.get(0);
        } else {
            user = dao.findUserByUserName(name);
        }
        return user;
    }

    @Override
    public List<User> queryList(Map<String, Object> map) {
        List<User> list = mapper.queryByCondition(map);
        if (CollectionUtils.isNotEmpty(list)) {
            return list;
        }
        return Collections.emptyList();
    }

    @Override
    public PageInfo<User> list(BasePageRequest<User> request) {
        PageHelper.startPage(request.getPageNumber(), request.getPageSize());
        Map<String, Object> map = new HashMap<>(10);
        List<User> list = mapper.queryByCondition(map);
        PageInfo<User> pageInfo = null;
        if (CollectionUtils.isNotEmpty(list)) {
            pageInfo = new PageInfo<>(list);
        }
        return pageInfo;
    }
}
