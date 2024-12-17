package com.sapient.banking_service.controller;

import com.sapient.banking_service.dao.BankAccountRepository;
import com.sapient.banking_service.entity.AccountTypes;
import com.sapient.banking_service.entity.BankAccount;
import com.sapient.banking_service.exception.AccountAlreadyExistsException;
import com.sapient.banking_service.exception.InsufficientFundsException;
import com.sapient.banking_service.exception.TransactionFailureException;
import com.sapient.banking_service.service.BankService;

import com.sapient.banking_service.to.RequestTo;
import com.sapient.banking_service.to.TransferTo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.AccountNotFoundException;
import java.util.List;
/**
 * Controller for managing bank operations such as account creation,
 * withdrawal, deposit, transfer, and balance inquiry.
 * Provides REST endpoints for interacting with the banking system.
 */
@CrossOrigin
@RestController
@RequestMapping("/v1")
public class BankController {
    @Autowired
    private BankService bankService;
    @Autowired
    private BankAccountRepository bankAccountRepository;
    /**
     * Endpoint for creating a new bank account for a user.
     *
     * @param userId The ID of the user creating the account.
     * @param accountTypes The type of account to create (e.g., savings, checking).
     * @return ResponseEntity with the created BankAccount object on success,
     * or a ResponseEntity with an error message on failure.
     */
    @PostMapping("/create-account/{userId}/{accountTypes}")
    public ResponseEntity<Object> createNewBankAccount(@PathVariable Integer userId, @PathVariable AccountTypes accountTypes) {
        try {
            BankAccount bankAccount = bankService.createBankAccount(userId, accountTypes);
            return ResponseEntity.ok().body(bankAccount);
        } catch (AccountAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    /**
     * Endpoint for retrieving all bank accounts associated with a user.
     *
     * @param userId The ID of the user.
     * @return ResponseEntity with a list of BankAccount objects on success,
     *         or a ResponseEntity with an error message if no accounts are found.
     */
    @GetMapping("/getAllAccounts/{userId}")
    public ResponseEntity<Object> getAllBankAccountsByUserId(@PathVariable Integer userId) {
        List<BankAccount> bankAccounts = bankAccountRepository.findByUser_UserId(userId);
        if (bankAccounts.isEmpty()) {
            return new ResponseEntity<>("No bank accounts found for user ID: " + userId, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(bankAccounts);
    }
    /**
     * Endpoint for withdrawing funds from a user's bank account.
     *
     * @param requestTo Contains userId, accountTypes, and amount to withdraw.
     * @return ResponseEntity with the updated balance after withdrawal on success,
     *         or a ResponseEntity with an error message on failure.
     */
    @PutMapping("/debit")
    public ResponseEntity<Object> withdraw(@RequestBody RequestTo requestTo) {
        try {
            Double balance = bankService.withdraw(requestTo.getUserId(), requestTo.getAccountTypes(), requestTo.getAmount());
            return ResponseEntity.ok().body(balance);
        } catch (AccountNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body( e.getMessage());
        } catch (InsufficientFundsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(  e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }
    }
    /**
     * Endpoint for depositing funds into a user's bank account.
     *
     * @param requestTo Contains userId, accountTypes, and amount to deposit.
     * @return ResponseEntity with the updated balance after deposit on success,
     *         or a ResponseEntity with an error message on failure.
     */
    @PutMapping("/credit")
    public ResponseEntity<Object> deposit(@RequestBody RequestTo requestTo) {
        try {
            Double balance = bankService.deposit(requestTo.getUserId(), requestTo.getAccountTypes(), requestTo.getAmount());
            return ResponseEntity.ok().body(balance);
        } catch (AccountNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body( e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }
    }
    /**
     * Endpoint for transferring funds between two bank accounts.
     *
     * @param transferTo Contains userId, transferAcc, beneficialAcc, and amount to transfer.
     * @return ResponseEntity with a success message on successful transfer,
     *         or a ResponseEntity with an error message on failure.
     */

    @PutMapping("/transfer")
    public ResponseEntity<String> transfer(@RequestBody TransferTo transferTo) {
        try {
            String message = bankService.transfer(transferTo.getUserId(), transferTo.getTransferAcc(), transferTo.getBeneficialAcc(), transferTo.getAmount());
            return ResponseEntity.status(HttpStatus.OK).body("Success");
        } catch (TransactionFailureException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Transaction Failure: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }
    }
    /**
     * Endpoint for retrieving the balance of a specific account type for a user.
     *
     * @param userId The ID of the user.
     * @param accountTypes The type of account (e.g., savings, checking).
     * @return ResponseEntity with the balance of the account on success,
     *         or a ResponseEntity with an error message on failure.
     */
    @GetMapping("/getBalance/{userId}/{accountTypes}")
    public ResponseEntity<Object> getBalance(@PathVariable Integer userId, @PathVariable AccountTypes accountTypes){
        try{
            Double balance = bankService.getBalance(userId, accountTypes);
            return ResponseEntity.ok().body(balance);
        }catch (AccountNotFoundException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Account Not Found");
        }
    }

}
