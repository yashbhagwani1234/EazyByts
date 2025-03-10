package com.substring.chat.chat_app_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.substring.chat.chat_app_backend.entities.Message;

public interface Messagerepo extends JpaRepository<Message,Long>{

}
