package com.sapient.banking_service.to;

import com.sapient.banking_service.entity.AccountTypes;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransferTo {
    private Integer userId;
    private AccountTypes transferAcc;
    private AccountTypes beneficialAcc;
    private double amount;

}
