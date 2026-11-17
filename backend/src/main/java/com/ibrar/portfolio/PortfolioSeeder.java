package com.ibrar.portfolio;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import java.nio.charset.StandardCharsets;
@Component
public class PortfolioSeeder implements CommandLineRunner {
 private final JdbcTemplate jdbc;
 public PortfolioSeeder(JdbcTemplate jdbc){this.jdbc=jdbc;}
 @Override public void run(String... args) throws Exception {
  if (jdbc.queryForObject("SELECT COUNT(*) FROM portfolio_content", Integer.class)==0) {
   String json=new String(new ClassPathResource("portfolio-seed.json").getInputStream().readAllBytes(), StandardCharsets.UTF_8);
   jdbc.update("INSERT INTO portfolio_content(id,content) VALUES(1,?::jsonb)",json);
  }
 }
}
