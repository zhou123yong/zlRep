package com.ly.controller;


import com.github.pagehelper.PageInfo;
import com.ly.entity.User;
import com.ly.kit.BasePageRequest;
import com.ly.kit.Constants;
import com.ly.kit.HResult;
import com.ly.service.interfaces.IUserInterface;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Controller;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;

/**
 * @author Created by Administrator on 2018/12/29.
 */
@Controller
@RequestMapping("user")
public class UserController {

    private final static Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private IUserInterface userInterface;
    @Autowired
    ResourceLoader resourceLoader;

    @RequestMapping(value = "/index")
    public void index(HttpServletResponse response) {
        try {
            logger.info("1111");
            response.setContentType("text/html");
            response.setCharacterEncoding("UTF-8");
            Resource resource = resourceLoader.getResource("classpath:/templates/user/index.html");
            try (OutputStream os = response.getOutputStream()) {
                StreamUtils.copy(resource.getInputStream(), os);
            }
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("index报错", e);
        }
    }

    @RequestMapping(value = "/test")
    public String index() {
        try {
            return "user/index";
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("index报错", e);
        }
        return null;
    }

    @RequestMapping(value = "/home")
    public String home() {
        try {
            return "redirect:/#/home";
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("index报错", e);
        }
        return null;
    }

    @RequestMapping(value = "/show")
    @ResponseBody
    public String show(@RequestParam(value = "name") String name) {
        try {
            User user = userInterface.findByName(name);
            if (null != user) {
                return user.getId() + "/" + user.getUserName() + "/" + user.getProjectName();
            }
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("show报错", e);
        }
        return "null";
    }

    @RequestMapping(value = "/userList")
    @ResponseBody
    public HResult userList(@RequestBody BasePageRequest<User> request) {
        HResult response = new HResult();
        try {
            if (request.getData() != null) {
                PageInfo<User> result = userInterface.list(request);
                response.setData(result);
            }
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("show user failed!", e);
            return new HResult(Constants.SERVER_ERROR_STATUS, Constants.SERVER_ERROR_MESSAGE);
        }
        return response;
    }

}
