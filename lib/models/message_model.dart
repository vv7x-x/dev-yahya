enum MessageType { text, image, notification }

class MessageModel {
  final String id;
  final String senderId;
  final String senderName;
  final String content;
  final MessageType type;
  final DateTime timestamp;
  final String? imageUrl;
  final bool isOwnerNotification;
  final String? groupId;
  final List<String> readBy;

  MessageModel({
    required this.id,
    required this.senderId,
    required this.senderName,
    required this.content,
    this.type = MessageType.text,
    required this.timestamp,
    this.imageUrl,
    this.isOwnerNotification = false,
    this.groupId,
    this.readBy = const [],
  });

  factory MessageModel.fromMap(Map<String, dynamic> map) {
    return MessageModel(
      id: map['id'] ?? '',
      senderId: map['senderId'] ?? '',
      senderName: map['senderName'] ?? '',
      content: map['content'] ?? '',
      type: MessageType.values[map['type'] ?? 0],
      timestamp: DateTime.fromMillisecondsSinceEpoch(map['timestamp'] ?? 0),
      imageUrl: map['imageUrl'],
      isOwnerNotification: map['isOwnerNotification'] ?? false,
      groupId: map['groupId'],
      readBy: List<String>.from(map['readBy'] ?? []),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'senderId': senderId,
      'senderName': senderName,
      'content': content,
      'type': type.index,
      'timestamp': timestamp.millisecondsSinceEpoch,
      'imageUrl': imageUrl,
      'isOwnerNotification': isOwnerNotification,
      'groupId': groupId,
      'readBy': readBy,
    };
  }

  MessageModel copyWith({
    String? id,
    String? senderId,
    String? senderName,
    String? content,
    MessageType? type,
    DateTime? timestamp,
    String? imageUrl,
    bool? isOwnerNotification,
    String? groupId,
    List<String>? readBy,
  }) {
    return MessageModel(
      id: id ?? this.id,
      senderId: senderId ?? this.senderId,
      senderName: senderName ?? this.senderName,
      content: content ?? this.content,
      type: type ?? this.type,
      timestamp: timestamp ?? this.timestamp,
      imageUrl: imageUrl ?? this.imageUrl,
      isOwnerNotification: isOwnerNotification ?? this.isOwnerNotification,
      groupId: groupId ?? this.groupId,
      readBy: readBy ?? this.readBy,
    );
  }
}