import 'package:flutter/material.dart';
import '../../../../core/theme/app_theme.dart';

class VisaScreen extends StatelessWidget {
  const VisaScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final steps = [
      ('Préparation du dossier', 'Rassemblez tous vos documents', true, true),
      ('Soumission', 'Dépôt en préfecture ou en ligne', true, false),
      ('Rendez-vous', 'Convocation à l\'entretien', false, false),
      ('Entretien', 'Passage devant le consul', false, false),
      ('Décision', 'Acceptation ou refus', false, false),
      ('Visa obtenu', 'Votre visa est accordé 🎉', false, false),
    ];

    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppBar(title: const Text('Visa & Immigration')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                  gradient: AppGradients.primaryGradient,
                  borderRadius: BorderRadius.circular(20)),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Visa Étudiant France',
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: 20,
                          fontWeight: FontWeight.w900)),
                  SizedBox(height: 6),
                  Text('Type D — Visa Long Séjour Étudiant',
                      style: TextStyle(
                          color: Colors.white70, fontWeight: FontWeight.w500)),
                  SizedBox(height: 16),
                  Row(children: [
                    Icon(Icons.circle, color: Colors.greenAccent, size: 10),
                    SizedBox(width: 8),
                    Text('En préparation',
                        style: TextStyle(
                            color: Colors.white, fontWeight: FontWeight.w700)),
                  ]),
                ],
              ),
            ),
            const SizedBox(height: 24),
            const Text('Progression',
                style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w800,
                    color: AppColors.text)),
            const SizedBox(height: 14),
            ...steps.asMap().entries.map((e) {
              final i = e.key;
              final s = e.value;
              return Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Column(
                    children: [
                      Container(
                        width: 32,
                        height: 32,
                        decoration: BoxDecoration(
                          color: s.$3
                              ? (s.$4 ? AppColors.primary : AppColors.success)
                              : AppColors.border,
                          shape: BoxShape.circle,
                        ),
                        child: Icon(
                          s.$3
                              ? (s.$4
                                  ? Icons.radio_button_checked
                                  : Icons.check)
                              : Icons.radio_button_unchecked,
                          color: s.$3 ? Colors.white : AppColors.textMuted,
                          size: 16,
                        ),
                      ),
                      if (i < steps.length - 1)
                        Container(
                            width: 2,
                            height: 48,
                            color: s.$3
                                ? AppColors.primary.withValues(alpha: 0.3)
                                : AppColors.border),
                    ],
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.only(top: 4, bottom: 40),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(s.$1,
                              style: TextStyle(
                                  fontWeight: FontWeight.w700,
                                  fontSize: 15,
                                  color: s.$3
                                      ? AppColors.text
                                      : AppColors.textMuted)),
                          Text(s.$2,
                              style: const TextStyle(
                                  fontSize: 13,
                                  color: AppColors.textSecondary,
                                  fontWeight: FontWeight.w500)),
                        ],
                      ),
                    ),
                  ),
                ],
              );
            }),
            ElevatedButton.icon(
              onPressed: () {},
              icon: const Icon(Icons.calendar_today_outlined),
              label: const Text('Prendre rendez-vous'),
              style: ElevatedButton.styleFrom(
                  minimumSize: const Size(double.infinity, 52)),
            ),
          ],
        ),
      ),
    );
  }
}
