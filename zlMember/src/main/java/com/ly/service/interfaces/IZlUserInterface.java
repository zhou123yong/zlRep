package com.ly.service.interfaces;

import com.github.pagehelper.PageInfo;
import com.ly.entity.ZlUser;
import com.ly.kit.BasePageRequest;
import com.ly.kit.HResult;

/**
 * @author
 * @author Created by Administrator on 2018/12/29.
 */
public interface IZlUserInterface {

    HResult addUser(ZlUser user);

    HResult update(ZlUser user);

    void deleteZlUser(int id);

    PageInfo<ZlUser> list(BasePageRequest<ZlUser> request);

    ZlUser getById(int id);

    HResult buyClothes(ZlUser user,int price);
}
