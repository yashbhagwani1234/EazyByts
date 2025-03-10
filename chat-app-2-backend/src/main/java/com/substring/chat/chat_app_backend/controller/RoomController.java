package com.substring.chat.chat_app_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.substring.chat.chat_app_backend.entities.Message;
import com.substring.chat.chat_app_backend.entities.Room;
import com.substring.chat.chat_app_backend.repository.Roomrepo;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin("http://localhost:5173")
public class RoomController {

	private  Roomrepo roomrepo;

	@Autowired
	public RoomController(Roomrepo roomrepo) {
		super();
		this.roomrepo = roomrepo;
	}
	
	@PostMapping
	public ResponseEntity<?> createRoom(@RequestBody Room room)
	{
		if(roomrepo.findByRoomId(room.getRoomid())!=null)
		{
			return ResponseEntity.badRequest().body("Room already exits");
		}
		
		
		
		roomrepo.save(room);
		return ResponseEntity.status(HttpStatus.CREATED).body(room);
	}
	@GetMapping("/{roomid}")
	public ResponseEntity<?> joinRoom(@PathVariable String roomid){
		Room room  = roomrepo.findByRoomId(roomid);
		if(room == null)
		{
			return ResponseEntity.badRequest().body("Room not found");
		}
		return ResponseEntity.ok(room);
	}
	
	@GetMapping("/{roomid}/messages")
	public ResponseEntity<List<Message>> getMessage(
			@PathVariable String roomid,
			@RequestParam(value="page",defaultValue="0",required=false)int page,
			@RequestParam(value="size",defaultValue="20",required=false)int size)
	{
	    Room room = roomrepo.findByRoomId(roomid);
		if(room==null)
		{
			return ResponseEntity.badRequest().build();
		}
		List<Message> message = room.getMessages();
		
		int start = Math.max(0, message.size()-(page+1)*size);
		int end = Math.min(message.size(), start+size);
		
		List<Message> paginatedMessage = message.subList(start, end);
		
		
		return ResponseEntity.ok(paginatedMessage);
	}
	
}
