package org.example.axon.services;

import java.util.Map;

import org.example.axon.dto.request.ChatRequest;
import org.example.axon.dto.response.ChatRespone;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

@Service
public class ChatService {
    private final ChatClient chatClient;

    public ChatService(ChatClient.Builder builder){
        chatClient = builder.build();
    }

    public ChatRespone chat(ChatRequest request){
        PromptTemplate prompt = new PromptTemplate(
            new ClassPathResource("./prompts/classify_department.txt")
        );

        Prompt rendered = prompt.create(Map.of("message", request.message(), "departments", request.departments()));
        return chatClient.prompt(rendered).call()
                .entity(ChatRespone.class);
        // return request.message();
    }
}
