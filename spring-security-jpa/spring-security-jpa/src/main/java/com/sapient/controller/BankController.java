package com.sapient.controller;

import com.sapient.entity.AccountTypes;
import com.sapient.repository.BankInterface;
import com.sapient.to.RequestTo;
import com.sapient.to.TransferTo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin
@RestController
@RequestMapping("/v1")
@RequiredArgsConstructor
public class BankController {
    @Autowired
    private BankInterface bankInterface;
    @PostMapping("/create-account/{userId}/{accountTypes}")
    public ResponseEntity<Object> createNewBankAccount(@PathVariable Integer userId, @PathVariable AccountTypes accountTypes){
        return bankInterface.createNewBankAccount(userId,accountTypes);
    }
    @GetMapping("/getAllAccounts/{userId}")
    public ResponseEntity<Object> getAllBankAccountsByUserId(@PathVariable Integer userId){
        return bankInterface.getAllBankAccountsByUserId(userId);
    }
    @PutMapping("/debit/{userId}/{accountTypes}/{amount}")
    public ResponseEntity<Object> withdraw(@RequestBody RequestTo requestTo){
        return bankInterface.withdraw(requestTo);
    }
    @PutMapping("/credit")
    public ResponseEntity<Object> deposit(@RequestBody RequestTo requestTo){
        return bankInterface.deposit(requestTo);
    }
    @PutMapping("/transfer")
    public ResponseEntity<String> transfer(@RequestBody TransferTo transferTo){
        return bankInterface.transfer(transferTo);
    }
    @GetMapping("/getBalance/{userId}/{accountTypes}")
    public ResponseEntity<Object> getBalance(@PathVariable Integer userId, @PathVariable AccountTypes accountTypes){
        return bankInterface.getBalance(userId,accountTypes);
    }
}
