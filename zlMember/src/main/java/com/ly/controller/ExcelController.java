package com.ly.controller;

import com.ly.entity.*;
import com.ly.kit.HResult;
import com.ly.service.interfaces.ICustomerInterface;
import com.ly.service.interfaces.IExcelInterface;
import com.ly.service.interfaces.IMarketCustomerInterface;
import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.text.DecimalFormat;
import java.util.*;

/**
 * @author Created by Administrator on 2019/3/28.
 */
@Controller
@RequestMapping("/export")
public class ExcelController {

    private final static Logger logger = LoggerFactory.getLogger(ExcelController.class);

    @Autowired
    private IExcelInterface excelInterface;
    @Autowired
    private IMarketCustomerInterface marketService;
    @Autowired
    private ICustomerInterface customerService;

    @RequestMapping(value = "/exportCustomer")
    @ResponseBody
    public HResult exportCustomer(HttpServletResponse httpResponse) {
        HResult result = new HResult();
        List<ExcelEntity> list = new ArrayList<>();
        try {
            Map<String, Object> directMap = new HashMap<>(10);
            directMap.put("city", "hz");
            List<TfhHousesDirectSellingEntity> directList = excelInterface.queryList(directMap);
            if (CollectionUtils.isNotEmpty(directList)) {
                directList.forEach(l -> {
                    ExcelEntity excelEntity = new ExcelEntity();
                    int houseId = l.getId();
                    Map<String, Object> bindMap = new HashMap<>(10);
                    bindMap.put("houseId", houseId);
                    bindMap.put("isValid", 0);
                    bindMap.put("status", 0);
                    List<TfhBindPeopleEntity> bindList = excelInterface.queryByConditions(bindMap);
                    if (CollectionUtils.isNotEmpty(bindList)) {
                        bindList.forEach(b -> {
                            excelEntity.setId(houseId);
                            excelEntity.setHouseName(l.getHousesName());
                            excelEntity.setCornet(l.getCornet());
                            excelEntity.setCity(l.getCityId());
                            excelEntity.setUserName(b.getUserName());
                            excelEntity.setMobilePhone(b.getMobilePhone());
                            excelEntity.setWebPhone(b.getWebPhone());
                            list.add(excelEntity);
                        });
                    } else {
                        excelEntity.setId(houseId);
                        excelEntity.setHouseName(l.getHousesName());
                        excelEntity.setCornet(l.getCornet());
                        excelEntity.setCity(l.getCityId());
                        excelEntity.setUserName("");
                        excelEntity.setMobilePhone("");
                        excelEntity.setWebPhone("");
                        list.add(excelEntity);
                    }
                });
            }

        } catch (Exception e) {
            e.printStackTrace();
            result.setStatus(-1);
            result.setErrorMessage("导出excel失败");
            logger.error("导出excel失败");
        }
        if (CollectionUtils.isNotEmpty(list)) {
            result = excelInterface.exportExcel(list, httpResponse);
        }
        return result;
    }

    @RequestMapping(value = "/addData")
    @ResponseBody
    public HResult addData() {
        HResult result = new HResult();
        try {
            List<String> cityList = customerService.queryCity();
            if (CollectionUtils.isNotEmpty(cityList)) {
                cityList.forEach(c -> {
                    Map<String, Object> map = new HashMap<>(10);
                    map.put("city", c);
                    List<MarketCustomerEntity> marketList = marketService.queryByConditions(map);
                    if (CollectionUtils.isNotEmpty(marketList)) {
                        marketList.forEach(m -> {
                            int customerId = m.getCustomerId();
                            CustomerEntity entity = customerService.queryById(customerId);
                            if (entity != null) {
                                int sourceId = Integer.valueOf(m.getSignUpSourceId());
                                Map<String, Object> updateMap = new HashMap<>(10);
                                updateMap.put("sourceId", sourceId);
                                updateMap.put("id", customerId);
                            }
                        });
                    }
                });
            }

        } catch (Exception e) {
            e.printStackTrace();
            result.setStatus(-1);
            result.setErrorMessage("填充数据失败");
            logger.error("填充数据失败");
        }
        return result;
    }

