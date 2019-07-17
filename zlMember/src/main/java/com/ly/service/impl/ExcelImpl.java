package com.ly.service.impl;

import com.ly.controller.ExcelController;
import com.ly.entity.ExcelEntity;
import com.ly.entity.TfhBindPeopleEntity;
import com.ly.entity.TfhHousesDirectSellingEntity;
import com.ly.kit.ExportInternalUtil;
import com.ly.kit.HResult;
import com.ly.mapper.BindPeopleMapper;
import com.ly.mapper.HousesDirectMapper;
import com.ly.service.interfaces.IExcelInterface;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.poi.xssf.usermodel.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * @author Created by Administrator on 2019/3/28.
 */
@Service
public class ExcelImpl implements IExcelInterface {

    private final static Logger logger = LoggerFactory.getLogger(ExcelController.class);

    @Autowired
    private BindPeopleMapper bindPeopleMapper;

    @Autowired
    private HousesDirectMapper directMapper;

    @Override
    public HResult exportExcel(List<ExcelEntity> list, HttpServletResponse response) {
        HResult result = new HResult();
        try {
            String fileName = new String(("顾问报表").getBytes("gb2312"), "iso8859-1") + ".xlsx";
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            response.setHeader("Content-Disposition", "attachment;filename=" + fileName);
            response.setCharacterEncoding("utf-8");

            String[] titles = {"楼盘id", "楼盘名称", "安家顾问", "web端400", "移动端400", "楼盘400", "城市"};
            //设置格式
            ServletOutputStream outputStream = response.getOutputStream();

            exportCustomer(titles, list, outputStream);

        } catch (Exception e) {
            e.printStackTrace();
            result.setStatus(-1);
            result.setErrorMessage("导出失败");
            logger.error("导出失败");
        }
        return result;
    }

    private void exportCustomer(String[] titles, List<ExcelEntity> list, ServletOutputStream outputStream) {
        // 创建一个workbook 对应一个excel应用文件
        XSSFWorkbook workBook = new XSSFWorkbook();
        // 在workbook中添加一个sheet,对应Excel文件中的sheet
        //Sheet名称，可以自定义中文名称
        XSSFSheet sheet = workBook.createSheet("Sheet1");
        ExportInternalUtil exportUtil = new ExportInternalUtil(workBook, sheet);
        XSSFCellStyle headStyle = exportUtil.getHeadStyle();
        XSSFCellStyle bodyStyle = exportUtil.getBodyStyle();
        // 构建表头
        XSSFRow headRow = sheet.createRow(0);
        XSSFCell cell = null;
        // 输出标题
        for (int i = 0; i < titles.length; i++) {
            cell = headRow.createCell(i);
            cell.setCellStyle(headStyle);
            cell.setCellValue(titles[i]);
        }
        // 构建表体数据
        for (int j = 0; j < list.size(); j++) {
            XSSFRow bodyRow = sheet.createRow(j + 1);
            ExcelEntity entity = list.get(j);
            cell = bodyRow.createCell(0);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(entity.getId());

            cell = bodyRow.createCell(1);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(entity.getHouseName());

            cell = bodyRow.createCell(2);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(entity.getUserName());

            cell = bodyRow.createCell(3);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(entity.getWebPhone());

            cell = bodyRow.createCell(4);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(entity.getMobilePhone());

            cell = bodyRow.createCell(5);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(entity.getCornet());

            cell = bodyRow.createCell(6);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(entity.getCity());
        }
        try {
            workBook.write(outputStream);
            outputStream.flush();
            outputStream.close();
        } catch (IOException e) {
            logger.error("", e);
        } finally {
            try {
                outputStream.close();
            } catch (IOException e) {
                logger.error("导出excel报表2失败", e);
            }
        }
    }

    @Override
    public List<TfhBindPeopleEntity> queryByConditions(Map<String, Object> map) {
        List<TfhBindPeopleEntity> list = bindPeopleMapper.queryByConditions(map);
        if (CollectionUtils.isNotEmpty(list)) {
            return list;
        }
        return Collections.emptyList();
    }

