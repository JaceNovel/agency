import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../features/auth/presentation/screens/splash_screen.dart';
import '../../features/auth/presentation/screens/onboarding_screen.dart';
import '../../features/auth/presentation/screens/login_screen.dart';
import '../../features/auth/presentation/screens/register_screen.dart';
import '../../features/dashboard/presentation/screens/home_screen.dart';
import '../../features/visa/presentation/screens/visa_screen.dart';
import '../../features/documents/presentation/screens/documents_screen.dart';
import '../../features/travel/presentation/screens/travel_screen.dart';
import '../../features/housing/presentation/screens/housing_screen.dart';
import '../../features/transport/presentation/screens/transport_screen.dart';
import '../../features/esim/presentation/screens/esim_screen.dart';
import '../../features/finance/presentation/screens/finance_screen.dart';
import '../../features/calendar/presentation/screens/calendar_screen.dart';
import '../../features/messages/presentation/screens/messages_screen.dart';
import '../../features/profile/presentation/screens/profile_screen.dart';
import '../storage/secure_storage.dart';
import '../constants/route_names.dart';
import '../../features/dashboard/presentation/screens/shell_screen.dart';

final routerProvider = Provider<GoRouter>((ref) {
  final storage = ref.read(secureStorageProvider);

  return GoRouter(
    initialLocation: RouteNames.splash,
    redirect: (context, state) async {
      final isLoggedIn = await storage.isLoggedIn();
      final isOnAuth = [
        RouteNames.splash,
        RouteNames.onboarding,
        RouteNames.login,
        RouteNames.register,
      ].contains(state.matchedLocation);

      if (!isLoggedIn && !isOnAuth) return RouteNames.login;
      if (isLoggedIn && isOnAuth && state.matchedLocation != RouteNames.splash) {
        return RouteNames.home;
      }
      return null;
    },
    routes: [
      GoRoute(path: RouteNames.splash, builder: (_, __) => const SplashScreen()),
      GoRoute(path: RouteNames.onboarding, builder: (_, __) => const OnboardingScreen()),
      GoRoute(path: RouteNames.login, builder: (_, __) => const LoginScreen()),
      GoRoute(path: RouteNames.register, builder: (_, __) => const RegisterScreen()),

      ShellRoute(
        builder: (context, state, child) => ShellScreen(child: child),
        routes: [
          GoRoute(path: RouteNames.home, builder: (_, __) => const HomeScreen()),
          GoRoute(path: RouteNames.visa, builder: (_, __) => const VisaScreen()),
          GoRoute(path: RouteNames.documents, builder: (_, __) => const DocumentsScreen()),
          GoRoute(path: RouteNames.travel, builder: (_, __) => const TravelScreen()),
          GoRoute(path: RouteNames.housing, builder: (_, __) => const HousingScreen()),
          GoRoute(path: RouteNames.transport, builder: (_, __) => const TransportScreen()),
          GoRoute(path: RouteNames.esim, builder: (_, __) => const EsimScreen()),
          GoRoute(path: RouteNames.finance, builder: (_, __) => const FinanceScreen()),
          GoRoute(path: RouteNames.calendar, builder: (_, __) => const CalendarScreen()),
          GoRoute(path: RouteNames.messages, builder: (_, __) => const MessagesScreen()),
          GoRoute(path: RouteNames.profile, builder: (_, __) => const ProfileScreen()),
        ],
      ),
    ],
    errorBuilder: (context, state) => Scaffold(
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.error_outline, size: 64, color: Colors.red),
            const SizedBox(height: 16),
            Text('Page introuvable', style: Theme.of(context).textTheme.headlineMedium),
            TextButton(onPressed: () => context.go(RouteNames.home), child: const Text('Accueil')),
          ],
        ),
      ),
    ),
  );
});
