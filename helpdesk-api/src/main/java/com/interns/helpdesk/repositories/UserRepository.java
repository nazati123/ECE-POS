package com.interns.helpdesk.repositories;

import com.interns.helpdesk.models.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    @EntityGraph(attributePaths = {"tickets", "tickets.reason", "tickets.files"})//Do not need to add `devTicket` because it is a `@JsonIgnore`d property ->
    //-> But if it was needed, you would have to change either `tickets` or `devTicket` to a `Set`
    public List<User> findAllByOrderByIdAsc();

    @EntityGraph(attributePaths = {"tickets", "tickets.reason", "tickets.files"})
    public Optional<User> findByIdOrderByIdAsc(Long id);

    //@Query(value= "SELECT * from users WHERE cac_id=:cac_id ORDER BY id",nativeQuery = true)
    @EntityGraph(attributePaths = {"tickets", "tickets.reason", "tickets.files"})
    User findByCacIdOrderByIdAsc(String cacId);
}