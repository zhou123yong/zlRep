package com.ly.mapper;

import com.ly.entity.UserClothes;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Created by Administrator on 2019/4/12.
 */
@Repository
public interface UserClothesMapper {

    void save(UserClothes userClothes);

    List<UserClothes> queryByCondition(UserClothes clothes);

    void delete(int id);

    UserClothes getById(int id);

}
