package com.example.eksamensprojekt_kommunalvalg.Controller;

import com.example.eksamensprojekt_kommunalvalg.Model.Candidate;
import com.example.eksamensprojekt_kommunalvalg.Model.Party;
import com.example.eksamensprojekt_kommunalvalg.Repository.CandidatesRepo;
import com.example.eksamensprojekt_kommunalvalg.Repository.PartiesRepo;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.io.DataInput;
import java.io.IOException;
import java.util.List;

@RestController
public class Candidates {

    @Autowired
    CandidatesRepo candidates;
    @Autowired
    PartiesRepo parties;

    @GetMapping("/parties")
      public Iterable<Party>getParties(){
        return parties.findAll();
    }

    @GetMapping("/candidates")
    public Iterable<Candidate> getCandidates(){
        return candidates.findAll();
    }
    @GetMapping("/candidates/{party}")
        public List<Candidate> getCandidateByParty(@PathVariable String party){
            return candidates.findCandidatesByparty(parties.findPartyByInitial(party));
        }

    @PostMapping("/candidates/{partyId}")
    public Candidate createCandidate(@RequestBody Candidate newCandidate, @PathVariable Long partyId){
        Party party = parties.findById(partyId).get();

        return candidates.save(new Candidate(newCandidate.getFirstName(), newCandidate.getLastName(), newCandidate.getCommune(), party));
    }
    @PutMapping("/candidates/{id}")
    public String updateCandidateById(@PathVariable Long id, @RequestBody Candidate candidateToUpdateWith){
        if(candidates.existsById(id)){
            candidateToUpdateWith.setId(id);
            candidates.save(candidateToUpdateWith);
            return "Candidate was created";
        } else {
            return "Candidate not found";
        }
    }
@PatchMapping("/candidates/{id}")
    public String patchCandidatesById(@PathVariable Long id, @RequestBody Candidate candidateToUpdateWith){
        return candidates.findById(id).map(foundCandidate -> {
            if(candidateToUpdateWith.getFirstName() != null) foundCandidate.setFirstName(candidateToUpdateWith.getFirstName());
            if(candidateToUpdateWith.getLastName() != null) foundCandidate.setLastName(candidateToUpdateWith.getLastName());
            if(candidateToUpdateWith.getCommune() != null) foundCandidate.setCommune(candidateToUpdateWith.getCommune());

            candidates.save(foundCandidate);
            return"Candidate updated";
        }).orElse("Candidate Not found");
}

@DeleteMapping("/candidates/{id}")
    public void deleteCandidatesById(@PathVariable Long id){
        candidates.deleteById(id);
}
    }


