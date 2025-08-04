import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../services/auth_service.dart';
import '../services/chat_service.dart';
import '../models/group_model.dart';
import 'chat_screen.dart';
import 'create_group_screen.dart';
import 'join_group_screen.dart';

class GroupsScreen extends StatelessWidget {
  const GroupsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final authService = Provider.of<AuthService>(context);
    final chatService = Provider.of<ChatService>(context);
    final userId = authService.currentUser?.id ?? '';

    return Scaffold(
      appBar: AppBar(
        title: const Text('المجموعات'),
        actions: [
          PopupMenuButton<String>(
            onSelected: (value) {
              if (value == 'create') {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const CreateGroupScreen(),
                  ),
                );
              } else if (value == 'join') {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const JoinGroupScreen(),
                  ),
                );
              }
            },
            itemBuilder: (context) => [
              const PopupMenuItem(
                value: 'create',
                child: Row(
                  children: [
                    Icon(Icons.add),
                    SizedBox(width: 8),
                    Text('إنشاء مجموعة'),
                  ],
                ),
              ),
              const PopupMenuItem(
                value: 'join',
                child: Row(
                  children: [
                    Icon(Icons.group_add),
                    SizedBox(width: 8),
                    Text('الانضمام لمجموعة'),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
      body: StreamBuilder<List<GroupModel>>(
        stream: chatService.getUserGroups(userId),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (snapshot.hasError) {
            return Center(
              child: Text('حدث خطأ: ${snapshot.error}'),
            );
          }

          final groups = snapshot.data ?? [];

          if (groups.isEmpty) {
            return const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.group_outlined,
                    size: 80,
                    color: Colors.grey,
                  ),
                  SizedBox(height: 16),
                  Text(
                    'لا توجد مجموعات',
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.grey,
                    ),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'قم بإنشاء مجموعة جديدة أو الانضمام لمجموعة موجودة',
                    style: TextStyle(
                      color: Colors.grey,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            );
          }

          return ListView.builder(
            itemCount: groups.length,
            itemBuilder: (context, index) {
              final group = groups[index];
              return GroupListTile(group: group);
            },
          );
        },
      ),
    );
  }
}

class GroupListTile extends StatelessWidget {
  final GroupModel group;

  const GroupListTile({
    super.key,
    required this.group,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: Theme.of(context).primaryColor,
          child: group.imageUrl != null
              ? ClipOval(
                  child: Image.network(
                    group.imageUrl!,
                    width: 40,
                    height: 40,
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) {
                      return Text(
                        group.name.isNotEmpty ? group.name[0].toUpperCase() : 'G',
                        style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      );
                    },
                  ),
                )
              : Text(
                  group.name.isNotEmpty ? group.name[0].toUpperCase() : 'G',
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
        ),
        title: Text(
          group.name,
          style: const TextStyle(fontWeight: FontWeight.w600),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (group.lastMessage != null)
              Text(
                group.lastMessage!,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            const SizedBox(height: 4),
            Row(
              children: [
                Icon(
                  Icons.people,
                  size: 14,
                  color: Colors.grey[600],
                ),
                const SizedBox(width: 4),
                Text(
                  '${group.members.length} عضو',
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.grey[600],
                  ),
                ),
              ],
            ),
          ],
        ),
        trailing: group.lastMessageTime != null
            ? Text(
                _formatTime(group.lastMessageTime!),
                style: TextStyle(
                  fontSize: 12,
                  color: Colors.grey[600],
                ),
              )
            : null,
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => ChatScreen(group: group),
            ),
          );
        },
      ),
    );
  }

  String _formatTime(DateTime dateTime) {
    final now = DateTime.now();
    final difference = now.difference(dateTime);

    if (difference.inDays > 0) {
      return DateFormat('dd/MM').format(dateTime);
    } else if (difference.inHours > 0) {
      return '${difference.inHours}س';
    } else if (difference.inMinutes > 0) {
      return '${difference.inMinutes}د';
    } else {
      return 'الآن';
    }
  }
}