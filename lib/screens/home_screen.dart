import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/auth_service.dart';
import '../services/notification_service.dart';
import 'groups_screen.dart';
import 'profile_screen.dart';
import 'owner_notifications_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;
  late List<Widget> _screens;

  @override
  void initState() {
    super.initState();
    _initializeNotifications();
    
    final authService = Provider.of<AuthService>(context, listen: false);
    final isOwner = authService.currentUser?.isOwner ?? false;
    
    _screens = [
      const GroupsScreen(),
      const ProfileScreen(),
      if (isOwner) const OwnerNotificationsScreen(),
    ];
  }

  Future<void> _initializeNotifications() async {
    final notificationService = Provider.of<NotificationService>(context, listen: false);
    await notificationService.initialize();
    
    final authService = Provider.of<AuthService>(context, listen: false);
    final userId = authService.currentUser?.id;
    if (userId != null) {
      await notificationService.saveFCMToken(userId);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<AuthService>(
      builder: (context, authService, _) {
        final isOwner = authService.currentUser?.isOwner ?? false;
        
        final bottomNavItems = [
          const BottomNavigationBarItem(
            icon: Icon(Icons.group),
            label: 'المجموعات',
          ),
          const BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'الملف الشخصي',
          ),
          if (isOwner)
            const BottomNavigationBarItem(
              icon: Icon(Icons.notifications),
              label: 'الإشعارات',
            ),
        ];

        return Scaffold(
          body: IndexedStack(
            index: _currentIndex,
            children: _screens,
          ),
          bottomNavigationBar: BottomNavigationBar(
            currentIndex: _currentIndex,
            onTap: (index) {
              setState(() {
                _currentIndex = index;
              });
            },
            type: BottomNavigationBarType.fixed,
            items: bottomNavItems,
          ),
        );
      },
    );
  }
}