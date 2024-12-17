package com.sapient.banking_service.dao;

import com.sapient.banking_service.entity.AccountTypes;
import com.sapient.banking_service.entity.BankAccount;
import com.sapient.banking_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BankAccountRepository extends JpaRepository<BankAccount, Integer> {
    /**
     * Checks if a bank account exists with the given account number.
     *
     * @param accountNumber The account number to check.
     * @return true if the account exists, false otherwise.
     */

    boolean existsByAccountNumber(String accountNumber);
    /**
     * Retrieves a bank account by user ID and account type.
     *
     * @param userId The ID of the user.
     * @param accountTypes The type of account.
     * @return The bank account matching the user ID and account type.
     */
    BankAccount findByUserUserIdAndAccountTypes(Integer userId, AccountTypes accountTypes);
    /**
     * Retrieves all bank accounts belonging to a user based on user ID.
     *
     * @param userId The ID of the user.
     * @return A list of bank accounts owned by the user.
     */
    List<BankAccount> findByUser_UserId(Integer userId);
}