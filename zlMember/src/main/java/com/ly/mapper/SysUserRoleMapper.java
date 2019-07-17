package com.ly.mapper;

import com.ly.entity.SysUserRole;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author
 * Created by Administrator on 2019/1/21.
 */
@Repository
public interface SysUserRoleMapper {

    List<SysUserRole> listByUserId(Integer userId);

}

