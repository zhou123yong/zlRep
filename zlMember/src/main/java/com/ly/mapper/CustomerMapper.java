package com.ly.mapper;


import com.ly.entity.CustomerEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @author Created by Administrator on 2019/2/25.
 */
@Repository
public interface CustomerMapper {

    CustomerEntity queryById(int id);

    List<Map<String, Object>> queryCount();

    List<String> queryCity();

    List<Map<String, Object>> queryByManagerId(Map<String, Object> map);

    List<Map<String, Object>> queryCustomerLog(Map<String, Object> map);

    List<Map<String, Object>> queryCustomerByStatus(Map<String, Object> map);

    List<CustomerEntity> queryAllByCity();

    List<String> queryByCondition(Map<String, Object> map);

    List<Map<String, Object>> queryCustomerLogBySource(Map<String, Object> map);

    List<Map<String, Object>> queryBySource(Map<String, Object> map);

    List<Map<String, Object>> queryByStatusAndSource(Map<String, Object> map);

    List<Map<String, Object>> querySource();

    List<String> querySourceName();

    List<Map<String, Object>> queryBySourceNew(Map<String, Object> map);

    List<Map<String, Object>> queryCustomerLogBySourceNew(Map<String, Object> map);

    List<Map<String, Object>> queryByStatusAndSourceNew(Map<String, Object> map);

}
