package com.ly.controller;

import com.ly.entity.FastDfsFile;
import com.ly.kit.FastDfsClient;
import com.ly.kit.HResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;

/**
 * @author Created by Administrator on 2019/4/18.
 */
@Controller
@RequestMapping("/upload")
public class UploadController {

    private final static Logger logger = LoggerFactory.getLogger(UploadController.class);

    private String saveFile(MultipartFile multipartFile) throws IOException {
        String[] fileAbsolutePath = {};
        String fileName = multipartFile.getOriginalFilename();
        String ext = fileName.substring(fileName.lastIndexOf(".") + 1);
        byte[] fileBuff = null;
        InputStream inputStream = multipartFile.getInputStream();

        int len1 = inputStream.available();
        fileBuff = new byte[len1];
        inputStream.read(fileBuff);

        inputStream.close();
        FastDfsFile file = new FastDfsFile(fileName, fileBuff, ext);
        try {
            //upload to fastdfs
            fileAbsolutePath = FastDfsClient.upload(file);
        } catch (Exception e) {
            logger.error("upload file Exception!", e);
        }
        if (fileAbsolutePath == null) {
            logger.error("upload file failed,please upload again!");
        }
        String path = FastDfsClient.getTrackerUrl() + fileAbsolutePath[0] + "/" + fileAbsolutePath[1];
        return path;
    }

    @PostMapping("/uploadFile")
    @ResponseBody
    public HResult singleFileUpload(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        HResult result = new HResult();
        if (file.isEmpty()) {
            result.setStatus(-1);
            result.setErrorMessage("文件不能为空");
            return result;
        }
        try {
            String path = saveFile(file);
            System.out.println(path);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("upload file failed", e);
        }
        return result;
    }

}
