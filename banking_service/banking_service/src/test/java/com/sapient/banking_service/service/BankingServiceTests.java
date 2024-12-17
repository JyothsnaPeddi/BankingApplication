package com.sapient.banking_service.service;

import com.sapient.banking_service.dao.BankAccountRepository;
import com.sapient.banking_service.dao.UserRepository;
import com.sapient.banking_service.entity.AccountTypes;
import com.sapient.banking_service.entity.BankAccount;
import com.sapient.banking_service.entity.User;

import com.sapient.banking_service.exception.AccountAlreadyExistsException;
import com.sapient.banking_service.exception.InsufficientFundsException;
import com.sapient.banking_service.exception.TransactionFailureException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import javax.security.auth.login.AccountNotFoundException;
import java.util.ArrayList;
import java.util.Arrays;

import static org.hamcrest.Matchers.any;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class BankingServiceTests {


    @Mock
    private UserRepository userRepository;

    @Mock
    private BankAccountRepository bankAccountRepository;

    @InjectMocks
    private BankService bankService;

    private User user;
    private BankAccount bankAccount;
    private AccountTypes accountTypes;

    @BeforeEach
    public void setUp() {
        accountTypes = AccountTypes.SAVINGS;
        user = new User();
        user.setUserId(1);
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john.doe@example.com");
        user.setMobileNumber("1234567890");
        user.setPassword("password");
        user.setBankAccounts(new ArrayList<>());


         bankAccount = new BankAccount();
        bankAccount.setUser(user);
        bankAccount.setAccountNumber("123456789");
        bankAccount.setAccountTypes(accountTypes);
        bankAccount.setBalance(1000.00);
        user.getBankAccounts().add(bankAccount);

        AccountTypes transferAccType = AccountTypes.SAVINGS;
        AccountTypes beneficiaryAccType = AccountTypes.BUISNESS;

        BankAccount transferAccount = new BankAccount();

    }



    @Test
    public void testGenerateUniqueAccountNumber() {
        when(bankAccountRepository.existsByAccountNumber(anyString())).thenReturn(false);
        String accountNumber = bankService.generateUniqueAccountNumber();
        assertTrue(accountNumber.startsWith("ACC"));
        assertEquals(9, accountNumber.length());
    }
    @Test
    public void testCreateBankAccount_Success() {
        // Prepare a user and expected bank account
        User user = new User();
        user.setUserId(1);

        BankAccount expectedBankAccount = new BankAccount();
        expectedBankAccount.setAccountNumber("ACC123456");
        expectedBankAccount.setAccountTypes(AccountTypes.SAVINGS);

        // Mocking userRepository to return the prepared user
        when(userRepository.findByUserId(1)).thenReturn(user);


        ArgumentCaptor<BankAccount> bankAccountCaptor = ArgumentCaptor.forClass(BankAccount.class);
        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);

        // Mocking bankAccountRepository save method
        when(bankAccountRepository.save(bankAccountCaptor.capture())).thenReturn(expectedBankAccount);

        // Mocking userRepository save method
        when(userRepository.save(userCaptor.capture())).thenReturn(user);

        // Calling the method under test
        BankAccount createdAccount = bankService.createBankAccount(1, AccountTypes.SAVINGS);

        // Assertions
        assertNotNull(createdAccount);

        assertEquals(AccountTypes.SAVINGS, createdAccount.getAccountTypes());

        // Verify userRepository.findByUserId(1) called once
        verify(userRepository, times(1)).findByUserId(1);

        // Verify bankAccountRepository.save(...) called once with captured argument
        verify(bankAccountRepository, times(1)).save(bankAccountCaptor.capture());
        assertEquals(AccountTypes.SAVINGS, bankAccountCaptor.getValue().getAccountTypes());

        // Verify userRepository.save(...) called once with captured argument
        verify(userRepository, times(1)).save(userCaptor.capture());
        assertEquals(1, userCaptor.getValue().getUserId());
    }
    @Test
    public void testCreateBankAccount_AccountAlreadyExists() {
        // Setting up existing account for the user
        user.getBankAccounts().add(bankAccount);

        // Mocking userRepository to return a user
        when(userRepository.findByUserId(1)).thenReturn(user);
        ArgumentCaptor<BankAccount> bankAccountCaptor = ArgumentCaptor.forClass(BankAccount.class);
        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);

        // Calling the method under test and asserting for exception
        Exception exception = assertThrows(AccountAlreadyExistsException.class, () -> {
            bankService.createBankAccount(1, AccountTypes.SAVINGS);
        });

        // Verifying interactions
        verify(userRepository, times(1)).findByUserId(1);
        verify(bankAccountRepository, never()).save(bankAccountCaptor.capture());
        verify(userRepository, never()).save(userCaptor.capture());
    }


    @Test
    public void testGenerateUniqueAccountNumber_WithCollision() {
        when(bankAccountRepository.existsByAccountNumber(anyString())).thenReturn(true).thenReturn(false);
        String accountNumber = bankService.generateUniqueAccountNumber();
        assertTrue(accountNumber.startsWith("ACC"));
        assertEquals(9, accountNumber.length());
        verify(bankAccountRepository, times(2)).existsByAccountNumber(anyString());
    }

    @Test
    public void testWithdraw_Success() throws AccountNotFoundException, InsufficientFundsException {
        // Arrange
        double withdrawAmount = 200.00;
        when(bankAccountRepository.findByUserUserIdAndAccountTypes(user.getUserId(), accountTypes)).thenReturn(bankAccount);

        // Act
        double newBalance = bankService.withdraw(user.getUserId(), accountTypes, withdrawAmount);

        // Assert
        assertEquals(800.00, newBalance);

        ArgumentCaptor<BankAccount> bankAccountCaptor = ArgumentCaptor.forClass(BankAccount.class);
        verify(bankAccountRepository, times(1)).save(bankAccountCaptor.capture());
        BankAccount savedBankAccount = bankAccountCaptor.getValue();

        assertEquals(bankAccount.getBankId(), savedBankAccount.getBankId());
        assertEquals(bankAccount.getAccountNumber(), savedBankAccount.getAccountNumber());
        assertEquals(800.00, savedBankAccount.getBalance());
        assertEquals(bankAccount.getAccountTypes(), savedBankAccount.getAccountTypes());
    }


    @Test
    public void testWithdraw_AccountNotFound() {
        // Arrange
        when(bankAccountRepository.findByUserUserIdAndAccountTypes(user.getUserId(), accountTypes)).thenReturn(null);

        // Act & Assert
        AccountNotFoundException exception = assertThrows(AccountNotFoundException.class, () -> {
            bankService.withdraw(user.getUserId(), accountTypes, 200.00);
        });

        assertEquals("Account not found for user ID: " + user.getUserId() + " and account type: " + accountTypes, exception.getMessage());

        // Verify that the repository methods were called the expected number of times
        verify(bankAccountRepository, times(1)).findByUserUserIdAndAccountTypes(user.getUserId(), accountTypes);
        verify(bankAccountRepository, never()).save(isA(BankAccount.class));
    }

    @Test
    public void testWithdraw_InsufficientFunds() {
        // Arrange
        double withdrawAmount = 1200.00;
        when(bankAccountRepository.findByUserUserIdAndAccountTypes(user.getUserId(), accountTypes)).thenReturn(bankAccount);

        // Act & Assert
        InsufficientFundsException exception = assertThrows(InsufficientFundsException.class, () -> {
            bankService.withdraw(user.getUserId(), accountTypes, withdrawAmount);
        });

        assertEquals("Insufficient Funds", exception.getMessage());

        // Verify that the repository methods were called the expected number of times
        verify(bankAccountRepository, times(1)).findByUserUserIdAndAccountTypes(user.getUserId(), accountTypes);
        verify(bankAccountRepository, never()).save(isA(BankAccount.class));
    }
    @Test
    public void testDeposit_Success() throws AccountNotFoundException {
        // Arrange
        double depositAmount = 200.00;
        when(bankAccountRepository.findByUserUserIdAndAccountTypes(user.getUserId(), accountTypes)).thenReturn(bankAccount);

        // Act
        double newBalance = bankService.deposit(user.getUserId(), accountTypes, depositAmount);

        // Assert
        assertEquals(1200.00, newBalance);

        ArgumentCaptor<BankAccount> bankAccountCaptor = ArgumentCaptor.forClass(BankAccount.class);
        verify(bankAccountRepository, times(1)).save(bankAccountCaptor.capture());
        BankAccount savedBankAccount = bankAccountCaptor.getValue();

        assertEquals(bankAccount.getBankId(), savedBankAccount.getBankId());
        assertEquals(bankAccount.getAccountNumber(), savedBankAccount.getAccountNumber());
        assertEquals(1200.00, savedBankAccount.getBalance());
        assertEquals(bankAccount.getAccountTypes(), savedBankAccount.getAccountTypes());
    }

    @Test
    public void testDeposit_AccountNotFound() {
        // Arrange
        when(bankAccountRepository.findByUserUserIdAndAccountTypes(user.getUserId(), accountTypes)).thenReturn(null);

        // Act & Assert
        AccountNotFoundException exception = assertThrows(AccountNotFoundException.class, () -> {
            bankService.deposit(user.getUserId(), accountTypes, 200.00);
        });

        assertEquals("Account not found for user ID: " + user.getUserId() + " and account type: " + accountTypes, exception.getMessage());

        // Verify that the repository methods were called the expected number of times
        verify(bankAccountRepository, times(1)).findByUserUserIdAndAccountTypes(user.getUserId(), accountTypes);
        verify(bankAccountRepository, never()).save(isA(BankAccount.class));
    }
    @Test
    public void testTransfer_Successful() throws AccountNotFoundException {
        AccountTypes transferAccType = AccountTypes.SAVINGS;
        AccountTypes beneficiaryAccType = AccountTypes.BUISNESS;
        BankAccount transferAccount=new BankAccount();
        transferAccount.setBankId(1);
        transferAccount.setAccountNumber("123456789");
        transferAccount.setAccountTypes(transferAccType);
        transferAccount.setBalance(1000.00);
        transferAccount.setUser(user);

        BankAccount beneficiaryAccount = new BankAccount();
        beneficiaryAccount.setBankId(2);
        beneficiaryAccount.setAccountNumber("987654321");
        beneficiaryAccount.setAccountTypes(beneficiaryAccType);
        beneficiaryAccount.setBalance(500.00);
        beneficiaryAccount.setUser(user);

        user.getBankAccounts().add(transferAccount);
        user.getBankAccounts().add(beneficiaryAccount);
        // Arrange
        double transferAmount = 200.00;
        when(bankAccountRepository.findByUserUserIdAndAccountTypes(user.getUserId(), transferAccType)).thenReturn(transferAccount);
        when(bankAccountRepository.findByUserUserIdAndAccountTypes(user.getUserId(), beneficiaryAccType)).thenReturn(beneficiaryAccount);

        // Act
        String result = bankService.transfer(user.getUserId(), transferAccType, beneficiaryAccType, transferAmount);

        // Assert
        assertEquals("Success", result);
        assertEquals(800.00, transferAccount.getBalance());
        assertEquals(700.00, beneficiaryAccount.getBalance());

        verify(bankAccountRepository, times(1)).findByUserUserIdAndAccountTypes(user.getUserId(), transferAccType);
        verify(bankAccountRepository, times(1)).findByUserUserIdAndAccountTypes(user.getUserId(), beneficiaryAccType);
        verify(bankAccountRepository, times(1)).save(transferAccount);
        verify(bankAccountRepository, times(1)).save(beneficiaryAccount);
    }

    @Test
    public void testTransfer_InsufficientFunds() {
        AccountTypes transferAccType = AccountTypes.SAVINGS;
        AccountTypes beneficiaryAccType = AccountTypes.BUISNESS;
        BankAccount transferAccount=new BankAccount();
        transferAccount.setBankId(1);
        transferAccount.setAccountNumber("123456789");
        transferAccount.setAccountTypes(transferAccType);
        transferAccount.setBalance(1000.00);
        transferAccount.setUser(user);
        // Arrange
        double transferAmount = 1200.00;
        when(bankAccountRepository.findByUserUserIdAndAccountTypes(user.getUserId(), transferAccType)).thenReturn(transferAccount);

        // Act & Assert
        TransactionFailureException exception = assertThrows(TransactionFailureException.class, () -> {
            bankService.transfer(user.getUserId(), transferAccType, beneficiaryAccType, transferAmount);
        });

        assertEquals("Transaction Failure: Insufficient Funds", exception.getMessage());

        // Verify that the repository methods were called the expected number of times
        verify(bankAccountRepository, times(1)).findByUserUserIdAndAccountTypes(user.getUserId(), transferAccType);
        verify(bankAccountRepository, never()).findByUserUserIdAndAccountTypes(user.getUserId(), beneficiaryAccType);
        verify(bankAccountRepository, never()).save(isA(BankAccount.class));
    }
    @Test
    public void testGetBalance_AccountExists() throws AccountNotFoundException {
        // Arrange
        when(bankAccountRepository.findByUserUserIdAndAccountTypes(user.getUserId(), accountTypes)).thenReturn(bankAccount);

        // Act
        double balance = bankService.getBalance(user.getUserId(), accountTypes);

        // Assert
        assertEquals(1000.00, balance);

        verify(bankAccountRepository, times(1)).findByUserUserIdAndAccountTypes(user.getUserId(), accountTypes);
    }

    @Test
    public void testGetBalance_AccountNotFound() {
        // Arrange
        when(bankAccountRepository.findByUserUserIdAndAccountTypes(user.getUserId(), accountTypes)).thenReturn(null);

        // Act & Assert
        AccountNotFoundException exception = assertThrows(AccountNotFoundException.class, () -> {
            bankService.getBalance(user.getUserId(), accountTypes);
        });

        assertEquals("Account not found for user ID: " + user.getUserId() + " and account type: " + accountTypes, exception.getMessage());

        verify(bankAccountRepository, times(1)).findByUserUserIdAndAccountTypes(user.getUserId(), accountTypes);
    }


}
