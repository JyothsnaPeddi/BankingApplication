package com.sapient.to;

import com.sapient.entity.AccountTypes;
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