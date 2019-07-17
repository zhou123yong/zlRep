package com.ly.service.interfaces;

import com.github.pagehelper.PageInfo;
import com.ly.entity.UserClothes;
import com.ly.kit.BasePageRequest;
import com.ly.kit.HResult;

/**
 * @author Created by Administrator on 2019/4/12.
 */
public interface IUserClothesInterface {

    PageInfo<UserClothes> list(BasePageRequest<UserClothes> request);

    HResult delete(int id);
}
