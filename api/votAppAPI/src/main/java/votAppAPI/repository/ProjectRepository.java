package votAppAPI.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import votAppAPI.objects.Project;


/**
 * Repository interface for managing Project entities in the database.
 */
@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {

    /**
     * Retrieves a project by its name.
     *
     * @param name The name of the project to retrieve.
     * @return The project object with the specified name.
     */
    @Query(value = "{ name: ?0 }")
    Project findByName(String name);
    
    /**
     * Retrieves a project by its creator.
     *
     * @param creator The creator of the project to retrieve.
     * @return The project object created by the specified creator.
     */
    @Query(value = "{ creator: ?0 }")
    Project findByCreator(String creator);
}