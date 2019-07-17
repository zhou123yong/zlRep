package com.ly.kit;//package com.ly.kit;
//
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.builders.WebSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.provisioning.InMemoryUserDetailsManager;
//
///**
// * @author
// * Create by jay on 2019/1/17
// */
//
//@Configuration
//@EnableWebSecurity
//@EnableGlobalMethodSecurity(prePostEnabled = true)
//public class SecurityConfig extends WebSecurityConfigurerAdapter {
//
//
//
////    @Override
////    protected void configure(HttpSecurity http) throws Exception {
////        //不拦截的请求
////        http.authorizeRequests().antMatchers("/fail", "/login","/").permitAll().anyRequest().authenticated()
////                .and().formLogin().loginPage("/login").permitAll().successForwardUrl("/success").failureUrl("/fail")
////                .and().logout().permitAll();
////    }
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        //表单登录，permitAll()表示这个不需要验证 登录页面，登录失败页面
//        http
//                .formLogin().loginPage("/login/login").loginProcessingUrl("/login/form").failureUrl("/login/error").permitAll()
//                .and()
//                .authorizeRequests().anyRequest().authenticated()
//                .and()
//                .csrf().disable();
//    }
//
//
//    @Override
//    public void configure(WebSecurity web) throws Exception {
//        //静态资源地址
//        web.ignoring().antMatchers("/js/**", "/css/**", "/images/**", "/**/favicon.ico");
//    }
//
//    @Override
//    public void configure(AuthenticationManagerBuilder auth) throws Exception {
//        //配置的用户信息地址
//        auth.inMemoryAuthentication()
//                .withUser("user").password("password").roles("USER","USER2")
//                .and()
//                .withUser("admin").password("123456").roles("admin");
//
//    }
//
////    @Bean
////    @Override
////    public UserDetailsService userDetailsService() {
////        UserDetails user =
////                User.withDefaultPasswordEncoder()
////                        .username("user")
////                        .password("password")
////                        .roles("USER")
////                        .build();
////
////        return new InMemoryUserDetailsManager(user);
////    }
//
//}
