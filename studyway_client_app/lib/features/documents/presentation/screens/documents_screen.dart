import 'package:flutter/material.dart';
import '../../../../core/theme/app_theme.dart';

class DocumentsScreen extends StatelessWidget {
  const DocumentsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final docs = [
      ('Passeport', Icons.badge_outlined, 'validated', 'Valide jusqu\'au 2030'),
      ('Relevés de notes', Icons.school_outlined, 'pending', 'En attente de validation'),
      ('Attestation de bourse', Icons.account_balance_wallet_outlined, 'rejected', 'Document refusé — Renvoyer'),
      ('Photo d\'identité', Icons.person_outlined, 'validated', 'Validé'),
      ('Justificatif de domicile', Icons.home_outlined, 'pending', 'En cours de vérification'),
    ];

    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppBar(title: const Text('Mes Documents')),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {},
        backgroundColor: AppColors.primary,
        icon: const Icon(Icons.upload_outlined, color: Colors.white),
        label: const Text('Ajouter', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w800)),
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(20),
        itemCount: docs.length,
        separatorBuilder: (_, __) => const SizedBox(height: 10),
        itemBuilder: (_, i) {
          final doc = docs[i];
          final (bg, fg, label) = switch (doc.$3) {
            'validated' => (AppColors.successLight, AppColors.success, 'Validé'),
            'rejected'  => (AppColors.errorLight, AppColors.error, 'Refusé'),
            _           => (AppColors.warningLight, AppColors.warning, 'En attente'),
          };
          return Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(color: AppColors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: AppColors.border)),
            child: Row(
              children: [
                Container(width: 46, height: 46, decoration: BoxDecoration(color: AppColors.infoLight, borderRadius: BorderRadius.circular(12)), child: Icon(doc.$2, color: AppColors.primary)),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text(doc.$1, style: const TextStyle(fontWeight: FontWeight.w700, color: AppColors.text)),
                    Text(doc.$4, style: const TextStyle(fontSize: 12, color: AppColors.textSecondary)),
                  ]),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(50)),
                  child: Text(label, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: fg)),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
