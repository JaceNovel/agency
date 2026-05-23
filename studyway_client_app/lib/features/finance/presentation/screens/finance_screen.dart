import 'package:flutter/material.dart';
import '../../../../core/theme/app_theme.dart';

class FinanceScreen extends StatelessWidget {
  const FinanceScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppBar(title: const Text('Finance & Banque')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
                gradient: AppGradients.nightGradient,
                borderRadius: BorderRadius.circular(20)),
            child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Mes paiements StudyWay',
                      style: TextStyle(
                          color: Colors.white70,
                          fontSize: 13,
                          fontWeight: FontWeight.w500)),
                  SizedBox(height: 4),
                  Text('485 600 FCFA',
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: 32,
                          fontWeight: FontWeight.w900)),
                  Text('Total réglé',
                      style: TextStyle(color: Colors.white60, fontSize: 13)),
                ]),
          ),
          const SizedBox(height: 24),
          const Text('Historique',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
          const SizedBox(height: 14),
          ...[
            ('Frais de dossier', '-150 000 FCFA', 'Validé', true),
            ('Accompagnement visa', '-200 000 FCFA', 'Validé', true),
            ('Billet d\'avion', '-135 600 FCFA', 'En attente', false)
          ]
              .map((t) => Padding(
                    padding: const EdgeInsets.only(bottom: 10),
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                          color: AppColors.white,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: AppColors.border)),
                      child: Row(children: [
                        Container(
                            width: 44,
                            height: 44,
                            decoration: BoxDecoration(
                                color: t.$4
                                    ? AppColors.successLight
                                    : AppColors.warningLight,
                                borderRadius: BorderRadius.circular(12)),
                            child: Icon(Icons.receipt_outlined,
                                color: t.$4
                                    ? AppColors.success
                                    : AppColors.warning)),
                        const SizedBox(width: 14),
                        Expanded(
                            child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                              Text(t.$1,
                                  style: const TextStyle(
                                      fontWeight: FontWeight.w700)),
                              Text(t.$3,
                                  style: TextStyle(
                                      fontSize: 12,
                                      color: t.$4
                                          ? AppColors.success
                                          : AppColors.warning,
                                      fontWeight: FontWeight.w600)),
                            ])),
                        Text(t.$2,
                            style: TextStyle(
                                fontWeight: FontWeight.w800,
                                color: t.$4
                                    ? AppColors.text
                                    : AppColors.textSecondary)),
                      ]),
                    ),
                  ))
              .toList(),
          const SizedBox(height: 24),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
                color: AppColors.warningLight,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                    color: AppColors.warning.withValues(alpha: 0.2))),
            child: const Row(children: [
              Icon(Icons.info_outline, color: AppColors.warning),
              SizedBox(width: 12),
              Expanded(
                  child: Text(
                      'L\'ouverture de compte bancaire en ligne et le financement ne sont pas encore disponibles.',
                      style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w600,
                          color: AppColors.text))),
            ]),
          ),
        ]),
      ),
    );
  }
}
