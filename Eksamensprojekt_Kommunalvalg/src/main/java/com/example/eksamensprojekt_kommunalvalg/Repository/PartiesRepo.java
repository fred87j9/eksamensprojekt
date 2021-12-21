package com.example.eksamensprojekt_kommunalvalg.Repository;

import com.example.eksamensprojekt_kommunalvalg.Model.Party;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartiesRepo extends JpaRepository<Party, Long> {

  Party findPartyByInitial(String party);
}
