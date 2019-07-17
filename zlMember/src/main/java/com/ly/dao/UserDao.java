package com.ly.dao;


import com.ly.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @author
 * Created by Administrator on 2018/12/29.
 */
@Repository
public interface UserDao extends JpaRepository<User,Integer> {

//    @Query("select t from User t where t.name = :name")
    User findUserByUserName(@Param("name") String name);
}
