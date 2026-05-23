import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../config/api_config.dart';

final apiClientProvider = Provider<ApiClient>((ref) => ApiClient());

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
    _dio.interceptors.addAll([_AuthInterceptor(_storage), _LogInterceptor()]);
  }

  Future<Response> get(String path, {Map<String, dynamic>? params}) =>
      _dio.get(path, queryParameters: params);

  Future<Response> post(String path, {dynamic data}) => _dio.post(path, data: data);

  Future<Response> patch(String path, {dynamic data}) => _dio.patch(path, data: data);

  Future<Response> delete(String path) => _dio.delete(path);
}

class _AuthInterceptor extends Interceptor {
  final FlutterSecureStorage _s;
  _AuthInterceptor(this._s);

  @override
  Future<void> onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    final token = await _s.read(key: ApiConfig.tokenKey);
    if (token != null) options.headers['Authorization'] = 'Bearer $token';
    handler.next(options);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    if (err.response?.statusCode == 401) {
      _s.delete(key: ApiConfig.tokenKey);
    }
    handler.next(err);
  }
}

class _LogInterceptor extends Interceptor {
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    assert(() { print('[API] [34m${options.method} ${options.path}[0m'); return true; }());
    handler.next(options);
  }
}

String parseApiError(DioException e) {
  final data = e.response?.data;
  if (data is Map) {
    if (data['message'] != null) return data['message'].toString();
    if (data['errors'] is Map) {
      final errors = data['errors'] as Map;
      final first = errors.values.first;
      return first is List ? first.first.toString() : first.toString();
    }
  }
  return switch (e.type) {
    DioExceptionType.connectionError => 'Pas de connexion internet.',
    DioExceptionType.connectionTimeout => 'Connexion trop lente.',
    _ => 'Erreur serveur. Réessayez.',
  };
}
