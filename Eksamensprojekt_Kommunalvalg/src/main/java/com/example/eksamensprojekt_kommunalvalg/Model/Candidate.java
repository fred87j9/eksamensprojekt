package com.example.eksamensprojekt_kommunalvalg.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Data
@Table(name= "candidates")
@Entity

public class Candidate {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private String commune;

    public Candidate(String firstName, String lastName, String commune, Party party){
        this.firstName = firstName;
        this.lastName = lastName;
        this.commune = commune;
        this.party = party;
    }
    public Candidate(){
    }


    @ManyToOne
    @JoinColumn(name = "party_id")
    @Nullable
    private Party party;

}
