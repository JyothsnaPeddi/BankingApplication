package com.sapient.exception;


import constant.JavaConstant;
import constant.ResourceBO;

public class UserNotFoundException extends Exception{

    public UserNotFoundException(){
        super(ResourceBO.getKey(JavaConstant.userNotFound));
    }

    public UserNotFoundException(String ex){
        super(ex);
    }
}