    @RequestMapping(value = "/exportBySource")
    @ResponseBody
    public HResult exportBySource(HttpServletResponse httpResponse) {
        HResult result = new HResult();
        List<Map<String, Object>> list = new ArrayList<>();
        try {
            List<String> cityList = customerService.queryCity();
            if (CollectionUtils.isNotEmpty(cityList)) {
                cityList.forEach(c -> {
                    List<String> sourceList = customerService.querySourceName();
                    if (CollectionUtils.isNotEmpty(sourceList)) {
                        sourceList.forEach(s -> {
                            Map<String, Object> putMap = new HashMap<>(10);
                            Map<String, Object> searchMap = new HashMap<>(10);
                            searchMap.put("actSource", s);
                            searchMap.put("cityCode", c);
                            String startTime = "2018-12-31 23:59:59";
                            String endTime = "2019-06-31 23:59:59";
                            searchMap.put("startTime", startTime);
                            searchMap.put("endTime", endTime);
                            //获取总数
                            List<Map<String, Object>> allList = customerService.queryBySourceNew(searchMap);
                            if (CollectionUtils.isNotEmpty(allList)) {
                                //获取私客量
                                List<Map<String, Object>> countList = customerService.queryBySource(searchMap);
                                //设置来源名称
                                putMap.put("name", s);
                                //设置城市名称
                                putMap.put("city", c);
                                //设置客户总量
                                putMap.put("all", allList.size());
                                //设置私客总量
                                putMap.put("count", countList.size());
                                //设置已跟进量
                                List<Map<String, Object>> callBackList = customerService.queryCustomerLogBySource(searchMap);
                                putMap.put("callBackCount", callBackList.size());

                                searchMap.put("status", 1);
                                //设置约看数目
                                List<Map<String, Object>> seeList = customerService.queryByStatusAndSource(searchMap);
                                putMap.put("seeCount", seeList.size());
                                //设置到访数目
                                searchMap.put("status", 2);
                                List<Map<String, Object>> daoList = customerService.queryByStatusAndSource(searchMap);
                                putMap.put("daoCount", daoList.size());
                                //设置认筹数目
                                searchMap.put("status", 3);
                                List<Map<String, Object>> renList = customerService.queryByStatusAndSource(searchMap);
                                putMap.put("renCount", renList.size());
                                //设置认购数目
                                searchMap.put("status", 4);
                                List<Map<String, Object>> buyList = customerService.queryByStatusAndSource(searchMap);
                                putMap.put("buyCount", buyList.size());
                                //设置签约数目
                                searchMap.put("status", 5);
                                List<Map<String, Object>> signList = customerService.queryByStatusAndSource(searchMap);
                                putMap.put("signCount", signList.size());
                                //设置退房数目
                                searchMap.put("status", 6);
                                List<Map<String, Object>> cancelList = customerService.queryByStatusAndSource(searchMap);
                                putMap.put("cancelCount", cancelList.size());
                                //设置转化率
                                int seeCount = seeList.size();
                                int daoCount = daoList.size();
                                int renCount = renList.size();
                                int buyCount = buyList.size();
                                int signCount = signList.size();
                                if (seeCount != 0) {
                                    double d = (double) daoCount / seeCount;
                                    DecimalFormat df = new DecimalFormat("0.00%");
                                    String numRate = df.format(d);
                                    putMap.put("daoRate", numRate);
                                } else {
                                    putMap.put("daoRate", "");
                                }
                                if (daoCount != 0) {
                                    double d = (double) renCount / daoCount;
                                    DecimalFormat df = new DecimalFormat("0.00%");
                                    String numRate = df.format(d);
                                    putMap.put("renRate", numRate);
                                } else {
                                    putMap.put("renRate", "");
                                }
                                if (daoCount != 0) {
                                    double d = (double) buyCount / daoCount;
                                    DecimalFormat df = new DecimalFormat("0.00%");
                                    String buyRate = df.format(d);
                                    putMap.put("buyRate", buyRate);
                                } else {
                                    putMap.put("buyRate", "");
                                }
                                if (daoCount != 0) {
                                    double d = (double) signCount / daoCount;
                                    DecimalFormat df = new DecimalFormat("0.00%");
                                    String signRate = df.format(d);
                                    putMap.put("signRate", signRate);
                                } else {
                                    putMap.put("signRate", "");
                                }
                                list.add(putMap);
                            }
                        });

                    }
                });
            }
        } catch (Exception e) {
            e.printStackTrace();
            result.setStatus(-1);
            result.setErrorMessage("导出小来源报表失败");
            logger.error("导出小来源报表失败");
        }
        if (CollectionUtils.isNotEmpty(list)) {
            result = excelInterface.exportBySource(list, httpResponse);
        }
        return result;
    }

    private static List removeDuplicate(List list) {
        HashSet h = new HashSet(list);
        list.clear();
        list.addAll(h);
        return list;
    }

