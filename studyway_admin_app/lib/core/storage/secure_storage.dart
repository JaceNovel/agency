import 'dart:convert';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../config/api_config.dart';

final secureStorageProvider = Provider<SecureStorageService>((ref) => SecureStorageService());

class SecureStorageService {
  final _s = const FlutterSecureStorage(
    aOptions: AndroidOptions(encryptedSharedPreferences: true),
  );

  Future<void> saveToken(String token) => _s.write(key: ApiConfig.tokenKey, value: token);
  Future<String?> getToken() => _s.read(key: ApiConfig.tokenKey);
  Future<void> deleteToken() => _s.delete(key: ApiConfig.tokenKey);

  Future<void> saveUser(Map<String, dynamic> user) =>
      _s.write(key: ApiConfig.userKey, value: jsonEncode(user));
  Future<Map<String, dynamic>?> getUser() async {
    final raw = await _s.read(key: ApiConfig.userKey);
    if (raw == null) return null;
    return jsonDecode(raw) as Map<String, dynamic>;
  }

  Future<bool> isLoggedIn() async {
    final t = await getToken();
    return t != null && t.isNotEmpty;
  }

  Future<void> clearAll() => _s.deleteAll();
}
