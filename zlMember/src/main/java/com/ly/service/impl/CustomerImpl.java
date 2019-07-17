package com.ly.service.impl;

import com.ly.entity.CustomerEntity;
import com.ly.mapper.CustomerMapper;
import com.ly.service.interfaces.ICustomerInterface;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * @author Created by Administrator on 2019/6/27.
 */
@Service
public class CustomerImpl implements ICustomerInterface {

    @Autowired
    private CustomerMapper customerMapper;

    @Override
    public List<Map<String, Object>> queryCount() {
        List<Map<String, Object>> list = customerMapper.queryCount();
        if (CollectionUtils.isNotEmpty(list)) {
            return list;
        }
        return Collections.emptyList();
    }

    @Override
    public CustomerEntity queryById(int id) {
        return customerMapper.queryById(id);
    }

    @Override
    public List<String> queryCity() {
        List<String> list = customerMapper.queryCity();
        if (CollectionUtils.isNotEmpty(list)) {
            return list;
        }
        return Collections.emptyList();
    }

    @Override
    public List<Map<String, Object>> queryByManagerId(Map<String, Object> map) {
        List<Map<String, Object>> list = customerMapper.queryByManagerId(map);
        if (CollectionUtils.isNotEmpty(list)) {
            return list;
        }
        return Collections.emptyList();
    }

    @Override
    public List<Map<String, Object>> queryCustomerLog(Map<String, Object> map) {
        List<Map<String, Object>> list = customerMapper.queryCustomerLog(map);
        if (CollectionUtils.isNotEmpty(list)) {
            return list;
        }
        return Collections.emptyList();
    }

    @Override
    public List<Map<String, Object>> queryCustomerByStatus(Map<String, Object> map) {
        List<Map<String, Object>> list = customerMapper.queryCustomerByStatus(map);
        if (CollectionUtils.isNotEmpty(list)) {
            return list;
        }
        return Collections.emptyList();
    }

    @Override
    public List<CustomerEntity> queryAllByCity() {
        List<CustomerEntity> list = customerMapper.queryAllByCity();
        if (CollectionUtils.isNotEmpty(list)) {
            return list;
        }
        return Collections.emptyList();
    }

    @Override
    public List<String> queryByCondition(Map<String, Object> map) {
        List<String> list = customerMapper.queryByCondition(map);
        if (CollectionUtils.isNotEmpty(list)) {
            return list;
        }
        return Collections.emptyList();
    }

    @Override
    public List<Map<String, Object>> queryCustomerLogBySource(Map<String, Object> map) {
        List<Map<String, Object>> list = customerMapper.queryCustomerLogBySource(map);
        if (CollectionUtils.isNotEmpty(list)) {
            return list;
        }
        return Collections.emptyList();
    }

    @Override
    public List<Map<String, Object>> queryBySource(Map<String, Object> map) {
        List<Map<String, Object>> list = customerMapper.queryBySource(map);
        if (CollectionUtils.isNotEmpty(list)) {
            return list;
        }
        return Collections.emptyList();
    }

    @Override
    public List<Map<String, Object>> queryByStatusAndSource(Map<String, Object> map) {
        List<Map<String, Object>> list = customerMapper.queryByStatusAndSource(map);
        if (CollectionUtils.isNotEmpty(list)) {
            return list;
        }
        return Collections.emptyList();
    }

    @Override
    public List<Map<String, Object>> querySource() {
        List<Map<String, Object>> list = customerMapper.querySource();
        if (CollectionUtils.isNotEmpty(list)) {
            return list;
        }
        return Collections.emptyList();
    }

    @Override
    public List<String> querySourceName() {
        List<String> list = customerMapper.querySourceName();
        if (CollectionUtils.isNotEmpty(list)) {
            return list;
        }
        return Collections.emptyList();
    }

    @Override
    public List<Map<String, Object>> queryBySourceNew(Map<String, Object> map) {
        List<Map<String, Object>> list = customerMapper.queryBySourceNew(map);
        if (CollectionUtils.isNotEmpty(list)) {
            return list;
        }
        return Collections.emptyList();
    }

    @Override
    public List<Map<String, Object>> queryCustomerLogBySourceNew(Map<String, Object> map) {
        List<Map<String, Object>> list = customerMapper.queryCustomerLogBySourceNew(map);
        if (CollectionUtils.isNotEmpty(list)) {
            return list;
        }
        return Collections.emptyList();
    }

    @Override
    public List<Map<String, Object>> queryByStatusAndSourceNew(Map<String, Object> map) {
        List<Map<String, Object>> list = customerMapper.queryByStatusAndSourceNew(map);
        if (CollectionUtils.isNotEmpty(list)) {
            return list;
        }
        return Collections.emptyList();
    }
}
