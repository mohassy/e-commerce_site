package com.techtrader.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.techtrader.helper.ListedStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Listing {

    @Id @GeneratedValue
    private Long id;

    @JsonIgnore
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Trader trader;

    @OneToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Device device;

    private Date dateListed;

    private ListedStatus listedStatus;

}
