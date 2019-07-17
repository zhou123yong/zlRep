package com.ly.service.interfaces;

import com.ly.entity.MarketCustomerEntity;

import java.util.List;
import java.util.Map;

/**
 * @author
 * Created by Administrator on 2019/6/27.
 */
public interface IMarketCustomerInterface {

    MarketCustomerEntity queryById(int id);

    List<MarketCustomerEntity> queryByConditions(Map<String, Object> map);
}
