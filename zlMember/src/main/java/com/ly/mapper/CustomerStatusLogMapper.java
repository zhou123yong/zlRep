package com.ly.mapper;

import com.ly.entity.CustomerStatusLogEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @author Created by Administrator on 2019/5/27.
 */
@Repository
public interface CustomerStatusLogMapper {

    void updateIsDelete(Map<String, Object> map);

    CustomerStatusLogEntity queryById(int id);

    List<CustomerStatusLogEntity> queryByConditions(Map<String, Object> map);

    List<CustomerStatusLogEntity> queryByCustomer();

    List<CustomerStatusLogEntity> queryByCustomerId(Map<String, Object> map);
}
