import 'package:flutter/material.dart';
import '../../../../core/theme/app_theme.dart';

class TransportScreen extends StatelessWidget {
  const TransportScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppBar(title: const Text('Transfert Aéroport')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
                color: AppColors.infoLight,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(
                    color: AppColors.primary.withValues(alpha: 0.15))),
            child: Row(children: [
              const Icon(Icons.directions_car_outlined,
                  size: 40, color: AppColors.primary),
              const SizedBox(width: 16),
              Expanded(
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                    const Text('Transfert aéroport → logement',
                        style: TextStyle(
                            fontWeight: FontWeight.w800,
                            fontSize: 15,
                            color: AppColors.text)),
                    const Text('Chauffeur privé · Bagages acceptés',
                        style: TextStyle(
                            color: AppColors.textSecondary, fontSize: 13)),
                  ])),
            ]),
          ),
          const SizedBox(height: 24),
          ...[
            ('Berline privée', 'CDG → Paris centre', '62 100 FCFA'),
            ('Van étudiant', 'CDG → Résidence étudiante', '80 500 FCFA'),
            ('RER B', 'CDG → Paris Gare du Nord', '6 900 FCFA')
          ]
              .map((t) => Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                          color: AppColors.white,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: AppColors.border)),
                      child: Row(children: [
                        const Icon(Icons.directions_car_outlined,
                            color: AppColors.primary),
                        const SizedBox(width: 14),
                        Expanded(
                            child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                              Text(t.$1,
                                  style: const TextStyle(
                                      fontWeight: FontWeight.w700)),
                              Text(t.$2,
                                  style: const TextStyle(
                                      fontSize: 12,
                                      color: AppColors.textSecondary)),
                            ])),
                        Text(t.$3,
                            style: const TextStyle(
                                fontWeight: FontWeight.w800,
                                color: AppColors.primary,
                                fontSize: 13)),
                      ]),
                    ),
                  ))
              .toList(),
          const SizedBox(height: 12),
          ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                  minimumSize: const Size(double.infinity, 52)),
              child: const Text('Réserver un transfert')),
        ]),
      ),
    );
  }
}
