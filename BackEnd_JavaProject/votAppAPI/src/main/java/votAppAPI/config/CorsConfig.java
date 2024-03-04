package votAppAPI.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuration class for CORS (Cross-Origin Resource Sharing) settings.
 */
@Configuration
public class CorsConfig {

    /**
     * Configures CORS settings for the application.
     *
     * @return An instance of WebMvcConfigurer with CORS configurations.
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            /**
             * Adds CORS mappings to the provided CorsRegistry.
             *
             * @param registry The CorsRegistry to which CORS mappings are added.
             */
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("votApp/**") // Maps CORS to all routes under /API
                        .allowedOrigins("*") // Allows requests from any origin
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // Allows specified HTTP methods
                        .allowedHeaders("*"); // Allows all headers in the request
            }
        };
    }
}
