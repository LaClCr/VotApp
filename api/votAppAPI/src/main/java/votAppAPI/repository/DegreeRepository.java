package votAppAPI.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import votAppAPI.objects.Degree;


@Repository
public interface DegreeRepository extends MongoRepository<Degree, String> {
    // Método para buscar un ciclo por su abreviatura
	
	@Query(value = "{ abbreviation : ?0 }")
    Degree findByAbbreviation(String abbreviation);
}
