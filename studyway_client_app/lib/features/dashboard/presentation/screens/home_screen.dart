import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../../core/constants/route_names.dart';
import '../../../../core/network/api_client.dart';
import '../../../../core/config/api_config.dart';

final dashboardProvider = FutureProvider<Map<String, dynamic>>((ref) async {
  final api = ref.read(apiClientProvider);
  final resp = await api.get(ApiConfig.dashboard);
  return Map<String, dynamic>.from(resp.data['data'] ?? {});
});

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final dashAsync = ref.watch(dashboardProvider);

    return Scaffold(
      backgroundColor: AppColors.surface,
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            floating: true,
            backgroundColor: AppColors.white,
            elevation: 0,
            toolbarHeight: 70,
            title: dashAsync.when(
              data: (data) {
                final user = data['user'] as Map? ?? {};
                final name =
                    user['name']?.toString().split(' ').first ?? 'Étudiant';
                return Row(
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Bonjour, $name 👋',
                            style: const TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.w900,
                                color: AppColors.text)),
                        const Text('Bienvenue sur StudyWay',
                            style: TextStyle(
                                fontSize: 13,
                                color: AppColors.textSecondary,
                                fontWeight: FontWeight.w500)),
                      ],
                    ),
                  ],
                );
              },
              loading: () => const Text('StudyWay',
                  style: TextStyle(fontWeight: FontWeight.w900)),
              error: (_, __) => const Text('StudyWay',
                  style: TextStyle(fontWeight: FontWeight.w900)),
            ),
            actions: [
              IconButton(
                icon: const Icon(Icons.notifications_outlined),
                onPressed: () {},
                style: IconButton.styleFrom(
                  backgroundColor: AppColors.surface,
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12)),
                ),
              ),
              const SizedBox(width: 12),
            ],
          ),
          SliverToBoxAdapter(
            child: dashAsync.when(
              data: (data) => _DashboardContent(data: data),
              loading: () => const _DashboardSkeleton(),
              error: (e, _) => _DashboardError(
                  error: e.toString(),
                  onRetry: () => ref.invalidate(dashboardProvider)),
            ),
          ),
        ],
      ),
    );
  }
}

class _DashboardContent extends StatelessWidget {
  final Map<String, dynamic> data;

  const _DashboardContent({required this.data});

  @override
  Widget build(BuildContext context) {
    final student = data['student'] as Map? ?? {};
    final progress = (student['profile_completion'] as num?)?.toInt() ?? 15;
    final fileStatus = student['file_status']?.toString() ?? 'draft';
    final visaStatus = student['visa_status']?.toString() ?? 'not_started';

    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Progress card
          _ProgressCard(progress: progress, fileStatus: fileStatus),
          const SizedBox(height: 20),

          // Quick actions
          const Text('Mes services',
              style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w800,
                  color: AppColors.text)),
          const SizedBox(height: 14),
          _ServicesGrid(),
          const SizedBox(height: 24),

          // Status cards
          const Text('Mon avancement',
              style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w800,
                  color: AppColors.text)),
          const SizedBox(height: 14),
          _StatusCard(
              title: 'Dossier visa',
              status: visaStatus,
              icon: Icons.article_outlined,
              route: RouteNames.visa),
          const SizedBox(height: 10),
          _StatusCard(
              title: 'Documents',
              status: fileStatus,
              icon: Icons.folder_outlined,
              route: RouteNames.documents),
          const SizedBox(height: 10),
          _StatusCard(
              title: 'Mon voyage',
              status: 'preparation',
              icon: Icons.flight_takeoff_outlined,
              route: RouteNames.travel),
          const SizedBox(height: 24),

          // Support card
          _SupportCard(),
          const SizedBox(height: 32),
        ],
      ),
    );
  }
}

class _ProgressCard extends StatelessWidget {
  final int progress;
  final String fileStatus;

