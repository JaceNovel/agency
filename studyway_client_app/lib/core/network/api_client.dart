import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../config/api_config.dart';

final apiClientProvider = Provider<ApiClient>((ref) {
  return ApiClient();
});

class ApiClient {
  late final Dio _dio;
  final _storage = const FlutterSecureStorage();

  ApiClient() {
    _dio = Dio(BaseOptions(
      baseUrl: ApiConfig.baseUrl,
      connectTimeout: ApiConfig.connectTimeout,
      receiveTimeout: ApiConfig.receiveTimeout,
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    ));

    _dio.interceptors.addAll([
      _AuthInterceptor(_storage),
      _LoggingInterceptor(),
    ]);
  }

  Future<Response> get(String path, {Map<String, dynamic>? params}) =>
      _dio.get(path, queryParameters: params);

  Future<Response> post(String path, {dynamic data}) =>
      _dio.post(path, data: data);

  Future<Response> patch(String path, {dynamic data}) =>
      _dio.patch(path, data: data);

  Future<Response> put(String path, {dynamic data}) =>
      _dio.put(path, data: data);

  Future<Response> delete(String path) => _dio.delete(path);

  Future<Response> upload(String path, FormData formData) =>
      _dio.post(path, data: formData);
}

class _AuthInterceptor extends Interceptor {
  final FlutterSecureStorage _storage;

  _AuthInterceptor(this._storage);

  @override
  Future<void> onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    final token = await _storage.read(key: ApiConfig.tokenKey);
    if (token != null) {
      options.headers['Authorization'] = 'Bearer $token';
    }
    handler.next(options);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    if (err.response?.statusCode == 401) {
      _storage.delete(key: ApiConfig.tokenKey);
      _storage.delete(key: ApiConfig.userKey);
    }
    handler.next(err);
  }
}

class _LoggingInterceptor extends Interceptor {
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    assert(() {
      // ignore: avoid_print
      print('[API] ${options.method} ${options.path}');
      return true;
    }());
    handler.next(options);
  }
}

// Standardized API response wrapper
class ApiResponse<T> {
  final T? data;
  final String? message;
  final bool success;

  const ApiResponse({this.data, this.message, this.success = true});

  factory ApiResponse.fromJson(Map<String, dynamic> json, T Function(dynamic) fromJson) {
    return ApiResponse(
      data: json['data'] != null ? fromJson(json['data']) : null,
      message: json['message'],
      success: true,
    );
  }

  factory ApiResponse.error(String message) {
    return ApiResponse(success: false, message: message);
  }
}

// Exception handling
String parseApiError(DioException e) {
  final data = e.response?.data;
  if (data is Map) {
    if (data['message'] != null) return data['message'];
    if (data['errors'] is Map) {
      final errors = data['errors'] as Map;
      return errors.values.first is List
          ? errors.values.first.first.toString()
          : errors.values.first.toString();
    }
  }
  return switch (e.type) {
    DioExceptionType.connectionTimeout => 'Connexion impossible. Vérifiez votre réseau.',
    DioExceptionType.receiveTimeout => 'Le serveur ne répond pas.',
    DioExceptionType.connectionError => 'Pas de connexion internet.',
    _ => 'Une erreur est survenue. Réessayez.',
  };
}
