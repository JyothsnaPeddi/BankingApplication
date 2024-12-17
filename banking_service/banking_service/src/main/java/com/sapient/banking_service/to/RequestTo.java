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
public class RequestTo {
    private Integer userId;
    private AccountTypes accountTypes;
    private double amount;

}
