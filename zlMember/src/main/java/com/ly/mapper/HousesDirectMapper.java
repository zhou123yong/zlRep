package com.ly.mapper;

import com.ly.entity.TfhHousesDirectSellingEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @author Created by Administrator on 2019/1/8.
 */
@Repository
public interface HousesDirectMapper {

    List<TfhHousesDirectSellingEntity> queryByConditions(Map<String, Object> map);
}
