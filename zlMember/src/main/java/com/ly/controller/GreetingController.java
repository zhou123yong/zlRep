package com.ly.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.ly.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;


/**
 * @author
 * Created by Administrator on 2019/1/17.
 */
@Controller
@RequestMapping("greet")
public class GreetingController {

    private final static Logger logger = LoggerFactory.getLogger(UserController.class);
    private static String json = "";

    @RequestMapping(value = "/greeting")
    public String greeting(@RequestParam(value = "name",required = false,defaultValue = "World")String name,String password){
        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> map = new HashMap<>(10);
            map.put("name", name);
            map.put("password", password);
            json = mapper.writeValueAsString(map);
        }catch (Exception e){
            e.printStackTrace();
        }
        return "test/test2";
    }

    @RequestMapping(value = "/user")
    public String user(Model model){
        User user = new User();
        user.setUserName("Jack");
        user.setEmail("aaa.@qq.com");
        model.addAttribute("user", user);
        model.addAttribute("name", "jack");
        return "user";
    }


    @RequestMapping(value = "/")
    public String index(Model model) {
        try {
            return "/index";
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "null";
    }

    @RequestMapping(value = "/test3")
    public String test3() {
        try {
            return "greet/test3";
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "null";
    }
}

