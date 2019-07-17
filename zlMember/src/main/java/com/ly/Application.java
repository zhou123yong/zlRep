package com.ly;

import org.apache.coyote.http11.AbstractHttp11Protocol;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatConnectorCustomizer;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.StringJoiner;

/**
 * @author Created by Administrator on 2018/12/29.
 */

@MapperScan("com.ly.mapper")
@EnableTransactionManagement
@SpringBootApplication
public class Application {

//    public static void main(String[] args) {
//        System.setProperty("spring.devtools.restart.enabled", "false");
//        SpringApplication.run(Application.class, args);
//    }

    @Bean
    public TomcatServletWebServerFactory tomcatEmbedded() {
        TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory();
        tomcat.addConnectorCustomizers((TomcatConnectorCustomizer) connector -> {
            if ((connector.getProtocolHandler() instanceof AbstractHttp11Protocol<?>)) {
                //-1 means unlimited
                ((AbstractHttp11Protocol<?>) connector.getProtocolHandler()).setMaxSwallowSize(-1);
            }
        });
        return tomcat;
    }

    public static void main(String[] args) {
        //demo1
//        float a = 1.0f - 0.9f;
//        float b = 0.9f - 0.8f;
//        if (a == b) {
//            System.out.println("true");
//        } else {
//            System.out.println("false");
//        }
        //demo2
//        Float a = Float.valueOf(1.0f - 0.9f);
//        Float b = Float.valueOf(0.9f - 0.8f);
//        if (a.equals(b)) {
//            System.out.println("true");
//        } else {
//            System.out.println("false");
//        }
        //demo3
//        String param = null;
//        switch (param) {
//            case "null":
//                System.out.println("null");
//                break;
//            default:
//                System.out.println("default");
//        }
        BigDecimal a = new BigDecimal(0.1);
        System.out.println(a);
        BigDecimal b = new BigDecimal("0.1");
        System.out.println(b);
    }

}
