package com.sapient.repository;

import com.sapient.entity.AccountTypes;
import com.sapient.to.RequestTo;
import com.sapient.to.TransferTo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@FeignClient(name="BANKING-SERVICE",path="/v1")
public interface BankInterface {
    @PostMapping("/create-account/{userId}/{accountTypes}")
    public ResponseEntity<Object> createNewBankAccount(@PathVariable Integer userId, @PathVariable AccountTypes accountTypes);
    @GetMapping("/getAllAccounts/{userId}")
    public ResponseEntity<Object> getAllBankAccountsByUserId(@PathVariable Integer userId);
    @PutMapping("/debit")
    public ResponseEntity<Object> withdraw(@RequestBody RequestTo requestTo);
    @PutMapping("/credit")
    public ResponseEntity<Object> deposit(@RequestBody RequestTo requestTo);
    @PutMapping("/transfer")
    public ResponseEntity<String> transfer(@RequestBody TransferTo transferTo);
    @GetMapping("/getBalance/{userId}/{accountTypes}")
    public ResponseEntity<Object> getBalance(@PathVariable Integer userId, @PathVariable AccountTypes accountTypes);


}
