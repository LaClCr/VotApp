package votAppAPI.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import votAppAPI.objects.Project;


@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {
    @Query(value = "{ name: ?0 }")
    Project findByName(String name);
    
    @Query(value = "{ creator: ?0 }")
    Project findByCreator(String creator);
    
}
