package org.example.axon.dto.request;

import java.util.List;

public record ChatRequest(
    List<ChatDepRequest> departments, 
    String message
) {}
