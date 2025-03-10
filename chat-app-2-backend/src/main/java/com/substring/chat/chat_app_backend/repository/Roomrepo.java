package com.substring.chat.chat_app_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.substring.chat.chat_app_backend.entities.Room;

public interface Roomrepo extends JpaRepository<Room,Long>{

	public Room findByRoomId(String roomId);
}
