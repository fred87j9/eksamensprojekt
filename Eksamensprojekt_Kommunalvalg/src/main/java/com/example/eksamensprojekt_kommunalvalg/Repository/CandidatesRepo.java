package com.example.eksamensprojekt_kommunalvalg.Repository;

import com.example.eksamensprojekt_kommunalvalg.Model.Candidate;
import com.example.eksamensprojekt_kommunalvalg.Model.Party;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CandidatesRepo extends JpaRepository<Candidate,Long> {

    List<Candidate>findCandidatesByparty(Party party);
}

