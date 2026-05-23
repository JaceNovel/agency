import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/config/api_config.dart';
import '../../../../core/network/api_client.dart';
import '../../../../core/storage/secure_storage.dart';
import '../../../../core/theme/admin_theme.dart';
import '../../../../core/constants/admin_routes.dart';

final dashboardProvider = FutureProvider.autoDispose<Map<String, dynamic>>((ref) async {
  final api = ref.read(apiClientProvider);
  final resp = await api.get(ApiConfig.adminDashboard);
  return (resp.data['data'] ?? resp.data) as Map<String, dynamic>;
});

final adminUserProvider = FutureProvider.autoDispose<Map<String, dynamic>?>((ref) async {
  return ref.read(secureStorageProvider).getUser();
});

class AdminDashboardScreen extends ConsumerWidget {
  const AdminDashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final dashAsync = ref.watch(dashboardProvider);
    final userAsync = ref.watch(adminUserProvider);

    final userName = userAsync.valueOrNull?['name']?.toString() ?? 'Admin';

    return Scaffold(
      backgroundColor: AdminColors.surface,
      appBar: AppBar(
        title: const Text('Dashboard'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh_outlined),
            onPressed: () {
              ref.invalidate(dashboardProvider);
              ref.invalidate(adminUserProvider);
            },
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: dashAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => _FallbackDashboard(userName: userName),
        data: (data) => _DashboardBody(data: data, userName: userName),
      ),
    );
  }
}

class _DashboardBody extends StatelessWidget {
  final Map<String, dynamic> data;
  final String userName;
  const _DashboardBody({required this.data, required this.userName});

  @override
  Widget build(BuildContext context) {
    final stats = data['stats'] as Map? ?? {};
    final recentStudents = (data['recent_students'] as List?)?.cast<Map<String, dynamic>>() ?? [];

    final statCards = [
      (_n(stats['new_students']), 'Nouveaux étudiants', Icons.person_add_outlined, AdminColors.primary, const Color(0xFFEFF6FF), AdminRoutes.students),
      (_n(stats['pending_documents']), 'Documents en attente', Icons.folder_open_outlined, AdminColors.warning, const Color(0xFFFFFBEB), AdminRoutes.documents),
      (_n(stats['pending_payments']), 'Paiements à valider', Icons.payments_outlined, AdminColors.success, const Color(0xFFF0FDF4), AdminRoutes.payments),
      (_n(stats['today_appointments']), 'RDV aujourd\'hui', Icons.event_outlined, const Color(0xFF7C3AED), const Color(0xFFF5F3FF), AdminRoutes.appointments),
      (_n(stats['unread_messages']), 'Messages non lus', Icons.chat_outlined, AdminColors.error, const Color(0xFFFEF2F2), AdminRoutes.messages),
      (_n(stats['total_students']), 'Total étudiants', Icons.people_outlined, AdminColors.nightBlue, const Color(0xFFEFF6FF), AdminRoutes.students),
    ];

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Bonjour, $userName 👋', style: Theme.of(context).textTheme.headlineMedium),
                  const Text('Voici l\'état de la plateforme aujourd\'hui.', style: TextStyle(color: AdminColors.textSecondary, fontSize: 14)),
                ],
              ),
              Text(_todayDate(), style: const TextStyle(color: AdminColors.textSecondary, fontWeight: FontWeight.w600)),
            ],
          ),
          const SizedBox(height: 24),

          GridView.count(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisCount: MediaQuery.of(context).size.width > 600 ? 3 : 2,
            mainAxisSpacing: 12,
            crossAxisSpacing: 12,
            childAspectRatio: 1.6,
            children: statCards.map((s) => GestureDetector(
              onTap: () => context.go(s.$6),
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(color: AdminColors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: AdminColors.border)),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      width: 38, height: 38,
                      decoration: BoxDecoration(color: s.$5, borderRadius: BorderRadius.circular(10)),
                      child: Icon(s.$3, color: s.$4, size: 20),
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(s.$1, style: TextStyle(fontSize: 26, fontWeight: FontWeight.w900, color: s.$4)),
                        Text(s.$2, style: const TextStyle(fontSize: 12, color: AdminColors.textSecondary, fontWeight: FontWeight.w500)),
                      ],
                    ),
                  ],
                ),
              ),
            )).toList(),
          ),
          const SizedBox(height: 24),

          if (recentStudents.isNotEmpty) ...[
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Étudiants récents', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: AdminColors.text)),
                TextButton(onPressed: () => context.go(AdminRoutes.students), child: const Text('Voir tous')),
              ],
            ),
            const SizedBox(height: 12),
            Container(
              decoration: BoxDecoration(color: AdminColors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: AdminColors.border)),
              child: Column(
                children: recentStudents.asMap().entries.map((e) {
                  final i = e.key;
                  final s = e.value;
                  final name = s['name']?.toString() ?? '${s['first_name'] ?? ''} ${s['last_name'] ?? ''}'.trim();
                  final status = s['file_status']?.toString() ?? 'draft';
                  final country = s['destination_country']?.toString() ?? '—';

                  final (statusBg, statusFg) = switch (status) {
                    'active' => (const Color(0xFFF0FDF4), AdminColors.success),
                    'completed' => (const Color(0xFFEFF6FF), AdminColors.primary),
                    _ => (const Color(0xFFFFFBEB), AdminColors.warning),
                  };

                  return Column(
                    children: [
                      if (i > 0) const Divider(height: 1, indent: 20, endIndent: 20),
                      ListTile(
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                        leading: CircleAvatar(
                          radius: 22,
                          backgroundColor: const Color(0xFFEFF6FF),
                          child: Text(name.isNotEmpty ? name[0].toUpperCase() : '?', style: const TextStyle(fontWeight: FontWeight.w800, color: AdminColors.primary)),
                        ),
                        title: Text(name, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14)),
                        subtitle: Text(country, style: const TextStyle(color: AdminColors.textSecondary, fontSize: 12)),
                        trailing: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(color: statusBg, borderRadius: BorderRadius.circular(50)),
                          child: Text(status, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: statusFg)),
                        ),
                        onTap: () => context.go(AdminRoutes.students),
                      ),
                    ],
                  );
                }).toList(),
              ),
            ),
          ],
          const SizedBox(height: 32),
        ],
      ),
    );
  }

  String _n(dynamic value) => value?.toString() ?? '—';
  String _todayDate() {
    final now = DateTime.now();
    final months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    return '${now.day} ${months[now.month - 1]} ${now.year}';
  }
}

