package com.ly.service.interfaces;

import com.github.pagehelper.PageInfo;
import com.ly.entity.User;
import com.ly.kit.BasePageRequest;

import java.util.List;
import java.util.Map;

/**
 * @author Created by Administrator on 2018/12/29.
 */
public interface IUserInterface {

    User findByName(String name);

    List<User> queryList(Map<String, Object> map);

    PageInfo<User> list(BasePageRequest<User> request);
}
