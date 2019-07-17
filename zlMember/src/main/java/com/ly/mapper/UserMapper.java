package com.ly.mapper;

import com.ly.entity.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @author
 * Created by Administrator on 2019/1/15.
 */
@Repository
public interface UserMapper {

    User findUser(Map<String, Object> map);

    void update(User user);

    List<User> queryByCondition(Map<String, Object> map);
}
