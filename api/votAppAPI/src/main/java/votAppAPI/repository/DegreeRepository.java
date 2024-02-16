package votAppAPI.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import votAppAPI.objects.Degree;


/**
 * Repository interface for managing Degree entities in the database.
 */
@Repository
public interface DegreeRepository extends MongoRepository<Degree, String> {

    /**
     * Retrieves a degree by its abbreviation.
     *
     * @param abbreviation The abbreviation of the degree to retrieve.
     * @return The degree object with the specified abbreviation.
     */
    @Query(value = "{ abbreviation : ?0 }")
    Degree findByAbbreviation(String abbreviation);
}