    private static ArrayList<Map<String, Object>> removeDuplicateList(List<Map<String, Object>> list) {
        Set<Map<String, Object>> set = new TreeSet<>(new Comparator<Map<String, Object>>() {
            @Override
            public int compare(Map<String, Object> o1, Map<String, Object> o2) {
                return o1.get("phone").toString().compareTo(o2.get("phone").toString());
            }
        });
        set.addAll(list);
        return new ArrayList<>(set);
    }

    @RequestMapping(value = "/exportByCreate")
    @ResponseBody
    public HResult exportByCreate(HttpServletResponse httpResponse) {
        HResult result = new HResult();
        List<Map<String, Object>> list = new ArrayList<>();
        try {
            List<String> cityList = customerService.queryCity();
            if (CollectionUtils.isNotEmpty(cityList)) {
                cityList.forEach(c -> {
                    Map<String, Object> putMap = new HashMap<>(10);
                    Map<String, Object> searchMap = new HashMap<>(10);
                    searchMap.put("cityCode", c);
                    searchMap.put("createSource", "11");
                    String startTime = "2018-12-31 23:59:59";
                    String endTime = "2019-06-31 23:59:59";
                    searchMap.put("startTime", startTime);
                    searchMap.put("endTime", endTime);
                    //获取总数
                    List<Map<String, Object>> allList = customerService.queryBySourceNew(searchMap);
                    if (CollectionUtils.isNotEmpty(allList)) {
                        List<Map<String, Object>> countList = customerService.queryBySource(searchMap);
                        //设置客户总量
                        putMap.put("all", allList.size());
                        //设置私客总量
                        putMap.put("count", countList.size());
                        //设置来源名称
                        putMap.put("name", "CRM来源");
                        //设置城市名称
                        putMap.put("city", c);
                        //设置已跟进量
                        List<Map<String, Object>> callBackList = customerService.queryCustomerLogBySource(searchMap);
                        putMap.put("callBackCount", callBackList.size());

                        searchMap.put("status", 1);
                        //设置约看数目
                        List<Map<String, Object>> seeList = customerService.queryByStatusAndSource(searchMap);
                        putMap.put("seeCount", seeList.size());
                        //设置到访数目
                        searchMap.put("status", 2);
                        List<Map<String, Object>> daoList = customerService.queryByStatusAndSource(searchMap);
                        putMap.put("daoCount", daoList.size());
                        //设置认筹数目
                        searchMap.put("status", 3);
                        List<Map<String, Object>> renList = customerService.queryByStatusAndSource(searchMap);
                        putMap.put("renCount", renList.size());
                        //设置认购数目
                        searchMap.put("status", 4);
                        List<Map<String, Object>> buyList = customerService.queryByStatusAndSource(searchMap);
                        putMap.put("buyCount", buyList.size());
                        //设置签约数目
                        searchMap.put("status", 5);
                        List<Map<String, Object>> signList = customerService.queryByStatusAndSource(searchMap);
                        putMap.put("signCount", signList.size());
                        //设置退房数目
                        searchMap.put("status", 6);
                        List<Map<String, Object>> cancelList = customerService.queryByStatusAndSource(searchMap);
                        putMap.put("cancelCount", cancelList.size());
                        //设置转化率
                        int seeCount = seeList.size();
                        int daoCount = daoList.size();
                        int renCount = renList.size();
                        int buyCount = buyList.size();
                        int signCount = signList.size();
                        if (seeCount != 0) {
                            double d = (double) daoCount / seeCount;
                            DecimalFormat df = new DecimalFormat("0.00%");
                            String numRate = df.format(d);
                            putMap.put("daoRate", numRate);
                        } else {
                            putMap.put("daoRate", "");
                        }
                        if (daoCount != 0) {
                            double d = (double) renCount / daoCount;
                            DecimalFormat df = new DecimalFormat("0.00%");
                            String numRate = df.format(d);
                            putMap.put("renRate", numRate);
                        } else {
                            putMap.put("renRate", "");
                        }
                        if (daoCount != 0) {
                            double d = (double) buyCount / daoCount;
                            DecimalFormat df = new DecimalFormat("0.00%");
                            String buyRate = df.format(d);
                            putMap.put("buyRate", buyRate);
                        } else {
                            putMap.put("buyRate", "");
                        }
                        if (daoCount != 0) {
                            double d = (double) signCount / daoCount;
                            DecimalFormat df = new DecimalFormat("0.00%");
                            String signRate = df.format(d);
                            putMap.put("signRate", signRate);
                        } else {
                            putMap.put("signRate", "");
                        }
                        list.add(putMap);

                    }
                });
            }
        } catch (Exception e) {
            e.printStackTrace();
            result.setStatus(-1);
            result.setErrorMessage("导出小来源报表失败");
            logger.error("导出小来源报表失败");
        }
        if (CollectionUtils.isNotEmpty(list)) {
            result = excelInterface.exportBySource(list, httpResponse);
        }
        return result;
    }

