import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/user_model.dart';

class AuthService extends ChangeNotifier {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  
  UserModel? _currentUser;
  bool _isLoading = true;

  UserModel? get currentUser => _currentUser;
  bool get isLoading => _isLoading;

  AuthService() {
    _auth.authStateChanges().listen(_onAuthStateChanged);
  }

  Future<void> _onAuthStateChanged(User? user) async {
    if (user != null) {
      try {
        final doc = await _firestore.collection('users').doc(user.uid).get();
        if (doc.exists) {
          _currentUser = UserModel.fromMap(doc.data()!);
          // Update user online status
          await updateUserOnlineStatus(true);
        }
      } catch (e) {
        print('Error loading user data: $e');
      }
    } else {
      if (_currentUser != null) {
        await updateUserOnlineStatus(false);
      }
      _currentUser = null;
    }
    _isLoading = false;
    notifyListeners();
  }

  Future<String?> signUpWithEmailAndPassword({
    required String email,
    required String password,
    required String name,
    bool isOwner = false,
  }) async {
    try {
      _isLoading = true;
      notifyListeners();

      final credential = await _auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );

      if (credential.user != null) {
        final user = UserModel(
          id: credential.user!.uid,
          name: name,
          email: email,
          isOwner: isOwner,
          createdAt: DateTime.now(),
          lastSeen: DateTime.now(),
          isOnline: true,
        );

        await _firestore
            .collection('users')
            .doc(credential.user!.uid)
            .set(user.toMap());

        _currentUser = user;
      }

      _isLoading = false;
      notifyListeners();
      return null;
    } on FirebaseAuthException catch (e) {
      _isLoading = false;
      notifyListeners();
      return e.message;
    } catch (e) {
      _isLoading = false;
      notifyListeners();
      return 'An error occurred during registration';
    }
  }

  Future<String?> signInWithEmailAndPassword({
    required String email,
    required String password,
  }) async {
    try {
      _isLoading = true;
      notifyListeners();

      await _auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );

      _isLoading = false;
      notifyListeners();
      return null;
    } on FirebaseAuthException catch (e) {
      _isLoading = false;
      notifyListeners();
      return e.message;
    } catch (e) {
      _isLoading = false;
      notifyListeners();
      return 'An error occurred during sign in';
    }
  }

  Future<void> signOut() async {
    await updateUserOnlineStatus(false);
    await _auth.signOut();
  }

  Future<void> updateUserOnlineStatus(bool isOnline) async {
    if (_currentUser != null) {
      await _firestore.collection('users').doc(_currentUser!.id).update({
        'isOnline': isOnline,
        'lastSeen': DateTime.now().millisecondsSinceEpoch,
      });
    }
  }

  Future<void> updateUserProfile({
    String? name,
    String? profileImage,
  }) async {
    if (_currentUser != null) {
      final updates = <String, dynamic>{};
      if (name != null) updates['name'] = name;
      if (profileImage != null) updates['profileImage'] = profileImage;

      await _firestore.collection('users').doc(_currentUser!.id).update(updates);
      
      _currentUser = _currentUser!.copyWith(
        name: name,
        profileImage: profileImage,
      );
      notifyListeners();
    }
  }
}