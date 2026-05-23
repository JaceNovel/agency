import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../constants/admin_routes.dart';
import '../../features/auth/presentation/screens/admin_login_screen.dart';
import '../../features/dashboard/presentation/screens/admin_dashboard_screen.dart';
import '../../features/students/presentation/screens/admin_students_screen.dart';
import '../../features/documents/presentation/screens/admin_documents_screen.dart';
import '../../features/payments/presentation/screens/admin_payments_screen.dart';
import '../../features/appointments/presentation/screens/admin_appointments_screen.dart';
import '../../features/messages/presentation/screens/admin_messages_screen.dart';
import '../../shared/admin_shell.dart';

final adminRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: AdminRoutes.login,
    routes: [
      GoRoute(path: AdminRoutes.login, builder: (_, __) => const AdminLoginScreen()),
      ShellRoute(
        builder: (_, __, child) => AdminShell(child: child),
        routes: [
          GoRoute(path: AdminRoutes.dashboard, builder: (_, __) => const AdminDashboardScreen()),
          GoRoute(path: AdminRoutes.students, builder: (_, __) => const AdminStudentsScreen()),
          GoRoute(path: AdminRoutes.documents, builder: (_, __) => const AdminDocumentsScreen()),
          GoRoute(path: AdminRoutes.payments, builder: (_, __) => const AdminPaymentsScreen()),
          GoRoute(path: AdminRoutes.appointments, builder: (_, __) => const AdminAppointmentsScreen()),
          GoRoute(path: AdminRoutes.messages, builder: (_, __) => const AdminMessagesScreen()),
        ],
      ),
    ],
  );
});
