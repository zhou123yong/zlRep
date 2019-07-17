package com.ly.service.interfaces;

import com.ly.entity.ExcelEntity;
import com.ly.entity.TfhBindPeopleEntity;
import com.ly.entity.TfhHousesDirectSellingEntity;
import com.ly.kit.HResult;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * @author Created by Administrator on 2019/3/28.
 */
public interface IExcelInterface {

    HResult exportExcel(List<ExcelEntity> list, HttpServletResponse response);

    List<TfhBindPeopleEntity> queryByConditions(Map<String, Object> map);

    List<TfhHousesDirectSellingEntity> queryList(Map<String, Object> map);

    HResult exportBySource(List<Map<String, Object>> list, HttpServletResponse response);
}
