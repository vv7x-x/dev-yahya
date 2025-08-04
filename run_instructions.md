# تعليمات تشغيل تطبيق الدردشة

## المتطلبات الأساسية

### 1. تثبيت Flutter SDK
```bash
# تحميل Flutter SDK
git clone https://github.com/flutter/flutter.git -b stable
export PATH="$PATH:$PWD/flutter/bin"

# التحقق من التثبيت
flutter doctor
```

### 2. إعداد بيئة التطوير
- **Android Studio** أو **VS Code** مع إضافات Flutter/Dart
- **Android SDK** للتطوير على Android
- جهاز Android أو محاكي

### 3. إعداد Firebase
- اتبع تعليمات الملف `firebase_setup_instructions.md`
- تأكد من وضع ملف `google-services.json` في `android/app/`

## تشغيل التطبيق

### 1. تثبيت التبعيات
```bash
cd flutter_chat_app
flutter pub get
```

### 2. التحقق من التحليل
```bash
flutter analyze
```

### 3. تشغيل التطبيق
```bash
# تشغيل على جهاز/محاكي متصل
flutter run

# أو تشغيل في وضع debug
flutter run --debug

# أو تشغيل في وضع release
flutter run --release
```

### 4. بناء APK للتوزيع
```bash
flutter build apk --release
```

## اختبار التطبيق

### 1. إنشاء حساب مالك التطبيق
1. شغّل التطبيق
2. اختر "إنشاء حساب جديد"
3. املأ البيانات وتأكد من تفعيل "مالك التطبيق"
4. سجّل الدخول

### 2. إنشاء حساب مستخدم عادي
1. استخدم محاكي آخر أو جهاز مختلف
2. أنشئ حساب عادي (بدون تفعيل مالك التطبيق)

### 3. اختبار الميزات
1. **إنشاء مجموعة**: من حساب المالك أو المستخدم العادي
2. **الانضمام للمجموعة**: من الحساب الآخر
3. **إرسال رسائل**: اختبر الدردشة بين الحسابين
4. **إشعارات المالك**: من حساب المالك، أرسل إشعار عام

## مميزات التطبيق

### للمستخدمين العاديين:
- ✅ تسجيل الدخول والتسجيل
- ✅ إنشاء مجموعات دردشة
- ✅ الانضمام للمجموعات
- ✅ إرسال واستقبال الرسائل
- ✅ تحديث الملف الشخصي
- ✅ عرض حالة الاتصال

### لمالك التطبيق:
- ✅ جميع مميزات المستخدم العادي
- ✅ إرسال إشعارات عامة لجميع المستخدمين
- ✅ وصول لقسم الإشعارات الخاص
- ✅ إشعارات مميزة بصرياً

### نظام الإشعارات:
- ✅ إشعارات محلية للرسائل الجديدة
- ✅ إشعارات push (مع إعداد Firebase Cloud Functions)
- ✅ إشعارات خاصة من المالك
- ✅ تمييز بصري للإشعارات المهمة

## نصائح التطوير

### 1. تطوير بدون Firebase
```dart
// يمكنك تعطيل Firebase مؤقتاً للتطوير المحلي
// main.dart
// await Firebase.initializeApp(); // علق هذا السطر
```

### 2. اختبار الواجهات
```bash
# تشغيل في وضع hot reload للتطوير السريع
flutter run

# ثم استخدم 'r' لإعادة التحميل أو 'R' لإعادة التشغيل
```

### 3. تخصيص التصميم
- عدّل ملف `lib/utils/app_theme.dart` لتغيير الألوان والخطوط
- أضف صور مخصصة في مجلد `assets/images/`

### 4. إضافة ميزات جديدة
```dart
// إضافة شاشة جديدة
// 1. أنشئ ملف في lib/screens/
// 2. أضف التوجيه في الشاشة المناسبة
// 3. حدّث Provider إذا احتجت إدارة حالة
```

## استكشاف الأخطاء الشائعة

### خطأ في Firebase
```
Error: google-services.json not found
الحل: تأكد من وضع الملف في android/app/
```

### خطأ في Gradle
```
Error: Failed to resolve dependencies
الحل: flutter clean && flutter pub get
```

### مشاكل الإشعارات
```
Notifications not working
الحل: 
1. تحقق من أذونات الإشعارات في AndroidManifest.xml
2. تأكد من إعداد Firebase Messaging
3. اختبر على جهاز حقيقي (ليس محاكي)
```

### خطأ في التحليل
```
flutter analyze errors
الحل: اتبع رسائل الخطأ وأصلح المشاكل المذكورة
```

## البناء للإنتاج

### 1. إعداد التوقيع
```bash
# أنشئ مفتاح للتوقيع
keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```

### 2. تكوين build.gradle
```gradle
// android/app/build.gradle
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
        storePassword keystoreProperties['storePassword']
    }
}
```

### 3. بناء التطبيق
```bash
flutter build apk --release --obfuscate --split-debug-info=debug-info/
```

## الدعم والمساعدة

للحصول على المساعدة:
1. راجع ملف README.md
2. تحقق من وثائق Flutter الرسمية
3. راجع وثائق Firebase
4. افتح issue في GitHub إذا واجهت مشاكل