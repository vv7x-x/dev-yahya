class UserModel {
  final String id;
  final String name;
  final String email;
  final String? profileImage;
  final bool isOwner;
  final DateTime createdAt;
  final DateTime lastSeen;
  final bool isOnline;

  UserModel({
    required this.id,
    required this.name,
    required this.email,
    this.profileImage,
    this.isOwner = false,
    required this.createdAt,
    required this.lastSeen,
    this.isOnline = false,
  });

  factory UserModel.fromMap(Map<String, dynamic> map) {
    return UserModel(
      id: map['id'] ?? '',
      name: map['name'] ?? '',
      email: map['email'] ?? '',
      profileImage: map['profileImage'],
      isOwner: map['isOwner'] ?? false,
      createdAt: DateTime.fromMillisecondsSinceEpoch(map['createdAt'] ?? 0),
      lastSeen: DateTime.fromMillisecondsSinceEpoch(map['lastSeen'] ?? 0),
      isOnline: map['isOnline'] ?? false,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'profileImage': profileImage,
      'isOwner': isOwner,
      'createdAt': createdAt.millisecondsSinceEpoch,
      'lastSeen': lastSeen.millisecondsSinceEpoch,
      'isOnline': isOnline,
    };
  }

  UserModel copyWith({
    String? id,
    String? name,
    String? email,
    String? profileImage,
    bool? isOwner,
    DateTime? createdAt,
    DateTime? lastSeen,
    bool? isOnline,
  }) {
    return UserModel(
      id: id ?? this.id,
      name: name ?? this.name,
      email: email ?? this.email,
      profileImage: profileImage ?? this.profileImage,
      isOwner: isOwner ?? this.isOwner,
      createdAt: createdAt ?? this.createdAt,
      lastSeen: lastSeen ?? this.lastSeen,
      isOnline: isOnline ?? this.isOnline,
    );
  }
}