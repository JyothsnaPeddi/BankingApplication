package com.sapient.banking_service.exception;

public class TransactionFailureException extends RuntimeException {
    public TransactionFailureException(String message) {
        super(message);
    }
}

