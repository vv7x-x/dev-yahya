import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/auth_service.dart';
import '../services/chat_service.dart';
import '../models/group_model.dart';

class JoinGroupScreen extends StatelessWidget {
  const JoinGroupScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final authService = Provider.of<AuthService>(context);
    final chatService = Provider.of<ChatService>(context);
    final userId = authService.currentUser?.id ?? '';

    return Scaffold(
      appBar: AppBar(
        title: const Text('الانضمام لمجموعة'),
      ),
      body: StreamBuilder<List<GroupModel>>(
        stream: chatService.getAllGroups(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (snapshot.hasError) {
            return Center(
              child: Text('حدث خطأ: ${snapshot.error}'),
            );
          }

          final allGroups = snapshot.data ?? [];
          
          // Filter out groups the user is already a member of
          final availableGroups = allGroups
              .where((group) => !group.members.contains(userId))
              .toList();

          if (availableGroups.isEmpty) {
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
                    'لا توجد مجموعات متاحة',
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.grey,
                    ),
                  ),
                  SizedBox(height: 8),
                  Text(
                    'أنت عضو في جميع المجموعات المتاحة',
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
            itemCount: availableGroups.length,
            itemBuilder: (context, index) {
              final group = availableGroups[index];
              return GroupJoinTile(
                group: group,
                userId: userId,
              );
            },
          );
        },
      ),
    );
  }
}

class GroupJoinTile extends StatefulWidget {
  final GroupModel group;
  final String userId;

  const GroupJoinTile({
    super.key,
    required this.group,
    required this.userId,
  });

  @override
  State<GroupJoinTile> createState() => _GroupJoinTileState();
}

class _GroupJoinTileState extends State<GroupJoinTile> {
  bool _isJoining = false;

  Future<void> _joinGroup() async {
    setState(() {
      _isJoining = true;
    });

    final chatService = Provider.of<ChatService>(context, listen: false);

    try {
      await chatService.joinGroup(widget.group.id, widget.userId);
      
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('تم الانضمام لمجموعة ${widget.group.name}'),
            backgroundColor: Colors.green,
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('فشل في الانضمام للمجموعة: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      if (mounted) {
        setState(() {
          _isJoining = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: Theme.of(context).primaryColor,
          child: Text(
            widget.group.name.isNotEmpty 
                ? widget.group.name[0].toUpperCase() 
                : 'G',
            style: const TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        title: Text(
          widget.group.name,
          style: const TextStyle(fontWeight: FontWeight.w600),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (widget.group.description.isNotEmpty)
              Text(
                widget.group.description,
                maxLines: 2,
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
                  '${widget.group.members.length} عضو',
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.grey[600],
                  ),
                ),
              ],
            ),
          ],
        ),
        trailing: _isJoining
            ? const SizedBox(
                width: 20,
                height: 20,
                child: CircularProgressIndicator(strokeWidth: 2),
              )
            : IconButton(
                icon: const Icon(Icons.add),
                onPressed: _joinGroup,
                tooltip: 'انضمام',
              ),
      ),
    );
  }
}