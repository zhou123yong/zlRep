package com.ly.controller;//package com.ly.controller;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
///**
// * @author
// * Created by Administrator on 2019/1/18.
// */
////@Controller
////@RequestMapping("/login")
////public class LoginController {
////
////    @RequestMapping("/login")
////    public String userLogin(){
////        return "login/login";
////    }
////
////    @RequestMapping("/login-error")
////    public String loginError(){
////        return "login/error";
////    }
////
////}
//
//@Controller
//public class LoginController {
//
//    private Logger logger = LoggerFactory.getLogger(LoginController.class);
//
//    @RequestMapping("/home")
//    public String showHome() {
//        String name = SecurityContextHolder.getContext().getAuthentication().getName();
//        logger.info("当前登陆用户：" + name);
//        return "login1/home";
//    }
//
//    @RequestMapping("/login")
//    public String showLogin() {
//        return "login1/login";
//    }
//
//    @RequestMapping("/admin")
//    @ResponseBody
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
//    public String printAdmin() {
//        return "如果你看见这句话，说明你有ROLE_ADMIN角色";
//    }
//
//    @RequestMapping("/user")
//    @ResponseBody
//    @PreAuthorize("hasRole('ROLE_USER')")
//    public String printUser() {
//        return "如果你看见这句话，说明你有ROLE_USER角色";
//    }
//}
//
