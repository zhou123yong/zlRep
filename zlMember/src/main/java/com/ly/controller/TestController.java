package com.ly.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Controller;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;

/**
 * @author
 * Created by Administrator on 2019/1/16.
 */
@Controller
@RequestMapping("test")
public class TestController {

    private final static Logger logger = LoggerFactory.getLogger(TestController.class);

    @Autowired
    ResourceLoader resourceLoader;

    @RequestMapping(value = "/index")
    public void index(HttpServletResponse response){
        try {
            logger.info("1111");
//            return "test/test1";
            response.setContentType("text/html");
            response.setCharacterEncoding("UTF-8");
            Resource resource = resourceLoader.getResource("classpath:/templates/test/test1.html");
            try(OutputStream os = response.getOutputStream()){
                StreamUtils.copy(resource.getInputStream(),os);
            }
        }catch (Exception e){
            e.printStackTrace();
            logger.error("index报错",e);
        }
//        return null;
    }
}
