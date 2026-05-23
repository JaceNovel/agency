import 'package:flutter/material.dart';
import '../../../../core/theme/app_theme.dart';
class HousingScreen extends StatelessWidget {
  const HousingScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppBar(title: const Text('Logement Étudiant')),
      body: ListView.separated(
        padding: const EdgeInsets.all(20),
        itemCount: 4,
        separatorBuilder: (_, __) => const SizedBox(height: 14),
        itemBuilder: (_, i) => Container(
          decoration: BoxDecoration(color: AppColors.white, borderRadius: BorderRadius.circular(20), border: Border.all(color: AppColors.border)),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Container(height: 140, decoration: BoxDecoration(color: AppColors.infoLight, borderRadius: const BorderRadius.vertical(top: Radius.circular(20))), child: const Center(child: Icon(Icons.apartment, size: 60, color: AppColors.primary))),
            Padding(padding: const EdgeInsets.all(16), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                Text('Studio étudiant · Paris ${13 + i}e', style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 15)),
                Text('${480 + i * 40}€/mois', style: const TextStyle(fontWeight: FontWeight.w900, color: AppColors.primary)),
              ]),
              const SizedBox(height: 6),
              const Text('Sans garant · Disponible juillet', style: TextStyle(color: AppColors.textSecondary, fontSize: 13)),
              const SizedBox(height: 12),
              SizedBox(width: double.infinity, child: ElevatedButton(onPressed: () {}, style: ElevatedButton.styleFrom(minimumSize: const Size(0, 44)), child: const Text('Demander ce logement'))),
            ])),
          ]),
        ),
      ),
    );
  }
}
