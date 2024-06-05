package lt.chomicenko.bookcase_api.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    private final TokenAuthenticationFilter tokenAuthenticationFilter;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(authorizeHttpRequests -> authorizeHttpRequests

                        .requestMatchers(HttpMethod.POST, "/api/books").hasAnyAuthority(ADMIN)
                        .requestMatchers(HttpMethod.GET, "/api/books/{id}").hasAnyAuthority(ADMIN, USER)
                        .requestMatchers(HttpMethod.GET, "/api/books/bookName").hasAnyAuthority(ADMIN, USER)
                        .requestMatchers(HttpMethod.GET, "/api//allBooks").hasAnyAuthority(ADMIN, USER)
                        .requestMatchers(HttpMethod.PUT, "/api/books/{id}").hasAnyAuthority(ADMIN)

                        .requestMatchers(HttpMethod.PUT, "/api/books/{id}/ratings").hasAnyAuthority(ADMIN, USER)
                        .requestMatchers(HttpMethod.GET, "/api/books/{id}/averageRating").hasAnyAuthority(ADMIN, USER)
                        .requestMatchers(HttpMethod.PUT, "/api/books/{id}/comments").hasAnyAuthority(ADMIN, USER)

                        .requestMatchers(HttpMethod.DELETE, "/api/books/{id}").hasAnyAuthority(ADMIN)
                        .requestMatchers(HttpMethod.POST, "/api/books/{bookId}/favourite").hasAnyAuthority(ADMIN, USER)
                        .requestMatchers(HttpMethod.DELETE, "/api/books/{bookId}/favourite").hasAnyAuthority(ADMIN, USER)
                        .requestMatchers(HttpMethod.GET, "/api/search").hasAnyAuthority(ADMIN, USER)
                        .requestMatchers(HttpMethod.GET, "/api/books/mybooks").hasAnyAuthority(ADMIN, USER)
                        .requestMatchers(HttpMethod.GET, "/api/books/allPagedBooks").hasAnyAuthority(ADMIN, USER)

                        .requestMatchers(HttpMethod.GET, "/api/users/me").hasAnyAuthority(ADMIN, USER)
                        .requestMatchers(HttpMethod.GET, "/api/users").hasAnyAuthority(ADMIN)
                        .requestMatchers(HttpMethod.DELETE, "/api/users/{username}").hasAnyAuthority(ADMIN)
                        .requestMatchers(HttpMethod.GET, "/api/users/{username}").hasAnyAuthority(ADMIN)


                        .requestMatchers(HttpMethod.POST, "/api/categories").hasAnyAuthority(ADMIN)
                        .requestMatchers(HttpMethod.GET, "/api/categories").hasAnyAuthority(ADMIN,USER)
                        .requestMatchers(HttpMethod.PUT, "/api/categories/{categoryId}").hasAnyAuthority(ADMIN)
                        .requestMatchers(HttpMethod.DELETE, "/api/categories/{categoryId}").hasAnyAuthority(ADMIN)


                        .requestMatchers("/public/**", "/auth/**").permitAll()
                        .requestMatchers("/", "/error", "/csrf", "/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs", "/v3/api-docs/**").permitAll()
                        .requestMatchers("/h2-console/**").permitAll()
                        .anyRequest().authenticated())
                .headers(headers -> headers
                        .frameOptions().disable())
                .addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(exceptionHandling -> exceptionHandling.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public static final String ADMIN = "ADMIN";
    public static final String USER = "USER";
}
