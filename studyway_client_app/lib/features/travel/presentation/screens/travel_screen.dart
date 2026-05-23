import 'package:flutter/material.dart';
import '../../../../core/theme/app_theme.dart';
class TravelScreen extends StatelessWidget {
  const TravelScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppBar(title: const Text('Mon Voyage')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(gradient: AppGradients.nightGradient, borderRadius: BorderRadius.circular(20)),
            child: const Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text('Départ prévu', style: TextStyle(color: Colors.white60, fontSize: 13, fontWeight: FontWeight.w500)),
              SizedBox(height: 4),
              Text('25 Juin 2026', style: TextStyle(color: Colors.white, fontSize: 26, fontWeight: FontWeight.w900)),
              SizedBox(height: 16),
              Row(children: [
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text('Lomé (LFW)', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w800, fontSize: 15)),
                  Text('Départ', style: TextStyle(color: Colors.white60, fontSize: 12)),
                ]),
                SizedBox(width: 24),
                Icon(Icons.flight, color: Colors.white54, size: 20),
                SizedBox(width: 24),
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text('Paris (CDG)', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w800, fontSize: 15)),
                  Text('Arrivée', style: TextStyle(color: Colors.white60, fontSize: 12)),
                ]),
              ]),
            ]),
          ),
          const SizedBox(height: 24),
          const Text('Checklist départ', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: AppColors.text)),
          const SizedBox(height: 14),
          ...[('Passeport valide', true), ('Visa étudiant', true), ('Billet d\'avion', true), ('Attestation d\'assurance', false), ('Carte SIM / eSIM', false), ('Réservation hôtel', false)].map((item) => CheckboxListTile(
            value: item.$2, onChanged: (_) {},
            title: Text(item.$1, style: TextStyle(fontWeight: FontWeight.w600, decoration: item.$2 ? TextDecoration.lineThrough : null, color: item.$2 ? AppColors.textSecondary : AppColors.text)),
            tileColor: AppColors.white,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            contentPadding: const EdgeInsets.symmetric(horizontal: 12),
            checkColor: Colors.white, activeColor: AppColors.primary,
          )).toList(),
        ]),
      ),
    );
  }
}