    @Override
    public List<TfhHousesDirectSellingEntity> queryList(Map<String, Object> map) {
        List<TfhHousesDirectSellingEntity> list = directMapper.queryByConditions(map);
        if (CollectionUtils.isNotEmpty(list)) {
            return list;
        }
        return Collections.emptyList();
    }

    @Override
    public HResult exportBySource(List<Map<String, Object>> list, HttpServletResponse response) {
        HResult result = new HResult();
        try {
            String fileName = new String(("小来源报表").getBytes("gb2312"), "iso8859-1") + ".xlsx";
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            response.setHeader("Content-Disposition", "attachment;filename=" + fileName);
            response.setCharacterEncoding("utf-8");

            String[] titles = {"来源名称", "客户量", "已跟进量", "约看", "到访", "到访转化率", "认筹", "认筹转化率", "认购", "认购转化率", "签约", "签约转化率", "退房", "城市"};
            //设置格式
            ServletOutputStream outputStream = response.getOutputStream();

            exportCustomerBySource(titles, list, outputStream);

        } catch (Exception e) {
            e.printStackTrace();
            result.setStatus(-1);
            result.setErrorMessage("导出来源报表失败");
            logger.error("导出来源报表失败");
        }
        return result;
    }

    private void exportCustomerBySource(String[] titles, List<Map<String, Object>> list, ServletOutputStream outputStream) {
        // 创建一个workbook 对应一个excel应用文件
        XSSFWorkbook workBook = new XSSFWorkbook();
        // 在workbook中添加一个sheet,对应Excel文件中的sheet
        //Sheet名称，可以自定义中文名称
        XSSFSheet sheet = workBook.createSheet("Sheet1");
        ExportInternalUtil exportUtil = new ExportInternalUtil(workBook, sheet);
        XSSFCellStyle headStyle = exportUtil.getHeadStyle();
        XSSFCellStyle bodyStyle = exportUtil.getBodyStyle();
        // 构建表头
        XSSFRow headRow = sheet.createRow(0);
        XSSFCell cell = null;
        // 输出标题
        for (int i = 0; i < titles.length; i++) {
            cell = headRow.createCell(i);
            cell.setCellStyle(headStyle);
            cell.setCellValue(titles[i]);
        }
        // 构建表体数据
        for (int j = 0; j < list.size(); j++) {
            XSSFRow bodyRow = sheet.createRow(j + 1);
            Map<String, Object> map = list.get(j);
            cell = bodyRow.createCell(0);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(map.get("name").toString());

            cell = bodyRow.createCell(1);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(map.get("count").toString());

            cell = bodyRow.createCell(2);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(map.get("callBackCount").toString());

            cell = bodyRow.createCell(3);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(map.get("seeCount").toString());

            cell = bodyRow.createCell(4);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(map.get("daoCount").toString());

            cell = bodyRow.createCell(5);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(map.get("daoRate").toString());

            cell = bodyRow.createCell(6);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(map.get("renCount").toString());

            cell = bodyRow.createCell(7);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(map.get("renRate").toString());

            cell = bodyRow.createCell(8);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(map.get("buyCount").toString());

            cell = bodyRow.createCell(9);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(map.get("buyRate").toString());

            cell = bodyRow.createCell(10);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(map.get("signCount").toString());

            cell = bodyRow.createCell(11);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(map.get("signRate").toString());

            cell = bodyRow.createCell(12);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(map.get("cancelCount").toString());

            cell = bodyRow.createCell(13);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(map.get("city").toString());

        }
        try {
            workBook.write(outputStream);
            outputStream.flush();
        } catch (IOException e) {
            logger.error("导出来源报表失败", e);
        } finally {
            if (outputStream != null) {
                try {
                    outputStream.close();
                } catch (IOException e) {
                    logger.error("导出来源报表失败", e);
                }
            }
        }
    }
}
