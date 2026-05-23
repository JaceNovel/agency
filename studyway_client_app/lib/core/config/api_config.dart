class ApiConfig {
  static const String baseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'https://api.studyway.space/api/v1',
  );

  static const Duration connectTimeout = Duration(seconds: 30);
  static const Duration receiveTimeout = Duration(seconds: 30);

  static const String tokenKey = 'sw_auth_token';
  static const String userKey = 'sw_user';

  // API endpoints
  static const String login = '/auth/login';
  static const String register = '/auth/register';
  static const String me = '/auth/me';
  static const String logout = '/auth/logout';

  static const String dashboard = '/dashboard';
  static const String profile = '/profile';

  static const String visa = '/visa';
  static const String documents = '/documents';
  static const String payments = '/payments';
  static const String financings = '/financings';
  static const String universities = '/universities';

  static const String housingListings = '/housing/listings';
  static const String housingRequests = '/housing/requests';

  static const String transportBookings = '/transport/bookings';

  static const String esimPlans = '/esim/plans';
  static const String myEsims = '/esim/my-esims';

  static const String conversations = '/conversations';

  static const String travels = '/travels';

  static const String calendarSlots = '/calendar/slots';
  static const String appointments = '/calendar/appointments';

  static const String flightOffers = '/flights/offers';
  static const String stayHotels = '/stays/hotels';

  static const String parcoursupFormations = '/parcoursup/formations';
  static const String parcoursupSearch = '/parcoursup/search';
}
