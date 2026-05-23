import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_theme.dart';
import '../../../../core/storage/secure_storage.dart';
import '../../../../core/constants/route_names.dart';
class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final sections = [
      ('Compte', [
        (Icons.person_outline, 'Informations personnelles', () {}),
        (Icons.lock_outline, 'Sécurité & mot de passe', () {}),
        (Icons.notifications_outlined, 'Notifications', () {}),
      ]),
      ('StudyWay', [
        (Icons.folder_outlined, 'Mes documents', () => context.go(RouteNames.documents)),
        (Icons.receipt_outlined, 'Historique paiements', () => context.go(RouteNames.finance)),
        (Icons.calendar_today_outlined, 'Mes rendez-vous', () => context.go(RouteNames.calendar)),
      ]),
      ('Assistance', [
        (Icons.support_agent_outlined, 'Contacter le support', () => context.go(RouteNames.messages)),
        (Icons.help_outline, 'FAQ', () {}),
        (Icons.star_outline, 'Noter l\'app', () {}),
      ]),
    ];
    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppBar(title: const Text('Mon Profil')),
      body: SingleChildScrollView(
        child: Column(children: [
          Container(
            color: AppColors.white,
            padding: const EdgeInsets.all(24),
            child: Row(children: [
              CircleAvatar(radius: 36, backgroundColor: AppColors.infoLight, child: const Text('CK', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: AppColors.primary))),
              const SizedBox(width: 18),
              const Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text('Christelle Komi', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: AppColors.text)),
                Text('Étudiant · SW-2026-001', style: TextStyle(color: AppColors.textSecondary, fontSize: 13, fontWeight: FontWeight.w500)),
                SizedBox(height: 8),
                Row(children: [Icon(Icons.circle, size: 8, color: AppColors.success), SizedBox(width: 6), Text('Dossier actif', style: TextStyle(fontSize: 12, color: AppColors.success, fontWeight: FontWeight.w700))]),
              ])),
            ]),
          ),
          const SizedBox(height: 16),
          ...sections.map((section) => Padding(
            padding: const EdgeInsets.only(bottom: 16),
            child: Container(
              color: AppColors.white,
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Padding(padding: const EdgeInsets.fromLTRB(20, 16, 20, 8), child: Text(section.$1, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: AppColors.textSecondary, letterSpacing: 0.5))),
                ...section.$2.map((item) => ListTile(
                  leading: Container(width: 38, height: 38, decoration: BoxDecoration(color: AppColors.surface, borderRadius: BorderRadius.circular(10)), child: Icon(item.$1, size: 20, color: AppColors.primary)),
                  title: Text(item.$2, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                  trailing: const Icon(Icons.chevron_right, color: AppColors.textMuted, size: 20),
                  onTap: item.$3,
                )),
              ]),
            ),
          )).toList(),
          Padding(
            padding: const EdgeInsets.all(20),
            child: OutlinedButton.icon(
              onPressed: () async {
                await ref.read(secureStorageProvider).clearAll();
                if (context.mounted) context.go(RouteNames.login);
              },
              icon: const Icon(Icons.logout, color: AppColors.error),
              label: const Text('Se déconnecter', style: TextStyle(color: AppColors.error, fontWeight: FontWeight.w800)),
              style: OutlinedButton.styleFrom(side: const BorderSide(color: AppColors.error), minimumSize: const Size(double.infinity, 52)),
            ),
          ),
          const SizedBox(height: 16),
        ]),
      ),
    );
  }
}
