package com.ly.mapper;

import com.ly.entity.TfhBindPeopleEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @author
 * Created by Administrator on 2019/3/28.
 */
@Repository
public interface BindPeopleMapper {

    List<TfhBindPeopleEntity> queryByConditions(Map<String, Object> map);
}
