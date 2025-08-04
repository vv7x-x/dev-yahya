# تطبيق الدردشة - Flutter Chat App

تطبيق دردشة متقدم مبني بتقنية Flutter مع نظام إشعارات من المالك وميزات المجموعات.

## المميزات

### 🔐 نظام المصادقة
- تسجيل دخول وإنشاء حساب جديد
- مصادقة عبر Firebase Authentication
- دعم حسابات المالك مع صلاحيات خاصة

### 💬 الدردشة الجماعية
- إنشاء مجموعات دردشة
- الانضمام للمجموعات الموجودة
- دردشة فورية مع الأعضاء
- عرض حالة الاتصال للمستخدمين

### 📢 نظام الإشعارات
- إشعارات خاصة من مالك التطبيق لجميع المستخدمين
- إشعارات push للرسائل الجديدة
- إشعارات محلية داخل التطبيق
- تمييز بصري للإشعارات المهمة

### 👤 الملف الشخصي
- عرض وتعديل معلومات الحساب
- تتبع آخر ظهور وحالة الاتصال
- إعدادات الحساب

## التقنيات المستخدمة

- **Flutter** - إطار العمل الأساسي
- **Firebase** - قاعدة البيانات والمصادقة
  - Firebase Auth - المصادقة
  - Cloud Firestore - قاعدة البيانات
  - Firebase Messaging - الإشعارات
- **Provider** - إدارة الحالة
- **Material Design** - تصميم واجهة المستخدم

## متطلبات التشغيل

- Flutter SDK 3.0+
- Dart 3.0+
- Android Studio / VS Code
- حساب Firebase مع مشروع مهيأ

## إعداد المشروع

### 1. استنساخ المشروع
```bash
git clone [repository-url]
cd flutter_chat_app
```

### 2. تثبيت التبعيات
```bash
flutter pub get
```

### 3. إعداد Firebase

#### إنشاء مشروع Firebase:
1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. أنشئ مشروع جديد
3. فعّل Authentication و Firestore و Messaging

#### إعداد Android:
1. أضف تطبيق Android في Firebase Console
2. حمّل ملف `google-services.json`
3. ضع الملف في `android/app/`
4. أضف التبعيات المطلوبة في `android/app/build.gradle`

#### إعداد قواعد Firestore:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null;
    }
    
    // Groups collection
    match /groups/{groupId} {
      allow read, write: if request.auth != null;
    }
    
    // Messages collection
    match /messages/{messageId} {
      allow read, write: if request.auth != null;
    }
    
    // Notifications collection
    match /notifications/{notificationId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 4. تشغيل التطبيق
```bash
flutter run
```

## هيكل المشروع

```
lib/
├── main.dart                 # نقطة دخول التطبيق
├── models/                   # نماذج البيانات
│   ├── user_model.dart
│   ├── message_model.dart
│   └── group_model.dart
├── services/                 # خدمات التطبيق
│   ├── auth_service.dart
│   ├── chat_service.dart
│   └── notification_service.dart
├── screens/                  # شاشات التطبيق
│   ├── auth_screen.dart
│   ├── home_screen.dart
│   ├── groups_screen.dart
│   ├── chat_screen.dart
│   ├── profile_screen.dart
│   ├── create_group_screen.dart
│   ├── join_group_screen.dart
│   └── owner_notifications_screen.dart
├── widgets/                  # مكونات قابلة للإعادة الاستخدام
│   └── message_bubble.dart
└── utils/                    # أدوات مساعدة
    └── app_theme.dart
```

## كيفية الاستخدام

### للمستخدمين العاديين:
1. إنشاء حساب جديد أو تسجيل الدخول
2. انضمام لمجموعات موجودة أو إنشاء مجموعة جديدة
3. بدء الدردشة مع أعضاء المجموعة
4. تلقي إشعارات الرسائل والإعلانات

### لمالك التطبيق:
1. إنشاء حساب مع تفعيل خيار "مالك التطبيق"
2. الوصول لقسم الإشعارات من القائمة السفلية
3. إرسال إشعارات عامة لجميع المستخدمين
4. إدارة المجموعات والأعضاء

## الميزات المستقبلية

- [ ] دعم إرسال الصور والملفات
- [ ] مكالمات صوتية ومرئية
- [ ] ترجمة الرسائل
- [ ] وضع الليل/النهار
- [ ] النسخ الاحتياطي للدردشة
- [ ] بوت ذكي للمساعدة

## المساهمة

نرحب بالمساهمات! يرجى اتباع الخطوات التالية:

1. Fork المشروع
2. إنشاء فرع للميزة الجديدة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push للفرع (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## الدعم

للدعم والاستفسارات:
- فتح issue في GitHub
- التواصل عبر البريد الإلكتروني

## لقطات الشاشة

### شاشة تسجيل الدخول
- تصميم أنيق وبسيط
- دعم اللغة العربية
- تسجيل دخول آمن

### شاشة المجموعات
- عرض جميع المجموعات المنضم إليها
- معلومات آخر رسالة ووقتها
- إمكانية إنشاء مجموعة جديدة

### شاشة الدردشة
- واجهة دردشة حديثة
- فقاعات رسائل مميزة
- عرض حالة القراءة

### إشعارات المالك
- إرسال إشعارات لجميع المستخدمين
- تمييز بصري للإشعارات المهمة
- واجهة سهلة الاستخدام

---

تم تطوير هذا التطبيق بـ ❤️ باستخدام Flutter