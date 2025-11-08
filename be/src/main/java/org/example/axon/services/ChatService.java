package org.example.axon.services;

import java.util.List;
import java.util.Map;

import org.example.axon.dto.request.ChatDepRequest;
import org.example.axon.dto.request.ChatRequest;
import org.example.axon.dto.response.ChatRespone;
import org.example.axon.repository.DepartmentRepository;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

@Service
public class ChatService {
    private final ChatClient chatClient;

    private final DepartmentRepository departmentRepository;

    public ChatService(ChatClient.Builder builder, DepartmentRepository departmentRepository){
        chatClient = builder.build();
        this.departmentRepository = departmentRepository;
    }

    public ChatRespone chat(ChatRequest request){
        PromptTemplate prompt = new PromptTemplate(
            new ClassPathResource("./prompts/classify_department.txt")
        );
        List<ChatDepRequest> departments = request.departments() != null ? request.departments() : getDepartment();
        Prompt rendered = prompt.create(Map.of("message", request.message(), "departments", departments));
        return chatClient.prompt(rendered).call()
                .entity(ChatRespone.class);
        // return request.message();
    }

    public List<ChatDepRequest> getDepartment(){
        return departmentRepository.findAllBy();
    }
}
