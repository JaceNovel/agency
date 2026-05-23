class ApiConfig {
  static const String baseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'https://api.studyway.space/api/v1',
  );

  static const Duration connectTimeout = Duration(seconds: 30);
  static const Duration receiveTimeout = Duration(seconds: 30);

  static const String tokenKey = 'sw_admin_token';
  static const String userKey = 'sw_admin_user';

  // Auth
  static const String login = '/auth/login';
  static const String me = '/auth/me';
  static const String logout = '/auth/logout';

  // Admin
  static const String adminDashboard = '/admin/dashboard';
  static const String adminStudents = '/admin/students';
  static const String adminDocuments = '/admin/documents';
  static const String adminPayments = '/admin/payments';
  static const String adminVisa = '/admin/visa';
  static const String adminAppointments = '/admin/appointments';
  static const String adminConversations = '/admin/conversations';
}
