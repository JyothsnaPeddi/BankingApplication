package com.sapient.banking_service.service;
import com.sapient.banking_service.config.JavaConstant;
import com.sapient.banking_service.config.ResourceBO;
import com.sapient.banking_service.dao.BankAccountRepository;
import com.sapient.banking_service.dao.UserRepository;
import com.sapient.banking_service.entity.AccountTypes;
import com.sapient.banking_service.entity.BankAccount;
import com.sapient.banking_service.entity.User;
import com.sapient.banking_service.exception.AccountAlreadyExistsException;
import com.sapient.banking_service.exception.InsufficientFundsException;
import com.sapient.banking_service.exception.TransactionFailureException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.security.auth.login.AccountNotFoundException;
import java.util.Random;
import java.util.ResourceBundle;


@Service
public class BankService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BankAccountRepository bankAccountRepository;

    /**
     * Method Creates the Bank account
     * @param userId the ID of the user creating account
     * @param accountTypes the type if the account to be created
     * @return the created account
     */


    public BankAccount createBankAccount(Integer userId, AccountTypes accountTypes) {
        User user = userRepository.findByUserId(userId);
        BankAccount bankAccount = new BankAccount();
        bankAccount.setAccountNumber(generateUniqueAccountNumber());
        bankAccount.setUser(user);

        boolean accountExists = user.getBankAccounts().stream()
                .anyMatch(account -> account.getAccountTypes() == accountTypes);

        if (accountExists) {
            throw new AccountAlreadyExistsException("Account aLready exits");
        }

        bankAccount.setAccountTypes(accountTypes);
        bankAccountRepository.save(bankAccount);
        user.getBankAccounts().add(bankAccount);
        userRepository.save(user);

        return bankAccount;
    }

    /**
     * method to generate the unique account number
     * @return account number
     */

    public String generateUniqueAccountNumber() {
        Random random = new Random();
        String accountNumber;
        String prefix = "ACC";
        String digits = "";
        do {
            int randomNum = random.nextInt(1000000);
            digits = String.format("%06d", randomNum);
            accountNumber = prefix + digits;
        } while (bankAccountRepository.existsByAccountNumber(accountNumber));
        return accountNumber;
    }

    /**
     * Method to withdraw amount from the account
     * @param userId the ID of the user of the account
     * @param accountTypes type of the account the amount to be withdrawn
     * @param amount the amount to be withdrawn
     * @return the balance of the account
     * @throws AccountNotFoundException
     */

    public double withdraw(Integer userId, AccountTypes accountTypes, double amount) throws AccountNotFoundException {
        BankAccount bankAccount = bankAccountRepository.findByUserUserIdAndAccountTypes(userId, accountTypes);
        if (bankAccount == null) {
            throw new AccountNotFoundException("Account not found for user ID: " + userId + " and account type: " + accountTypes);
        }
        if (bankAccount.getBalance() < amount) {
            throw new InsufficientFundsException("Insufficient Funds");
        } else {
            bankAccount.setBalance(bankAccount.getBalance() - amount);
        }
        bankAccountRepository.save(bankAccount);
        return bankAccount.getBalance();
    }

    /**
     * Method to deposit amount from the account
     * @param userId the ID of the user of the account
     * @param accountTypes type of the account the amount to be deposited
     * @param amount the amount to be deposited
     * @return the balance of the account
     * @throws AccountNotFoundException
     */

    public double deposit(Integer userId,AccountTypes accountTypes,double amount)throws AccountNotFoundException{
        BankAccount bankAccount=bankAccountRepository.findByUserUserIdAndAccountTypes(userId,accountTypes);
        if (bankAccount == null) {
            throw new AccountNotFoundException("Account not found for user ID: " + userId + " and account type: " + accountTypes);
        }
        double balance=bankAccount.getBalance()+amount;
        bankAccount.setBalance(balance);
        bankAccountRepository.save(bankAccount);
        return bankAccount.getBalance();
    }

    /**
     * Method for transaction between accounts
     * @param userId userId the ID of the user of the account
     * @param transferAcc type of transfer account
     * @param benificialAcc type of benificial acccount
     * @param amount the ammount to be transfered
     * @return the status of the transaction
     * @throws AccountNotFoundException
     */
    public String transfer(Integer userId, AccountTypes transferAcc, AccountTypes benificialAcc, double amount)throws AccountNotFoundException {
        try {
            withdraw(userId, transferAcc, amount);
            deposit(userId, benificialAcc, amount);
            return "Success";
        } catch (InsufficientFundsException e) {
            throw new TransactionFailureException("Transaction Failure: " + e.getMessage());
        }
    }

    /**
     * Checking the balance of the account
     * @param userId userId the ID of the user of the account
     * @param accountTypes type of the account
     * @return the balance of the account
     * @throws AccountNotFoundException
     */
    public double getBalance(Integer userId,AccountTypes accountTypes) throws AccountNotFoundException {
        BankAccount bankAccount=bankAccountRepository.findByUserUserIdAndAccountTypes(userId,accountTypes);
        if (bankAccount == null) {
            throw new AccountNotFoundException("Account not found for user ID: " + userId + " and account type: " + accountTypes);
        }
        double balance=bankAccount.getBalance();
        return balance;

    }



}
