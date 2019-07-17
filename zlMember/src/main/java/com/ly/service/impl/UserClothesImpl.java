package com.ly.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ly.entity.UserClothes;
import com.ly.entity.ZlUser;
import com.ly.kit.BasePageRequest;
import com.ly.kit.HResult;
import com.ly.mapper.UserClothesMapper;
import com.ly.mapper.ZlUserMapper;
import com.ly.service.interfaces.IUserClothesInterface;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author Created by Administrator on 2019/4/12.
 */
@Service
public class UserClothesImpl implements IUserClothesInterface {

    @Autowired
    private UserClothesMapper clothesMapper;

    @Autowired
    private ZlUserMapper userMapper;

    @Override
    public PageInfo<UserClothes> list(BasePageRequest<UserClothes> request) {
        PageHelper.startPage(request.getPageNumber(), request.getPageSize());
        UserClothes clothes = request.getData();
        List<UserClothes> list = clothesMapper.queryByCondition(clothes);
        PageInfo<UserClothes> pageInfo = null;
        if (CollectionUtils.isNotEmpty(list)) {
            pageInfo = new PageInfo<>(list);
        }
        return pageInfo;
    }

    @Override
    public HResult delete(int id) {
        HResult result = new HResult<>();
        try {
            UserClothes clothes = clothesMapper.getById(id);
            clothesMapper.delete(id);
            int userId = clothes.getUserId();
            ZlUser zlUser = userMapper.getById(userId);
            int price = zlUser.getPrice() - clothes.getPrice();
            int integral = Math.round(price / 10);
            zlUser.setPrice(price);
            zlUser.setIntegral(integral);
            zlUser.setUpdateTime(new Date());
            userMapper.update(zlUser);
        }catch (Exception e){
            e.printStackTrace();
        }
        return result;
    }
}
