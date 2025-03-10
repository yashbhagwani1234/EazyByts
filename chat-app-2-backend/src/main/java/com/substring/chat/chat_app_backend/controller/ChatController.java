package com.substring.chat.chat_app_backend.controller;

import java.time.LocalDateTime;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import com.substring.chat.chat_app_backend.entities.Message;
import com.substring.chat.chat_app_backend.entities.Room;
import com.substring.chat.chat_app_backend.payload.MessageRequest;
import com.substring.chat.chat_app_backend.repository.Roomrepo;
import com.substring.chat.chat_app_backend.repository.Messagerepo;

@Controller
@CrossOrigin("http://localhost:5173")
public class ChatController {

    private final Roomrepo roomRepo;
    private final Messagerepo messageRepo; // ✅ Add message repository

    public ChatController(Roomrepo roomRepo, Messagerepo messageRepo) {
        this.roomRepo = roomRepo;
        this.messageRepo = messageRepo;
    }

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public Message sendMessage(
            @DestinationVariable String roomId,
            @RequestBody MessageRequest req) {

        System.out.println("Received roomId: " + roomId);
        System.out.println("Request payload: " + req);

        Room room = roomRepo.findByRoomId(roomId);
        System.out.println("Fetched room from DB: " + room);

        if (room == null) {
            throw new RuntimeException("Room not found with roomId: " + roomId);
        }

        Message message = new Message();
        message.setContent(req.getContent());
        message.setSender(req.getSender());
        message.setRoom(room);
        message.setTimestamp(LocalDateTime.now());

        // ✅ Save message explicitly
        messageRepo.save(message);

        return message;
    }
}
