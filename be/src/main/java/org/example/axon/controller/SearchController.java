package org.example.axon.controller;

import org.example.axon.dto.request.SearchRequest;
import org.example.axon.dto.response.SearchResponse;
import org.example.axon.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/search")
@CrossOrigin(origins = "*")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @PostMapping
    public ResponseEntity<?> search(@RequestBody SearchRequest request) {
        if (request.getKeyword() == null || request.getKeyword().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Keyword không được để trống");
        }

        SearchResponse response = searchService.search(
                request.getKeyword().trim(),
                request.getType() != null ? request.getType() : "all",
                request.getPage() > 0 ? request.getPage() : 1,
                request.getLimit() > 0 ? request.getLimit() : 10);

        return ResponseEntity.ok(response);
    }
}