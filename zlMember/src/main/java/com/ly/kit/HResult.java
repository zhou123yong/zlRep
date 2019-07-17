package com.ly.kit;


import javax.xml.bind.annotation.XmlElement;

public class HResult<T> implements java.io.Serializable {

    private static final long serialVersionUID = 1L;
    private boolean dataStatus = true;
    private int status;
    private String errorMessage;

    @XmlElement
    private T data;

    public HResult() {
        this.status = 0;
        this.errorMessage = "";
        this.dataStatus = true;
    }

    public HResult(int status, boolean dataStatus, String errorMessage) {
        this.status = status;
        this.dataStatus = dataStatus;
        this.errorMessage = errorMessage == null ? "" : errorMessage;
    }


    public HResult(int status, String errorMessage, T data) {
        this.status = status;
        this.errorMessage = errorMessage == null ? "" : errorMessage;
        this.data = data;
    }

    public HResult(int status, String errorMessage) {
        this.status = status;
        this.dataStatus = status == 0;
        this.errorMessage = errorMessage == null ? "" : errorMessage;
    }

    public static HResult fail(int errorCode, String errorMessage) {
        return new HResult(errorCode, false, errorMessage);
    }

    public static HResult success(String message, Object data) {
        HResult result = new HResult(0, true, message);
        result.setData(data);
        return result;
    }

    public static HResult DEFAULT_OK() {
        return new HResult(0, true, "");
    }

    public boolean isDataStatus() {
        return dataStatus;
    }

    public void setDataStatus(boolean dataStatus) {
        this.dataStatus = dataStatus;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public T getData() {
        return data;
    }

    @XmlElement
    public void setData(T data) {
        this.data = data;
    }

}
