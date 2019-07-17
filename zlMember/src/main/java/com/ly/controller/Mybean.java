package com.ly.controller;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

/**
 * @author
 * Created by Administrator on 2019/1/2.
 */
@Component
public class Mybean implements ApplicationRunner {

    @Override
    public void run(ApplicationArguments applicationArguments) throws Exception {
        System.out.println("初始化之前调用");
    }
}
