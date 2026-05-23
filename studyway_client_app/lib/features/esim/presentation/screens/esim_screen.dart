import 'package:flutter/material.dart';
import '../../../../core/theme/app_theme.dart';
class EsimScreen extends StatelessWidget {
  const EsimScreen({super.key});
  @override
  Widget build(BuildContext context) {
    final plans = [
      ('France 10 Go', '30 jours', 'Data only', '18 500 FCFA', false),
      ('France 20 Go', '30 jours', 'Data + Appels + SMS', '31 000 FCFA', true),
      ('Europe 10 Go', '30 jours', 'Data only · 42 pays', '23 000 FCFA', false),
      ('Europe 20 Go', '30 jours', 'Data + Appels + SMS', '40 000 FCFA', false),
    ];
    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppBar(title: const Text('eSIM & Forfait')),
      body: ListView.separated(
        padding: const EdgeInsets.all(20),
        itemCount: plans.length,
        separatorBuilder: (_, __) => const SizedBox(height: 12),
        itemBuilder: (_, i) {
          final p = plans[i];
          return Container(
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(color: AppColors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: p.$5 ? AppColors.primary : AppColors.border, width: p.$5 ? 2 : 1)),
            child: Row(children: [
              const Icon(Icons.sim_card_outlined, size: 36, color: AppColors.primary),
              const SizedBox(width: 16),
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Row(children: [
                  Text(p.$1, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 15)),
                  if (p.$5) ...[const SizedBox(width: 8), Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2), decoration: BoxDecoration(color: AppColors.primary, borderRadius: BorderRadius.circular(50)), child: const Text('Populaire', style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w700)))],
                ]),
                Text('${p.$2} · ${p.$3}', style: const TextStyle(fontSize: 13, color: AppColors.textSecondary)),
                const SizedBox(height: 8),
                Text(p.$4, style: const TextStyle(fontWeight: FontWeight.w900, color: AppColors.primary, fontSize: 16)),
              ])),
              ElevatedButton(onPressed: () {}, style: ElevatedButton.styleFrom(minimumSize: const Size(0, 38), padding: const EdgeInsets.symmetric(horizontal: 16)), child: const Text('Acheter')),
            ]),
          );
        },
      ),
    );
  }
}
