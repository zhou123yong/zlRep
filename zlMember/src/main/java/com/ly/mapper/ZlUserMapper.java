package com.ly.mapper;

import com.ly.entity.ZlUser;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Created by Administrator on 2019/1/15.
 */
@Repository
public interface ZlUserMapper {

    int addUser(ZlUser user);

    void update(ZlUser user);

    void deleteZlUser(int id);

    List<ZlUser> queryByCondition(ZlUser zlUser);

    ZlUser getById(int id);
}
