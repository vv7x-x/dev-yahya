import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/auth_service.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _nameController = TextEditingController();
  
  bool _isLogin = true;
  bool _isOwner = false;
  bool _isLoading = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _nameController.dispose();
    super.dispose();
  }

  Future<void> _submitForm() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _isLoading = true;
    });

    final authService = Provider.of<AuthService>(context, listen: false);
    String? error;

    if (_isLogin) {
      error = await authService.signInWithEmailAndPassword(
        email: _emailController.text.trim(),
        password: _passwordController.text,
      );
    } else {
      error = await authService.signUpWithEmailAndPassword(
        email: _emailController.text.trim(),
        password: _passwordController.text,
        name: _nameController.text.trim(),
        isOwner: _isOwner,
      );
    }

    setState(() {
      _isLoading = false;
    });

    if (error != null && mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(error),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const Icon(
                  Icons.chat_bubble_outline,
                  size: 80,
                  color: Colors.blue,
                ),
                const SizedBox(height: 24),
                Text(
                  _isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد',
                  style: const TextStyle(
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 32),
                
                if (!_isLogin) ...[
                  TextFormField(
                    controller: _nameController,
                    decoration: const InputDecoration(
                      labelText: 'الاسم',
                      prefixIcon: Icon(Icons.person),
                    ),
                    validator: (value) {
                      if (value?.isEmpty ?? true) {
                        return 'يرجى إدخال الاسم';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 16),
                ],
                
                TextFormField(
                  controller: _emailController,
                  decoration: const InputDecoration(
                    labelText: 'البريد الإلكتروني',
                    prefixIcon: Icon(Icons.email),
                  ),
                  keyboardType: TextInputType.emailAddress,
                  validator: (value) {
                    if (value?.isEmpty ?? true) {
                      return 'يرجى إدخال البريد الإلكتروني';
                    }
                    if (!value!.contains('@')) {
                      return 'يرجى إدخال بريد إلكتروني صحيح';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16),
                
                TextFormField(
                  controller: _passwordController,
                  decoration: const InputDecoration(
                    labelText: 'كلمة المرور',
                    prefixIcon: Icon(Icons.lock),
                  ),
                  obscureText: true,
                  validator: (value) {
                    if (value?.isEmpty ?? true) {
                      return 'يرجى إدخال كلمة المرور';
                    }
                    if (value!.length < 6) {
                      return 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 16),
                
                if (!_isLogin) ...[
                  Row(
                    children: [
                      Checkbox(
                        value: _isOwner,
                        onChanged: (value) {
                          setState(() {
                            _isOwner = value ?? false;
                          });
                        },
                      ),
                      const Text('مالك التطبيق'),
                    ],
                  ),
                  const SizedBox(height: 16),
                ],
                
                ElevatedButton(
                  onPressed: _isLoading ? null : _submitForm,
                  child: _isLoading
                      ? const CircularProgressIndicator(color: Colors.white)
                      : Text(_isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'),
                ),
                const SizedBox(height: 16),
                
                TextButton(
                  onPressed: () {
                    setState(() {
                      _isLogin = !_isLogin;
                      _isOwner = false;
                    });
                  },
                  child: Text(
                    _isLogin 
                        ? 'ليس لديك حساب؟ إنشاء حساب جديد'
                        : 'لديك حساب بالفعل؟ تسجيل الدخول',
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}