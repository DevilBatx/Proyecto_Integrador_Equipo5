package com.grupo5.MusifyBack;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class MusifyBackApplication {

    public static void main(String[] args) {
        SpringApplication.run(MusifyBackApplication.class, args);
    }


    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Musify API")
                        .version("1.0")
                        .description("Musify API implemented with Spring Boot RESTful service and documented using springdoc-openapi and OpenAPI 3.")
                        .termsOfService("http://swagger.io/terms/")
                        .license(new License().name("Apache 2.0").url("http://springdoc.org")));
                        //.extension("x-logo", Map.of("url", "URL_DEL_LOGO"))); // Reemplaza "URL_DEL_LOGO" con la URL de tu imagen/logo
    }
}
