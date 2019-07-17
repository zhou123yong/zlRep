package com.ly.controller;

import com.github.pagehelper.PageInfo;
import com.ly.entity.ZlUser;
import com.ly.kit.BasePageRequest;
import com.ly.kit.Constants;
import com.ly.kit.HResult;
import com.ly.kit.RequestVO;
import com.ly.service.interfaces.IZlUserInterface;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;

/**
 * @author Created by Administrator on 2019/4/8.
 */
@Controller
@RequestMapping("zlUser")
public class ZlController {

    private final static Logger logger = LoggerFactory.getLogger(ZlController.class);

    @Autowired
    private IZlUserInterface zlUserInterface;

    @RequestMapping(value = "/list")
    @ResponseBody
    public HResult userList(@RequestBody BasePageRequest<ZlUser> request) {
        HResult response = new HResult();
        try {
            if (request.getData() != null) {
                PageInfo<ZlUser> result = zlUserInterface.list(request);
                response.setData(result);
            }
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("获取会员用户列表失败!", e);
            return new HResult(Constants.SERVER_ERROR_STATUS, Constants.SERVER_ERROR_MESSAGE);
        }
        return response;
    }

    /**
     * 新增会员用户
     *
     * @param requestVO
     * @return
     */
    @RequestMapping(value = "addZlUser")
    @ResponseBody
    public HResult addZlUser(@RequestBody RequestVO<ZlUser> requestVO) {
        HResult result = new HResult();
        try {
            ZlUser zlUser = requestVO.getData();
            if (StringUtils.isBlank(zlUser.getUserName())) {
                return new HResult(Constants.SERVER_ERROR_STATUS, "会员姓名" + Constants.NOT_NULL);
            }
            if (StringUtils.isBlank(zlUser.getMobile())) {
                return new HResult(Constants.SERVER_ERROR_STATUS, "会员手机号" + Constants.NOT_NULL);
            }
            if (zlUser.getSex() == 2) {
                return new HResult(Constants.SERVER_ERROR_STATUS, "客户性别" + Constants.NOT_NULL);
            }
            zlUser.setCreateNo(0);
            zlUser.setCreateName("店主");
            zlUser.setCreateTime(new Date());
            zlUser.setUpdateNo(0);
            zlUser.setUpdateName("店主");
            zlUser.setUpdateTime(new Date());
            zlUser.setIsValid(0);
            zlUser.setIntegral(Math.round(zlUser.getPrice() / 10));
            result = zlUserInterface.addUser(zlUser);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("增加会员用户失败", e);
            return new HResult(Constants.SERVER_ERROR_STATUS, Constants.SERVER_ERROR_MESSAGE);
        }
        return result;
    }

    /**
     * 更新会员用户
     *
     * @param requestVO
     * @return
     */
    @RequestMapping(value = "updateZlUser")
    @ResponseBody
    public HResult updateZlUser(@RequestBody RequestVO<ZlUser> requestVO) {
        HResult result = new HResult();
        try {
            ZlUser oldZlUser = requestVO.getData();
            ZlUser zlUser = zlUserInterface.getById(oldZlUser.getId());
            if (StringUtils.isBlank(oldZlUser.getUserName())) {
                return new HResult(Constants.SERVER_ERROR_STATUS, "会员姓名" + Constants.NOT_NULL);
            } else {
                zlUser.setUserName(oldZlUser.getUserName());
            }
            if (StringUtils.isBlank(oldZlUser.getMobile())) {
                return new HResult(Constants.SERVER_ERROR_STATUS, "会员手机号" + Constants.NOT_NULL);
            } else {
                zlUser.setMobile(oldZlUser.getMobile());
            }
            zlUser.setUpdateTime(new Date());
            zlUser.setPrice(oldZlUser.getPrice());
            zlUser.setIntegral(Math.round(zlUser.getPrice() / 10));
            result = zlUserInterface.update(zlUser);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("修改会员用户失败", e);
            return new HResult(Constants.SERVER_ERROR_STATUS, Constants.SERVER_ERROR_MESSAGE);
        }
        return result;
    }

    /**
     * 删除会员用户
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "deleteZlUser/{id}")
    @ResponseBody
    public HResult deleteZlUser(@PathVariable int id) {
        HResult result = new HResult();
        try {
            zlUserInterface.deleteZlUser(id);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("删除会员用户失败", e);
            return new HResult(Constants.SERVER_ERROR_STATUS, Constants.SERVER_ERROR_MESSAGE);
        }
        return result;
    }

    /**
     * 会员用户新买衣服
     *
     * @param requestVO
     * @return
     */
    @RequestMapping(value = "/buyClothes")
    @ResponseBody
    public HResult buyClothes(@RequestBody RequestVO<ZlUser> requestVO) {
        HResult result = new HResult();
        try {
            ZlUser oldZlUser = requestVO.getData();
            ZlUser zlUser = zlUserInterface.getById(oldZlUser.getId());
            if (oldZlUser.getPrice() == 0) {
                return new HResult(Constants.SERVER_ERROR_STATUS, "衣服价格" + Constants.NOT_NULL);
            }
            int price = oldZlUser.getPrice() + zlUser.getPrice();
            zlUser.setUpdateTime(new Date());
            zlUser.setPrice(price);
            zlUser.setIntegral(Math.round(price / 10));
            result = zlUserInterface.buyClothes(zlUser, oldZlUser.getPrice());
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("会员新买衣服失败", e);
            return new HResult(Constants.SERVER_ERROR_STATUS, Constants.SERVER_ERROR_MESSAGE);
        }
        return result;
    }

}
