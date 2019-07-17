package com.ly.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ly.entity.UserClothes;
import com.ly.entity.ZlUser;
import com.ly.kit.BasePageRequest;
import com.ly.kit.HResult;
import com.ly.mapper.UserClothesMapper;
import com.ly.mapper.ZlUserMapper;
import com.ly.service.interfaces.IZlUserInterface;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * @author Created by Administrator on 2019/4/8.
 */
@Service
public class ZlUserImpl implements IZlUserInterface {

    @Autowired
    private ZlUserMapper mapper;

    @Autowired
    private UserClothesMapper clothesMapper;

    @Override
    @Transactional
    public HResult addUser(ZlUser user) {
        HResult result = new HResult();
        List<ZlUser> list = mapper.queryByCondition(user);
        if (CollectionUtils.isNotEmpty(list)) {
            result.setStatus(-1);
            result.setErrorMessage("用户已存在，请勿重复添加");
            return result;
        }
        mapper.addUser(user);
        UserClothes clothes = new UserClothes();
        clothes.setUserId(user.getId());
        clothes.setUserName(user.getUserName());
        clothes.setPrice(user.getPrice());
        clothes.setImage("");
        clothes.setCreateNo(0);
        clothes.setCreateName("店主");
        clothes.setUpdateNo(0);
        clothes.setUpdateName("店主");
        clothes.setCreateTime(new Date());
        clothes.setUpdateTime(new Date());
        clothesMapper.save(clothes);
        return result;
    }

    @Override
    public HResult update(ZlUser user) {
        HResult result = new HResult();
        List<ZlUser> list = mapper.queryByCondition(user);
        if (CollectionUtils.isNotEmpty(list) && list.size() > 1) {
            result.setStatus(-1);
            result.setErrorMessage("用户已存在，请重新修改");
            return result;
        }
        mapper.update(user);
        return result;
    }

    @Override
    public PageInfo<ZlUser> list(BasePageRequest<ZlUser> request) {
        PageHelper.startPage(request.getPageNumber(), request.getPageSize());
        ZlUser zlUser = request.getData();
        List<ZlUser> list = mapper.queryByCondition(zlUser);
        PageInfo<ZlUser> pageInfo = null;
        if (CollectionUtils.isNotEmpty(list)) {
            pageInfo = new PageInfo<>(list);
        }
        return pageInfo;
    }

    @Override
    public ZlUser getById(int id) {
        return mapper.getById(id);
    }

    @Override
    public void deleteZlUser(int id) {
        mapper.deleteZlUser(id);
    }

    @Override
    @Transactional
    public HResult buyClothes(ZlUser user,int price) {
        HResult result = new HResult();
        mapper.update(user);
        UserClothes clothes = new UserClothes();
        clothes.setUserId(user.getId());
        clothes.setUserName(user.getUserName());
        clothes.setPrice(price);
        clothes.setImage("");
        clothes.setCreateNo(0);
        clothes.setCreateName("店主");
        clothes.setUpdateNo(0);
        clothes.setUpdateName("店主");
        clothes.setCreateTime(new Date());
        clothes.setUpdateTime(new Date());
        clothesMapper.save(clothes);
        return result;
    }
}
