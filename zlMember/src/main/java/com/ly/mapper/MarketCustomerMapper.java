package com.ly.mapper;

import com.ly.entity.MarketCustomerEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @author Created by Administrator on 2019/6/27.
 */
@Repository
public interface MarketCustomerMapper {

    MarketCustomerEntity queryById(int id);

    List<MarketCustomerEntity> queryByConditions(Map<String, Object> map);
}
