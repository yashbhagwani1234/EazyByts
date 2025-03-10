package com.substring.chat.chat_app_backend.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Message {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremented Primary Key
    private Long id;
    
	

	private String sender;
	
	private String content;
	
	private LocalDateTime timestamp;

	@ManyToOne
	@JoinColumn(name="room_id",nullable=false)
	private Room room;
	

    public Message() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Message(String sender, String content) {
		super();
		this.sender = sender;
		this.content = content;
		this.timestamp = LocalDateTime.now();
	}
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Room getRoom() {
		return room;
	}

	public void setRoom(Room room) {
		this.room = room;
	}
	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}
	
	
}