  const _ProgressCard({required this.progress, required this.fileStatus});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: AppGradients.nightGradient,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
              color: AppColors.nightBlue.withValues(alpha: 0.3),
              blurRadius: 20,
              offset: const Offset(0, 8))
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('Mon dossier',
                  style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w700,
                      fontSize: 15)),
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(50)),
                child: Text(_statusLabel(fileStatus),
                    style: const TextStyle(
                        color: Colors.white,
                        fontSize: 12,
                        fontWeight: FontWeight.w700)),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Text('$progress%',
                  style: const TextStyle(
                      color: Colors.white,
                      fontSize: 36,
                      fontWeight: FontWeight.w900)),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Complété',
                        style: TextStyle(
                            color: Colors.white60,
                            fontSize: 12,
                            fontWeight: FontWeight.w500)),
                    const SizedBox(height: 8),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(4),
                      child: LinearProgressIndicator(
                        value: progress / 100,
                        backgroundColor: Colors.white24,
                        valueColor:
                            const AlwaysStoppedAnimation<Color>(Colors.white),
                        minHeight: 8,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          SizedBox(
            width: double.infinity,
            child: OutlinedButton(
              onPressed: () {},
              style: OutlinedButton.styleFrom(
                foregroundColor: Colors.white,
                side: const BorderSide(color: Colors.white38),
                minimumSize: const Size(0, 42),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10)),
              ),
              child: const Text('Compléter mon dossier',
                  style: TextStyle(fontWeight: FontWeight.w700, fontSize: 13)),
            ),
          ),
        ],
      ),
    );
  }

  String _statusLabel(String status) {
    return switch (status) {
      'active' => 'Actif',
      'completed' => 'Terminé',
      'draft' => 'En cours',
      _ => status,
    };
  }
}

class _ServicesGrid extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final services = [
      (
        Icons.article_outlined,
        'Visa',
        AppColors.primary,
        AppColors.infoLight,
        RouteNames.visa
      ),
      (
        Icons.folder_outlined,
        'Documents',
        const Color(0xFF7C3AED),
        const Color(0xFFF5F3FF),
        RouteNames.documents
      ),
      (
        Icons.flight_outlined,
        'Billets',
        AppColors.nightBlue,
        const Color(0xFFEFF6FF),
        RouteNames.travel
      ),
      (
        Icons.home_outlined,
        'Logement',
        const Color(0xFF059669),
        AppColors.successLight,
        RouteNames.housing
      ),
      (
        Icons.directions_car_outlined,
        'Transport',
        const Color(0xFFD97706),
        AppColors.warningLight,
        RouteNames.transport
      ),
      (
        Icons.sim_card_outlined,
        'eSIM',
        const Color(0xFFDB2777),
        const Color(0xFFFDF2F8),
        RouteNames.esim
      ),
      (
        Icons.account_balance_outlined,
        'Finance',
        const Color(0xFF0891B2),
        const Color(0xFFECFEFF),
        RouteNames.finance
      ),
      (
        Icons.calendar_today_outlined,
        'RDV',
        AppColors.success,
        AppColors.successLight,
        RouteNames.calendar
      ),
    ];

    return GridView.count(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      crossAxisCount: 4,
      mainAxisSpacing: 14,
      crossAxisSpacing: 12,
      childAspectRatio: 0.9,
      children: services
          .map((s) => _ServiceTile(
                icon: s.$1,
                label: s.$2,
                color: s.$3,
                bg: s.$4,
                route: s.$5,
              ))
          .toList(),
    );
  }
}

class _ServiceTile extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color color;
  final Color bg;
  final String route;

  const _ServiceTile(
      {required this.icon,
      required this.label,
      required this.color,
      required this.bg,
      required this.route});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => context.go(route),
      child: Column(
        children: [
          Container(
            width: 52,
            height: 52,
            decoration: BoxDecoration(
                color: bg, borderRadius: BorderRadius.circular(16)),
            child: Icon(icon, color: color, size: 24),
          ),
          const SizedBox(height: 6),
          Text(label,
              style: const TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                  color: AppColors.text),
              textAlign: TextAlign.center),
        ],
      ),
    );
  }
}

