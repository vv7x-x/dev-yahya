import 'package:flutter/material.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../main.dart';

class NotificationService extends ChangeNotifier {
  final FirebaseMessaging _messaging = FirebaseMessaging.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  String? _fcmToken;
  String? get fcmToken => _fcmToken;

  Future<void> initialize() async {
    // Request permission for notifications
    NotificationSettings settings = await _messaging.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );

    if (settings.authorizationStatus == AuthorizationStatus.authorized) {
      print('User granted permission');
      
      // Get FCM token
      _fcmToken = await _messaging.getToken();
      print('FCM Token: $_fcmToken');

      // Handle foreground messages
      FirebaseMessaging.onMessage.listen(_handleForegroundMessage);

      // Handle background messages
      FirebaseMessaging.onBackgroundMessage(_handleBackgroundMessage);

      // Handle notification tapped
      FirebaseMessaging.onMessageOpenedApp.listen(_handleNotificationTapped);
    }
  }

  Future<void> _handleForegroundMessage(RemoteMessage message) async {
    print('Handling a foreground message: ${message.messageId}');
    
    // Show local notification
    await _showLocalNotification(
      title: message.notification?.title ?? 'New Message',
      body: message.notification?.body ?? '',
      payload: message.data['groupId'],
    );
  }

  static Future<void> _handleBackgroundMessage(RemoteMessage message) async {
    print('Handling a background message: ${message.messageId}');
  }

  Future<void> _handleNotificationTapped(RemoteMessage message) async {
    print('Notification tapped: ${message.messageId}');
    // Navigate to specific chat/group
    final groupId = message.data['groupId'];
    if (groupId != null) {
      // Handle navigation to group chat
    }
  }

  Future<void> _showLocalNotification({
    required String title,
    required String body,
    String? payload,
  }) async {
    const AndroidNotificationDetails androidNotificationDetails =
        AndroidNotificationDetails(
      'chat_channel',
      'Chat Notifications',
      channelDescription: 'Notifications for chat messages',
      importance: Importance.max,
      priority: Priority.high,
      showWhen: false,
    );

    const NotificationDetails notificationDetails =
        NotificationDetails(android: androidNotificationDetails);

    await flutterLocalNotificationsPlugin.show(
      DateTime.now().millisecond,
      title,
      body,
      notificationDetails,
      payload: payload,
    );
  }

  // Save FCM token to Firestore
  Future<void> saveFCMToken(String userId) async {
    if (_fcmToken != null) {
      await _firestore.collection('users').doc(userId).update({
        'fcmToken': _fcmToken,
      });
    }
  }

  // Send notification to specific users
  Future<void> sendNotificationToUsers({
    required List<String> userIds,
    required String title,
    required String body,
    String? groupId,
  }) async {
    try {
      // Get FCM tokens for users
      final usersSnapshot = await _firestore
          .collection('users')
          .where(FieldPath.documentId, whereIn: userIds)
          .get();

      final tokens = usersSnapshot.docs
          .map((doc) => doc.data()['fcmToken'] as String?)
          .where((token) => token != null)
          .cast<String>()
          .toList();

      if (tokens.isNotEmpty) {
        // Send notification via cloud function or FCM admin SDK
        // This would typically be done via a cloud function
        await _firestore.collection('notifications').add({
          'tokens': tokens,
          'title': title,
          'body': body,
          'data': {'groupId': groupId},
          'timestamp': FieldValue.serverTimestamp(),
        });
      }
    } catch (e) {
      print('Error sending notification: $e');
    }
  }

  // Send notification to all group members
  Future<void> sendNotificationToGroup({
    required String groupId,
    required String title,
    required String body,
    String? senderId,
  }) async {
    try {
      // Get group members
      final groupDoc = await _firestore.collection('groups').doc(groupId).get();
      if (groupDoc.exists) {
        final members = List<String>.from(groupDoc.data()!['members'] ?? []);
        
        // Remove sender from notification recipients
        if (senderId != null) {
          members.remove(senderId);
        }

        if (members.isNotEmpty) {
          await sendNotificationToUsers(
            userIds: members,
            title: title,
            body: body,
            groupId: groupId,
          );
        }
      }
    } catch (e) {
      print('Error sending group notification: $e');
    }
  }

  // Send owner notification to all users
  Future<void> sendOwnerNotificationToAll({
    required String title,
    required String body,
  }) async {
    try {
      // Get all users with FCM tokens
      final usersSnapshot = await _firestore
          .collection('users')
          .where('fcmToken', isNotEqualTo: null)
          .get();

      final tokens = usersSnapshot.docs
          .map((doc) => doc.data()['fcmToken'] as String?)
          .where((token) => token != null)
          .cast<String>()
          .toList();

      if (tokens.isNotEmpty) {
        await _firestore.collection('notifications').add({
          'tokens': tokens,
          'title': title,
          'body': body,
          'data': {'isOwnerNotification': true},
          'timestamp': FieldValue.serverTimestamp(),
        });
      }
    } catch (e) {
      print('Error sending owner notification: $e');
    }
  }
}