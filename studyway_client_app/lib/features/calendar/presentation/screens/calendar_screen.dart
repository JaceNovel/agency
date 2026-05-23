import 'package:flutter/material.dart';
import '../../../../core/theme/app_theme.dart';
class CalendarScreen extends StatelessWidget {
  const CalendarScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppBar(title: const Text('Rendez-vous')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          const Text('Prendre rendez-vous', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: AppColors.text)),
          const SizedBox(height: 6),
          const Text('Choisissez un créneau avec un conseiller StudyWay.', style: TextStyle(color: AppColors.textSecondary, fontSize: 14)),
          const SizedBox(height: 24),
          ElevatedButton.icon(onPressed: () {}, icon: const Icon(Icons.calendar_today), label: const Text('Choisir une date'), style: ElevatedButton.styleFrom(minimumSize: const Size(double.infinity, 52))),
          const SizedBox(height: 24),
          const Text('Mes rendez-vous', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
          const SizedBox(height: 14),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(color: AppColors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: AppColors.border)),
            child: const Row(children: [
              Icon(Icons.event_available_outlined, color: AppColors.primary, size: 40),
              SizedBox(width: 16),
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text('Conseiller StudyWay', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 15)),
                Text('Lundi 10 juin 2026 · 14h00', style: TextStyle(color: AppColors.textSecondary, fontSize: 13)),
                Text('Confirmed', style: TextStyle(color: AppColors.success, fontWeight: FontWeight.w700, fontSize: 12)),
              ])),
            ]),
          ),
        ]),
      ),
    );
  }
}
