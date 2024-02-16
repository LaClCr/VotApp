package votAppAPI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main class to bootstrap the VotAppAPI application.
 */
@SpringBootApplication
public class Main {
    /**
     * Entry point of the application.
     *
     * @param args Command-line arguments passed to the application.
     */
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}