class _StatusCard extends StatelessWidget {
  final String title;
  final String status;
  final IconData icon;
  final String route;

  const _StatusCard(
      {required this.title,
      required this.status,
      required this.icon,
      required this.route});

  @override
  Widget build(BuildContext context) {
    final (color, label) = _statusInfo(status);
    return GestureDetector(
      onTap: () => context.go(route),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppColors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.border),
        ),
        child: Row(
          children: [
            Container(
              width: 44,
              height: 44,
              decoration: BoxDecoration(
                  color: AppColors.infoLight,
                  borderRadius: BorderRadius.circular(12)),
              child: Icon(icon, color: AppColors.primary, size: 20),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title,
                      style: const TextStyle(
                          fontWeight: FontWeight.w700,
                          fontSize: 14,
                          color: AppColors.text)),
                  const SizedBox(height: 2),
                  Text(label,
                      style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: color)),
                ],
              ),
            ),
            const Icon(Icons.chevron_right, color: AppColors.textMuted),
          ],
        ),
      ),
    );
  }

  (Color, String) _statusInfo(String status) => switch (status) {
        'active' || 'preparation' => (AppColors.warning, 'En préparation'),
        'completed' || 'approved' => (AppColors.success, 'Complété'),
        'submitted' => (AppColors.info, 'Soumis'),
        'draft' => (AppColors.textSecondary, 'À compléter'),
        _ => (AppColors.textSecondary, 'Non démarré'),
      };
}

class _SupportCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.infoLight,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.primary.withValues(alpha: 0.15)),
      ),
      child: Row(
        children: [
          Container(
            width: 50,
            height: 50,
            decoration: BoxDecoration(
                color: AppColors.primary,
                borderRadius: BorderRadius.circular(14)),
            child: const Icon(Icons.headset_mic_outlined,
                color: Colors.white, size: 24),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Besoin d\'aide ?',
                    style: TextStyle(
                        fontWeight: FontWeight.w800,
                        fontSize: 15,
                        color: AppColors.text)),
                const Text('Notre équipe est disponible 24h/24.',
                    style: TextStyle(
                        fontSize: 12,
                        color: AppColors.textSecondary,
                        fontWeight: FontWeight.w500)),
              ],
            ),
          ),
          TextButton(
            onPressed: () => context.go(RouteNames.messages),
            child: const Text('Contacter',
                style: TextStyle(fontWeight: FontWeight.w800, fontSize: 13)),
          ),
        ],
      ),
    );
  }
}

class _DashboardSkeleton extends StatelessWidget {
  const _DashboardSkeleton();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        children: List.generate(
            4,
            (i) => Padding(
                  padding: const EdgeInsets.only(bottom: 16),
                  child: Container(
                    height: i == 0 ? 150 : 72,
                    decoration: BoxDecoration(
                        color: AppColors.border,
                        borderRadius: BorderRadius.circular(20)),
                  ),
                )),
      ),
    );
  }
}

class _DashboardError extends StatelessWidget {
  final String error;
  final VoidCallback onRetry;

  const _DashboardError({required this.error, required this.onRetry});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(40),
      child: Column(
        children: [
          const Icon(Icons.wifi_off_outlined,
              size: 64, color: AppColors.textMuted),
          const SizedBox(height: 16),
          const Text('Connexion impossible',
              style: TextStyle(
                  fontWeight: FontWeight.w800,
                  fontSize: 18,
                  color: AppColors.text)),
          const SizedBox(height: 8),
          const Text('Vérifiez votre connexion internet.',
              textAlign: TextAlign.center,
              style: TextStyle(color: AppColors.textSecondary)),
          const SizedBox(height: 24),
          ElevatedButton.icon(
            onPressed: onRetry,
            icon: const Icon(Icons.refresh),
            label: const Text('Réessayer'),
            style: ElevatedButton.styleFrom(minimumSize: const Size(160, 48)),
          ),
        ],
      ),
    );
  }
}
