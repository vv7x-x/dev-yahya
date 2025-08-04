# تعليمات إعداد Firebase

## 1. إنشاء مشروع Firebase

1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. انقر على "إنشاء مشروع" أو "Create a project"
3. أدخل اسم المشروع (مثل: flutter-chat-app)
4. اختر ما إذا كنت تريد تفعيل Google Analytics (اختياري)
5. انقر على "إنشاء مشروع"

## 2. إعداد Authentication

1. في وحة التحكم، انقر على "Authentication" من القائمة الجانبية
2. انقر على "البدء" أو "Get started"
3. انتقل إلى تبويب "Sign-in method"
4. فعّل "Email/Password" authentication
5. احفظ التغييرات

## 3. إعداد Cloud Firestore

1. انقر على "Firestore Database" من القائمة الجانبية
2. انقر على "إنشاء قاعدة بيانات" أو "Create database"
3. اختر "Start in test mode" للتطوير
4. اختر الموقع الجغرافي (مثل: europe-west1)
5. انقر على "تم" أو "Done"

### قواعد Firestore

انسخ القواعد التالية في تبويب "Rules":

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

## 4. إعداد Cloud Messaging

1. انقر على "Cloud Messaging" من القائمة الجانبية
2. إذا لم يكن مفعّلاً، انقر على "تفعيل"
3. لا حاجة لإعدادات إضافية في هذه المرحلة

## 5. إضافة تطبيق Android

1. انقر على أيقونة Android في صفحة إعدادات المشروع
2. أدخل Package name: `com.example.flutter_chat_app`
3. أدخل اسم التطبيق: `تطبيق الدردشة`
4. انقر على "تسجيل التطبيق"
5. حمّل ملف `google-services.json`
6. ضع الملف في مجلد `android/app/` في مشروعك

## 6. إعداد ملفات Android

### تحديث android/app/build.gradle

أضف في بداية الملف:

```gradle
apply plugin: 'com.google.gms.google-services'
```

أضف في قسم dependencies:

```gradle
implementation 'com.google.firebase:firebase-analytics'
implementation 'com.google.firebase:firebase-messaging'
```

### تحديث android/build.gradle

أضف في قسم dependencies:

```gradle
classpath 'com.google.gms:google-services:4.3.15'
```

## 7. إعداد Cloud Functions (اختياري)

لإرسال الإشعارات، يمكنك إنشاء Cloud Function:

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendNotification = functions.firestore
    .document('notifications/{notificationId}')
    .onCreate(async (snap, context) => {
        const data = snap.data();
        const tokens = data.tokens;
        const title = data.title;
        const body = data.body;
        
        if (tokens && tokens.length > 0) {
            const message = {
                notification: {
                    title: title,
                    body: body,
                },
                data: data.data || {},
                tokens: tokens,
            };
            
            try {
                const response = await admin.messaging().sendMulticast(message);
                console.log('Successfully sent message:', response);
            } catch (error) {
                console.log('Error sending message:', error);
            }
        }
    });
```

## 8. اختبار الإعداد

1. شغّل التطبيق: `flutter run`
2. أنشئ حساب جديد
3. تحقق من ظهور المستخدم في Authentication console
4. أرسل رسالة وتحقق من حفظها في Firestore

## ملاحظات مهمة

- تأكد من أن ملف `google-services.json` في المكان الصحيح
- في الإنتاج، غيّر قواعد Firestore لتكون أكثر أماناً
- لاستخدام الإشعارات، قد تحتاج إلى إعداد Cloud Functions
- اتبع أفضل الممارسات الأمنية لـ Firebase

## استكشاف الأخطاء

### خطأ في google-services.json
- تأكد من وضع الملف في `android/app/`
- تأكد من أن package name صحيح

### مشاكل الاتصال
- تحقق من اتصال الإنترنت
- تأكد من إعداد قواعد Firestore بشكل صحيح

### مشاكل الإشعارات
- تأكد من إضافة أذونات الإشعارات في AndroidManifest.xml
- تحقق من إعداد Firebase Messaging Service