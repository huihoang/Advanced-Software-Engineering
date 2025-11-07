package org.example.axon.controller;

import org.springframework.web.bind.annotation.RestController;
import org.example.axon.dto.request.ChatRequest;
import org.example.axon.dto.response.ChatRespone;
import org.example.axon.services.ChatService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class ChatController {
    private final ChatService chatService;

    public ChatController(ChatService chatService){
        this.chatService = chatService;
    }

    @PostMapping("/chat")
    public ChatRespone chat(@RequestBody ChatRequest request) {      
        return chatService.chat(request);
    }
    
}
