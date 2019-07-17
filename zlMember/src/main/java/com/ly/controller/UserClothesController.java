package com.ly.controller;

import com.github.pagehelper.PageInfo;
import com.ly.entity.UserClothes;
import com.ly.kit.BasePageRequest;
import com.ly.kit.Constants;
import com.ly.kit.HResult;
import com.ly.service.interfaces.IUserClothesInterface;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author Created by Administrator on 2019/4/12.
 */
@Controller
@RequestMapping("userClothes")
public class UserClothesController {

    private final static Logger logger = LoggerFactory.getLogger(UserClothesController.class);

    @Autowired
    private IUserClothesInterface clothesInterface;

    @RequestMapping(value = "/list")
    @ResponseBody
    public HResult userList(@RequestBody BasePageRequest<UserClothes> request) {
        HResult response = new HResult();
        try {
            if (request.getData() != null) {
                PageInfo<UserClothes> result = clothesInterface.list(request);
                response.setData(result);
            }
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("获取用户衣服列表失败!", e);
            return new HResult(Constants.SERVER_ERROR_STATUS, Constants.SERVER_ERROR_MESSAGE);
        }
        return response;
    }

    /**
     * 删除商品功能
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "delete/{id}")
    @ResponseBody
    public HResult deleteZlUser(@PathVariable int id) {
        HResult result = new HResult();
        try {
            result = clothesInterface.delete(id);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("删除会员商品失败", e);
            return new HResult(Constants.SERVER_ERROR_STATUS, Constants.SERVER_ERROR_MESSAGE);
        }
        return result;
    }
}