// Fallback shown when API is unreachable
class _FallbackDashboard extends StatelessWidget {
  final String userName;
  const _FallbackDashboard({required this.userName});

  @override
  Widget build(BuildContext context) {
    final placeholders = [
      ('—', 'Nouveaux étudiants', Icons.person_add_outlined, AdminColors.primary, const Color(0xFFEFF6FF), AdminRoutes.students),
      ('—', 'Documents en attente', Icons.folder_open_outlined, AdminColors.warning, const Color(0xFFFFFBEB), AdminRoutes.documents),
      ('—', 'Paiements à valider', Icons.payments_outlined, AdminColors.success, const Color(0xFFF0FDF4), AdminRoutes.payments),
      ('—', 'RDV aujourd\'hui', Icons.event_outlined, const Color(0xFF7C3AED), const Color(0xFFF5F3FF), AdminRoutes.appointments),
      ('—', 'Messages non lus', Icons.chat_outlined, AdminColors.error, const Color(0xFFFEF2F2), AdminRoutes.messages),
      ('—', 'Total étudiants', Icons.people_outlined, AdminColors.nightBlue, const Color(0xFFEFF6FF), AdminRoutes.students),
    ];

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Bonjour, $userName 👋', style: Theme.of(context).textTheme.headlineMedium),
                  const Text('Connexion API indisponible.', style: TextStyle(color: AdminColors.textSecondary, fontSize: 14)),
                ],
              ),
            ],
          ),
          const SizedBox(height: 24),
          GridView.count(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisCount: MediaQuery.of(context).size.width > 600 ? 3 : 2,
            mainAxisSpacing: 12,
            crossAxisSpacing: 12,
            childAspectRatio: 1.6,
            children: placeholders.map((s) => GestureDetector(
              onTap: () => context.go(s.$6),
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(color: AdminColors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: AdminColors.border)),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      width: 38, height: 38,
                      decoration: BoxDecoration(color: s.$5, borderRadius: BorderRadius.circular(10)),
                      child: Icon(s.$3, color: s.$4, size: 20),
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(s.$1, style: TextStyle(fontSize: 26, fontWeight: FontWeight.w900, color: s.$4)),
                        Text(s.$2, style: const TextStyle(fontSize: 12, color: AdminColors.textSecondary, fontWeight: FontWeight.w500)),
                      ],
                    ),
                  ],
                ),
              ),
            )).toList(),
          ),
        ],
      ),
    );
  }
}
