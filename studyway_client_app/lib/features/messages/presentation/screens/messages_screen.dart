import 'package:flutter/material.dart';
import '../../../../core/theme/app_theme.dart';
class MessagesScreen extends StatelessWidget {
  const MessagesScreen({super.key});
  @override
  Widget build(BuildContext context) {
    final convs = [
      ('Support StudyWay', 'Votre dossier visa est bien reçu.', '14:30', 2),
      ('Agent Visa', 'Merci de renvoyer votre attestation.', 'Hier', 0),
      ('Agent Mobilité', 'Votre billet est confirmé !', 'Lun', 0),
    ];
    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppBar(title: const Text('Messages'), actions: [
        IconButton(icon: const Icon(Icons.edit_outlined), onPressed: () {}),
      ]),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: AppColors.primary,
        child: const Icon(Icons.add_comment_outlined, color: Colors.white),
      ),
      body: ListView.separated(
        padding: const EdgeInsets.symmetric(vertical: 8),
        itemCount: convs.length,
        separatorBuilder: (_, __) => const Divider(indent: 80, endIndent: 20, height: 1),
        itemBuilder: (_, i) {
          final c = convs[i];
          return ListTile(
            contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
            leading: CircleAvatar(
              radius: 26,
              backgroundColor: AppColors.infoLight,
              child: Text(c.$1[0], style: const TextStyle(fontWeight: FontWeight.w800, color: AppColors.primary, fontSize: 18)),
            ),
            title: Text(c.$1, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
            subtitle: Text(c.$2, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(color: AppColors.textSecondary, fontSize: 13)),
            trailing: Column(mainAxisAlignment: MainAxisAlignment.center, crossAxisAlignment: CrossAxisAlignment.end, children: [
              Text(c.$3, style: const TextStyle(fontSize: 12, color: AppColors.textMuted, fontWeight: FontWeight.w500)),
              if (c.$4 > 0) ...[const SizedBox(height: 4), Container(padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2), decoration: BoxDecoration(color: AppColors.primary, borderRadius: BorderRadius.circular(50)), child: Text('${c.$4}', style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w800)))],
            ]),
            onTap: () {},
          );
        },
      ),
    );
  }
}