    @RequestMapping(value = "/exportByCreateNew")
    @ResponseBody
    public HResult exportByCreateNew(HttpServletResponse httpResponse) {
        HResult result = new HResult();
        List<Map<String, Object>> list = new ArrayList<>();
        try {
            List<String> cityList = customerService.queryCity();
            if (CollectionUtils.isNotEmpty(cityList)) {
                cityList.forEach(c -> {
                    Map<String, Object> putMap = new HashMap<>(10);
                    Map<String, Object> searchMap = new HashMap<>(10);
                    searchMap.put("cityCode", c);
                    searchMap.put("createSource", "11");
                    String startTime = "2018-12-31 23:59:59";
                    String endTime = "2019-06-31 23:59:59";
                    searchMap.put("startTime", startTime);
                    searchMap.put("endTime", endTime);
                    //获取总数
                    List<Map<String, Object>> allList = customerService.queryBySourceNew(searchMap);
                    if (CollectionUtils.isNotEmpty(allList)) {
                        //设置客户总量
                        putMap.put("count", allList.size());
                        //设置来源名称
                        putMap.put("name", "CRM来源");
                        //设置城市名称
                        putMap.put("city", c);
                        //设置已跟进量
                        List<Map<String, Object>> callBackList = customerService.queryCustomerLogBySourceNew(searchMap);
                        putMap.put("callBackCount", callBackList.size());

                        searchMap.put("status", 1);
                        //设置约看数目
                        List<Map<String, Object>> seeList = customerService.queryByStatusAndSourceNew(searchMap);
                        putMap.put("seeCount", seeList.size());
                        //设置到访数目
                        searchMap.put("status", 2);
                        List<Map<String, Object>> daoList = customerService.queryByStatusAndSourceNew(searchMap);
                        putMap.put("daoCount", daoList.size());
                        //设置认筹数目
                        searchMap.put("status", 3);
                        List<Map<String, Object>> renList = customerService.queryByStatusAndSourceNew(searchMap);
                        putMap.put("renCount", renList.size());
                        //设置认购数目
                        searchMap.put("status", 4);
                        List<Map<String, Object>> buyList = customerService.queryByStatusAndSourceNew(searchMap);
                        putMap.put("buyCount", buyList.size());
                        //设置签约数目
                        searchMap.put("status", 5);
                        List<Map<String, Object>> signList = customerService.queryByStatusAndSourceNew(searchMap);
                        putMap.put("signCount", signList.size());
                        //设置退房数目
                        searchMap.put("status", 6);
                        List<Map<String, Object>> cancelList = customerService.queryByStatusAndSourceNew(searchMap);
                        putMap.put("cancelCount", cancelList.size());
                        //设置转化率
                        int seeCount = seeList.size();
                        int daoCount = daoList.size();
                        int renCount = renList.size();
                        int buyCount = buyList.size();
                        int signCount = signList.size();
                        if (seeCount != 0) {
                            double d = (double) daoCount / seeCount;
                            DecimalFormat df = new DecimalFormat("0.00%");
                            String numRate = df.format(d);
                            putMap.put("daoRate", numRate);
                        } else {
                            putMap.put("daoRate", "");
                        }
                        if (daoCount != 0) {
                            double d = (double) renCount / daoCount;
                            DecimalFormat df = new DecimalFormat("0.00%");
                            String numRate = df.format(d);
                            putMap.put("renRate", numRate);
                        } else {
                            putMap.put("renRate", "");
                        }
                        if (daoCount != 0) {
                            double d = (double) buyCount / daoCount;
                            DecimalFormat df = new DecimalFormat("0.00%");
                            String buyRate = df.format(d);
                            putMap.put("buyRate", buyRate);
                        } else {
                            putMap.put("buyRate", "");
                        }
                        if (daoCount != 0) {
                            double d = (double) signCount / daoCount;
                            DecimalFormat df = new DecimalFormat("0.00%");
                            String signRate = df.format(d);
                            putMap.put("signRate", signRate);
                        } else {
                            putMap.put("signRate", "");
                        }
                        list.add(putMap);

                    }
                });
            }
        } catch (Exception e) {
            e.printStackTrace();
            result.setStatus(-1);
            result.setErrorMessage("导出小来源报表失败");
            logger.error("导出小来源报表失败");
        }
        if (CollectionUtils.isNotEmpty(list)) {
            result = excelInterface.exportBySource(list, httpResponse);
        }
        return result;
    }
}
