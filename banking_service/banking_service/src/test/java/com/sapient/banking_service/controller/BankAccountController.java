package com.sapient.banking_service.controller;

import com.sapient.banking_service.dao.BankAccountRepository;
import com.sapient.banking_service.entity.AccountTypes;
import com.sapient.banking_service.entity.BankAccount;

import com.sapient.banking_service.exception.AccountAlreadyExistsException;
import com.sapient.banking_service.exception.InsufficientFundsException;
import com.sapient.banking_service.service.BankService;

import com.sapient.banking_service.to.RequestTo;
import com.sapient.banking_service.to.TransferTo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import javax.security.auth.login.AccountNotFoundException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;



public class BankAccountController {
    @Mock
    private BankService bankService;

    @InjectMocks
    private BankController bankController;
    @Mock
    private BankAccountRepository bankAccountRepository;
    @BeforeEach
    public void setUp()
    {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testCreateNewBankAccount_Success() {
        // Arrange
        Integer userId = 1;
        AccountTypes accountTypes = AccountTypes.SAVINGS;
        BankAccount bankAccount = new BankAccount();
        bankAccount.setBankId(1);
        bankAccount.setAccountNumber("123456789");
        bankAccount.setAccountTypes(accountTypes);
        bankAccount.setBalance(0.0);

        when(bankService.createBankAccount(userId, accountTypes)).thenReturn(bankAccount);

        // Act
        ResponseEntity<Object> responseEntity = bankController.createNewBankAccount(userId, accountTypes);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(bankAccount, responseEntity.getBody());

        verify(bankService, times(1)).createBankAccount(userId, accountTypes);
    }



    @Test
    public void testCreateNewBankAccount_AccountAlreadyExists() {
        // Arrange
        Integer userId = 1;
        AccountTypes accountTypes = AccountTypes.SAVINGS;
        String errorMessage = "Account already exists for type: " + accountTypes;

        when(bankService.createBankAccount(userId, accountTypes))
                .thenThrow(new AccountAlreadyExistsException(errorMessage));

        // Act
        ResponseEntity<Object> responseEntity = bankController.createNewBankAccount(userId, accountTypes);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals(errorMessage, responseEntity.getBody());

        verify(bankService, times(1)).createBankAccount(userId, accountTypes);
    }
    @Test
    public void testGetAllBankAccountsByUserId_Success() {
        // Arrange
        Integer userId = 1;
        List<BankAccount> bankAccounts = new ArrayList<>();
        BankAccount bankAccount = new BankAccount();
        AccountTypes accountTypes = AccountTypes.SAVINGS;
        bankAccount.setBankId(1);
        bankAccount.setAccountNumber("123456789");
        bankAccount.setAccountTypes(accountTypes);
        bankAccount.setBalance(0.0);
        bankAccounts.add(bankAccount);

        when(bankAccountRepository.findByUser_UserId(userId)).thenReturn(bankAccounts);

        // Act
        ResponseEntity<Object> responseEntity = bankController.getAllBankAccountsByUserId(userId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(bankAccounts, responseEntity.getBody());

        verify(bankAccountRepository, times(1)).findByUser_UserId(userId);
    }


    @Test
    public void testGetAllBankAccountsByUserId_NoAccountsFound() {
        // Arrange
        Integer userId = 1;
        List<BankAccount> bankAccounts = new ArrayList<>();

        when(bankAccountRepository.findByUser_UserId(userId)).thenReturn(bankAccounts);

        // Act
        ResponseEntity<Object> responseEntity = bankController.getAllBankAccountsByUserId(userId);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertEquals("No bank accounts found for user ID: " + userId, responseEntity.getBody());

        verify(bankAccountRepository, times(1)).findByUser_UserId(userId);
    }
    @Test
    public void testWithdraw_Success() throws AccountNotFoundException {
        // Arrange
        Integer userId = 1;
        AccountTypes accountTypes = AccountTypes.SAVINGS;
        double amount = 100.0;
        double newBalance = 900.0;
        RequestTo requestTo=new RequestTo();
        requestTo.setUserId(1);
        requestTo.setAccountTypes(accountTypes);
        requestTo.setAmount(amount);

        when(bankService.withdraw(userId, accountTypes, amount)).thenReturn(newBalance);

        // Act
        ResponseEntity<Object> responseEntity = bankController.withdraw(requestTo);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(newBalance, responseEntity.getBody());

        verify(bankService, times(1)).withdraw(userId, accountTypes, amount);
    }

    @Test
    public void testWithdraw_AccountNotFound() throws AccountNotFoundException {
        // Arrange
        Integer userId = 1;
        AccountTypes accountTypes = AccountTypes.SAVINGS;
        double amount = 100.0;
        String errorMessage = "Account not found for user ID: " + userId + " and account type: " + accountTypes;
        RequestTo requestTo=new RequestTo();
        requestTo.setUserId(1);
        requestTo.setAccountTypes(accountTypes);
        requestTo.setAmount(amount);

        when(bankService.withdraw(userId, accountTypes, amount)).thenThrow(new AccountNotFoundException(errorMessage));

        // Act
        ResponseEntity<Object> responseEntity = bankController.withdraw(requestTo);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals(errorMessage, responseEntity.getBody());

        verify(bankService, times(1)).withdraw(userId, accountTypes, amount);
    }

    @Test
    public void testWithdraw_InsufficientFunds() throws AccountNotFoundException {
        // Arrange
        Integer userId = 1;
        AccountTypes accountTypes = AccountTypes.SAVINGS;
        double amount = 1200.0;
        String errorMessage = "Insufficient funds";
        RequestTo requestTo=new RequestTo();
        requestTo.setUserId(1);
        requestTo.setAccountTypes(accountTypes);
        requestTo.setAmount(amount);

        when(bankService.withdraw(userId, accountTypes, amount)).thenThrow(new InsufficientFundsException(errorMessage));

        // Act
        ResponseEntity<Object> responseEntity = bankController.withdraw(requestTo);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals(errorMessage, responseEntity.getBody());

        verify(bankService, times(1)).withdraw(userId, accountTypes, amount);
    }

    @Test
    public void testWithdraw_InternalServerError() throws AccountNotFoundException {
        // Arrange
        Integer userId = 1;
        AccountTypes accountTypes = AccountTypes.SAVINGS;
        double amount = 100.0;
        String errorMessage = "Internal server error occurred";
        RequestTo requestTo=new RequestTo();
        requestTo.setUserId(1);
        requestTo.setAccountTypes(accountTypes);
        requestTo.setAmount(amount);

        when(bankService.withdraw(userId, accountTypes, amount)).thenThrow(new RuntimeException(errorMessage));

        // Act
        ResponseEntity<Object> responseEntity = bankController.withdraw(requestTo);

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        assertEquals("An unexpected error occurred: " + errorMessage, responseEntity.getBody());

        verify(bankService, times(1)).withdraw(userId, accountTypes, amount);
    }
    @Test
    public void testDeposit_Success() throws AccountNotFoundException {
        // Arrange
        Integer userId = 1;
        AccountTypes accountTypes = AccountTypes.SAVINGS;
        double amount = 100.0;
        double newBalance = 1100.0;
        RequestTo requestTo=new RequestTo();
        requestTo.setUserId(1);
        requestTo.setAccountTypes(accountTypes);
        requestTo.setAmount(amount);

        when(bankService.deposit(userId, accountTypes, amount)).thenReturn(newBalance);

        // Act
        ResponseEntity<Object> responseEntity = bankController.deposit(requestTo);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(newBalance, responseEntity.getBody());

        verify(bankService, times(1)).deposit(userId, accountTypes, amount);
    }

    @Test
    public void testDeposit_AccountNotFound() throws AccountNotFoundException {
        // Arrange
        Integer userId = 1;
        AccountTypes accountTypes = AccountTypes.SAVINGS;
        double amount = 100.0;
        String errorMessage = "Account not found for user ID: " + userId + " and account type: " + accountTypes;

        when(bankService.deposit(userId, accountTypes, amount)).thenThrow(new AccountNotFoundException(errorMessage));
        RequestTo requestTo=new RequestTo();
        requestTo.setUserId(1);
        requestTo.setAccountTypes(accountTypes);
        requestTo.setAmount(amount);

        // Act
        ResponseEntity<Object> responseEntity = bankController.deposit(requestTo);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals(errorMessage, responseEntity.getBody());

        verify(bankService, times(1)).deposit(userId, accountTypes, amount);
    }

    @Test
    public void testDeposit_InternalServerError() throws AccountNotFoundException {
        // Arrange
        Integer userId = 1;
        AccountTypes accountTypes = AccountTypes.SAVINGS;
        double amount = 100.0;
        String errorMessage = "Internal server error occurred";

        when(bankService.deposit(userId, accountTypes, amount)).thenThrow(new RuntimeException(errorMessage));
        RequestTo requestTo=new RequestTo();
        requestTo.setUserId(1);
        requestTo.setAccountTypes(accountTypes);
        requestTo.setAmount(amount);

        // Act
        ResponseEntity<Object> responseEntity = bankController.deposit(requestTo);

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        assertEquals("An unexpected error occurred: " + errorMessage, responseEntity.getBody());

        verify(bankService, times(1)).deposit(userId, accountTypes, amount);
    }
    @Test
    public void testTransfer_Success() throws AccountNotFoundException {
        // Arrange
        Integer userId = 1;
        AccountTypes transferAcc = AccountTypes.SAVINGS;
        AccountTypes beneficialAcc = AccountTypes.PF;
        double amount = 100.0;
        String successMessage = "Success";

        when(bankService.transfer(userId, transferAcc, beneficialAcc, amount)).thenReturn(successMessage);
        TransferTo transferTo=new TransferTo();
        transferTo.setUserId(1);
        transferTo.setTransferAcc(transferAcc);
        transferTo.setBeneficialAcc(beneficialAcc);
        transferTo.setAmount(amount);

        // Act
        ResponseEntity<String> responseEntity = bankController.transfer(transferTo);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(successMessage, responseEntity.getBody());

        verify(bankService, times(1)).transfer(userId, transferAcc, beneficialAcc, amount);
    }



    @Test
    public void testTransfer_InternalServerError() throws AccountNotFoundException {
        // Arrange
        Integer userId = 1;
        AccountTypes transferAcc = AccountTypes.SAVINGS;
        AccountTypes beneficialAcc = AccountTypes.PF;
        double amount = 100.0;
        String errorMessage = "Internal server error occurred";
        TransferTo transferTo=new TransferTo();
        transferTo.setUserId(1);
        transferTo.setTransferAcc(transferAcc);
        transferTo.setBeneficialAcc(beneficialAcc);
        transferTo.setAmount(amount);

        when(bankService.transfer(userId, transferAcc, beneficialAcc, amount)).thenThrow(new RuntimeException(errorMessage));

        // Act
        ResponseEntity<String> responseEntity = bankController.transfer(transferTo);

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        assertEquals("An unexpected error occurred: " + errorMessage, responseEntity.getBody());

        verify(bankService, times(1)).transfer(userId, transferAcc, beneficialAcc, amount);
    }
    @Test
    public void testGetBalance_Success() throws AccountNotFoundException {
        // Arrange
        Integer userId = 1;
        AccountTypes accountTypes = AccountTypes.SAVINGS;
        Double balance = 1000.0;

        when(bankService.getBalance(userId, accountTypes)).thenReturn(balance);

        // Act
        ResponseEntity<Object> responseEntity = bankController.getBalance(userId, accountTypes);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(balance, responseEntity.getBody());

        verify(bankService, times(1)).getBalance(userId, accountTypes);
    }

    @Test
    public void testGetBalance_AccountNotFound() throws AccountNotFoundException {
        // Arrange
        Integer userId = 1;
        AccountTypes accountTypes = AccountTypes.SAVINGS;

        when(bankService.getBalance(userId, accountTypes)).thenThrow(new AccountNotFoundException("Account not found"));

        // Act
        ResponseEntity<Object> responseEntity = bankController.getBalance(userId, accountTypes);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals("Account Not Found", responseEntity.getBody());

        verify(bankService, times(1)).getBalance(userId, accountTypes);
    }
}
