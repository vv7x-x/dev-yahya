import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:uuid/uuid.dart';
import '../models/message_model.dart';
import '../models/group_model.dart';
import '../models/user_model.dart';

class ChatService extends ChangeNotifier {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final Uuid _uuid = const Uuid();

  List<GroupModel> _groups = [];
  List<UserModel> _users = [];

  List<GroupModel> get groups => _groups;
  List<UserModel> get users => _users;

  // Send message to a group
  Future<void> sendMessage({
    required String groupId,
    required String senderId,
    required String senderName,
    required String content,
    MessageType type = MessageType.text,
    String? imageUrl,
    bool isOwnerNotification = false,
  }) async {
    try {
      final message = MessageModel(
        id: _uuid.v4(),
        senderId: senderId,
        senderName: senderName,
        content: content,
        type: type,
        timestamp: DateTime.now(),
        imageUrl: imageUrl,
        isOwnerNotification: isOwnerNotification,
        groupId: groupId,
      );

      // Add message to messages collection
      await _firestore
          .collection('messages')
          .doc(message.id)
          .set(message.toMap());

      // Update group's last message
      await _firestore.collection('groups').doc(groupId).update({
        'lastMessage': content,
        'lastMessageTime': DateTime.now().millisecondsSinceEpoch,
      });
    } catch (e) {
      print('Error sending message: $e');
      throw e;
    }
  }

  // Send owner notification to all groups
  Future<void> sendOwnerNotification({
    required String senderId,
    required String senderName,
    required String content,
  }) async {
    try {
      // Get all groups
      final groupsSnapshot = await _firestore.collection('groups').get();
      
      for (var groupDoc in groupsSnapshot.docs) {
        await sendMessage(
          groupId: groupDoc.id,
          senderId: senderId,
          senderName: senderName,
          content: content,
          type: MessageType.notification,
          isOwnerNotification: true,
        );
      }
    } catch (e) {
      print('Error sending owner notification: $e');
      throw e;
    }
  }

  // Create a new group
  Future<String> createGroup({
    required String name,
    required String description,
    required String createdBy,
    String? imageUrl,
    List<String> initialMembers = const [],
  }) async {
    try {
      final groupId = _uuid.v4();
      final group = GroupModel(
        id: groupId,
        name: name,
        description: description,
        imageUrl: imageUrl,
        createdBy: createdBy,
        createdAt: DateTime.now(),
        members: [createdBy, ...initialMembers],
        admins: [createdBy],
      );

      await _firestore
          .collection('groups')
          .doc(groupId)
          .set(group.toMap());

      return groupId;
    } catch (e) {
      print('Error creating group: $e');
      throw e;
    }
  }

  // Join a group
  Future<void> joinGroup(String groupId, String userId) async {
    try {
      await _firestore.collection('groups').doc(groupId).update({
        'members': FieldValue.arrayUnion([userId]),
      });
    } catch (e) {
      print('Error joining group: $e');
      throw e;
    }
  }

  // Leave a group
  Future<void> leaveGroup(String groupId, String userId) async {
    try {
      await _firestore.collection('groups').doc(groupId).update({
        'members': FieldValue.arrayRemove([userId]),
      });
    } catch (e) {
      print('Error leaving group: $e');
      throw e;
    }
  }

  // Get messages for a group
  Stream<List<MessageModel>> getGroupMessages(String groupId) {
    return _firestore
        .collection('messages')
        .where('groupId', isEqualTo: groupId)
        .orderBy('timestamp', descending: false)
        .snapshots()
        .map((snapshot) => snapshot.docs
            .map((doc) => MessageModel.fromMap(doc.data()))
            .toList());
  }

  // Get user's groups
  Stream<List<GroupModel>> getUserGroups(String userId) {
    return _firestore
        .collection('groups')
        .where('members', arrayContains: userId)
        .orderBy('lastMessageTime', descending: true)
        .snapshots()
        .map((snapshot) => snapshot.docs
            .map((doc) => GroupModel.fromMap(doc.data()))
            .toList());
  }

  // Get all users
  Stream<List<UserModel>> getUsers() {
    return _firestore
        .collection('users')
        .orderBy('name')
        .snapshots()
        .map((snapshot) => snapshot.docs
            .map((doc) => UserModel.fromMap(doc.data()))
            .toList());
  }

  // Get all public groups
  Stream<List<GroupModel>> getAllGroups() {
    return _firestore
        .collection('groups')
        .orderBy('createdAt', descending: true)
        .snapshots()
        .map((snapshot) => snapshot.docs
            .map((doc) => GroupModel.fromMap(doc.data()))
            .toList());
  }

  // Mark message as read
  Future<void> markMessageAsRead(String messageId, String userId) async {
    try {
      await _firestore.collection('messages').doc(messageId).update({
        'readBy': FieldValue.arrayUnion([userId]),
      });
    } catch (e) {
      print('Error marking message as read: $e');
    }
  }
}