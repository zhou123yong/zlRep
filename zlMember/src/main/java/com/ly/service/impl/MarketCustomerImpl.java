package com.ly.service.impl;

import com.ly.entity.MarketCustomerEntity;
import com.ly.mapper.MarketCustomerMapper;
import com.ly.service.interfaces.IMarketCustomerInterface;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * @author
 * Created by Administrator on 2019/6/27.
 */
@Service
public class MarketCustomerImpl implements IMarketCustomerInterface {

    @Autowired
    private MarketCustomerMapper mapper;

    @Override
    public MarketCustomerEntity queryById(int id) {
        return mapper.queryById(id);
    }

    @Override
    public List<MarketCustomerEntity> queryByConditions(Map<String, Object> map) {
        List<MarketCustomerEntity> list = mapper.queryByConditions(map);
        if(CollectionUtils.isNotEmpty(list)){
            return list;
        }
        return Collections.emptyList();
    }
}
