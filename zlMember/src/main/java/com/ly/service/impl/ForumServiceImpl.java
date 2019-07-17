package com.ly.service.impl;

import com.ly.service.interfaces.ForumService;

/**
 * @author
 * Created by Administrator on 2019/3/26.
 */
public class ForumServiceImpl implements ForumService {

    @Override
    public void removeTopic(int topicId) {
//        PerformanceMonitor
        System.out.println("删除topic记录：" + topicId);
        try{
            Thread.currentThread().sleep(20);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public void removeForum(int forumId) {
        System.out.println("删除forum记录：" + forumId);
        try{
            Thread.currentThread().sleep(40);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
