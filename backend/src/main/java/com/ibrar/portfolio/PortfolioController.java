package com.ibrar.portfolio;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PortfolioController {
  private final JdbcTemplate jdbc;
  @Value("${app.admin.password}") private String adminPassword;
  public PortfolioController(JdbcTemplate jdbc) { this.jdbc = jdbc; }

  @GetMapping("/portfolio")
  public ResponseEntity<String> getPortfolio() {
    List<String> rows = jdbc.query("SELECT content::text FROM portfolio_content WHERE id=1", (rs, n) -> rs.getString(1));
    if (rows.isEmpty()) return ResponseEntity.status(404).body("{\"message\":\"Portfolio content not initialized. Import public/portfolio.json using the setup guide.\"}");
    return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(rows.get(0));
  }

  @PostMapping("/admin/login")
  public ResponseEntity<?> login(@RequestBody Map<String,String> body) {
    if (body == null || !Objects.equals(adminPassword, body.get("password"))) return ResponseEntity.status(401).body(Map.of("message", "Invalid admin password"));
    return ResponseEntity.ok(Map.of("token", adminPassword));
  }

  private boolean authorized(String auth) { return auth != null && auth.equals("Bearer " + adminPassword); }

  @PutMapping("/admin/portfolio")
  public ResponseEntity<?> update(@RequestHeader(value="Authorization", required=false) String auth, @RequestBody String json) {
    if (!authorized(auth)) return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
    if (json == null || json.length() > 500_000) return ResponseEntity.badRequest().body(Map.of("message", "Invalid or oversized portfolio JSON"));
    jdbc.update("INSERT INTO portfolio_content(id,content,updated_at) VALUES(1,?::jsonb,NOW()) ON CONFLICT(id) DO UPDATE SET content=EXCLUDED.content, updated_at=NOW()", json);
    return ResponseEntity.ok(Map.of("message", "Portfolio updated"));
  }

  @PostMapping(value="/admin/photo", consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<?> photo(@RequestHeader(value="Authorization", required=false) String auth, @RequestParam("file") MultipartFile file) throws Exception {
    if (!authorized(auth)) return ResponseEntity.status(401).body(Map.of("message", "Unauthorized"));
    if (file.isEmpty() || file.getSize() > 5_000_000 || file.getContentType() == null || !file.getContentType().startsWith("image/")) return ResponseEntity.badRequest().body(Map.of("message", "Upload an image smaller than 5 MB"));
    jdbc.update("INSERT INTO portfolio_photo(id,content_type,image_data,updated_at) VALUES(1,?,?,NOW()) ON CONFLICT(id) DO UPDATE SET content_type=EXCLUDED.content_type,image_data=EXCLUDED.image_data,updated_at=NOW()", file.getContentType(), file.getBytes());
    return ResponseEntity.ok(Map.of("message", "Profile photo replaced"));
  }

  @GetMapping("/portfolio/photo")
  public ResponseEntity<byte[]> photo() {
    List<Map<String,Object>> rows = jdbc.queryForList("SELECT content_type,image_data FROM portfolio_photo WHERE id=1");
    if (rows.isEmpty()) return ResponseEntity.notFound().build();
    return ResponseEntity.ok().contentType(MediaType.parseMediaType((String)rows.get(0).get("content_type"))).cacheControl(CacheControl.noCache()).body((byte[])rows.get(0).get("image_data"));
  }
}
