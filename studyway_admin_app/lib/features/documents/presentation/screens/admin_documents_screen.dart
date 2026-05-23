import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/config/api_config.dart';
import '../../../../core/network/api_client.dart';
import '../../../../core/theme/admin_theme.dart';

final docStatusFilterProvider = StateProvider<String?>((ref) => null);

final documentsProvider = FutureProvider.autoDispose
    .family<List<Map<String, dynamic>>, String?>((ref, status) async {
  final api = ref.read(apiClientProvider);
  final params = <String, dynamic>{};
  if (status != null) params['status'] = status;
  final resp = await api.get(ApiConfig.adminDocuments, params: params);
  final data = resp.data['data'];
  if (data is Map && data['data'] is List) return (data['data'] as List).cast<Map<String, dynamic>>();
  if (data is List) return data.cast<Map<String, dynamic>>();
  return [];
});

class AdminDocumentsScreen extends ConsumerWidget {
  const AdminDocumentsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final filter = ref.watch(docStatusFilterProvider);
    final docsAsync = ref.watch(documentsProvider(filter));

    return Scaffold(
      backgroundColor: AdminColors.surface,
      appBar: AppBar(
        title: const Text('Documents'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh_outlined),
            onPressed: () => ref.invalidate(documentsProvider),
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: Column(
        children: [
          Container(
            color: AdminColors.white,
            padding: const EdgeInsets.fromLTRB(16, 10, 16, 10),
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: [
                  _Chip(
                    label: 'Tous',
                    selected: filter == null,
                    onTap: () => ref.read(docStatusFilterProvider.notifier).state = null,
                  ),
                  const SizedBox(width: 8),
                  _Chip(
                    label: 'En attente',
                    selected: filter == 'pending',
                    onTap: () => ref.read(docStatusFilterProvider.notifier).state = 'pending',
                  ),
                  const SizedBox(width: 8),
                  _Chip(
                    label: 'Validés',
                    selected: filter == 'validated',
                    onTap: () => ref.read(docStatusFilterProvider.notifier).state = 'validated',
                  ),
                  const SizedBox(width: 8),
                  _Chip(
                    label: 'Refusés',
                    selected: filter == 'rejected',
                    onTap: () => ref.read(docStatusFilterProvider.notifier).state = 'rejected',
                  ),
                ],
              ),
            ),
          ),
          const Divider(height: 1),
          Expanded(
            child: docsAsync.when(
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (e, _) => Center(
                child: Text(e.toString(), style: const TextStyle(color: AdminColors.error)),
              ),
              data: (docs) {
                if (docs.isEmpty) {
                  return Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          Icons.folder_open_outlined,
                          size: 60,
                          color: AdminColors.textSecondary.withAlpha(102),
                        ),
                        const SizedBox(height: 12),
                        const Text(
                          'Aucun document',
                          style: TextStyle(color: AdminColors.textSecondary, fontWeight: FontWeight.w600),
                        ),
                      ],
                    ),
                  );
                }
                return RefreshIndicator(
                  onRefresh: () async => ref.invalidate(documentsProvider),
                  child: ListView.separated(
                    padding: const EdgeInsets.all(16),
                    itemCount: docs.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 10),
                    itemBuilder: (_, i) => _DocumentCard(
                      doc: docs[i],
                      onAction: () => ref.invalidate(documentsProvider),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _Chip extends StatelessWidget {
  final String label;
  final bool selected;
  final VoidCallback onTap;
  const _Chip({required this.label, required this.selected, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
        decoration: BoxDecoration(
          color: selected ? AdminColors.primary : AdminColors.surface,
          borderRadius: BorderRadius.circular(50),
          border: Border.all(color: selected ? AdminColors.primary : AdminColors.border),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 13,
            fontWeight: FontWeight.w600,
            color: selected ? Colors.white : AdminColors.textSecondary,
          ),
        ),
      ),
    );
  }
}

class _DocumentCard extends ConsumerStatefulWidget {
  final Map<String, dynamic> doc;
  final VoidCallback onAction;
  const _DocumentCard({required this.doc, required this.onAction});

  @override
  ConsumerState<_DocumentCard> createState() => _DocumentCardState();
}

class _DocumentCardState extends ConsumerState<_DocumentCard> {
  bool _loading = false;

  static String _extractStudentName(Map<String, dynamic> doc) {
    final student = doc['student'];
    if (student is! Map) return '—';
    final name = student['name']?.toString() ?? '';
    if (name.isNotEmpty) return name;
    final first = student['first_name']?.toString() ?? '';
    final last = student['last_name']?.toString() ?? '';
    final full = '$first $last'.trim();
    return full.isEmpty ? '—' : full;
  }

  Future<void> _showValidateDialog(BuildContext context) async {
    final commentCtrl = TextEditingController();
    String selectedAction = 'validated';

    final result = await showDialog<Map<String, String>>(
      context: context,
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setInner) => AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          title: const Text(
            'Décision sur le document',
            style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16),
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              InkWell(
                onTap: () => setInner(() => selectedAction = 'validated'),
                borderRadius: BorderRadius.circular(8),
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 6.0),
                  child: Row(
                    children: [
                      Container(
                        width: 18,
                        height: 18,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: selectedAction == 'validated' ? AdminColors.success : Colors.transparent,
                          border: Border.all(color: selectedAction == 'validated' ? AdminColors.success : AdminColors.border),
                        ),
                      ),
                      const SizedBox(width: 12),
                      const Expanded(
                        child: Text(
                          'Valider',
                          style: TextStyle(fontWeight: FontWeight.w600, color: AdminColors.success),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              InkWell(
                onTap: () => setInner(() => selectedAction = 'rejected'),
                borderRadius: BorderRadius.circular(8),
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 6.0),
                  child: Row(
                    children: [
                      Container(
                        width: 18,
                        height: 18,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: selectedAction == 'rejected' ? AdminColors.error : Colors.transparent,
                          border: Border.all(color: selectedAction == 'rejected' ? AdminColors.error : AdminColors.border),
                        ),
                      ),
                      const SizedBox(width: 12),
                      const Expanded(
                        child: Text(
                          'Refuser',
                          style: TextStyle(fontWeight: FontWeight.w600, color: AdminColors.error),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 8),
              TextField(
                controller: commentCtrl,
                maxLines: 3,
                decoration: InputDecoration(
                  hintText: 'Commentaire (optionnel)',
                  filled: true,
                  fillColor: AdminColors.surface,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                    borderSide: const BorderSide(color: AdminColors.border),
                  ),
                ),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx),
              child: const Text('Annuler'),
            ),
            ElevatedButton(
              onPressed: () => Navigator.pop(ctx, {
                'action': selectedAction,
                'comment': commentCtrl.text,
              }),
              style: ElevatedButton.styleFrom(
                backgroundColor: selectedAction == 'validated' ? AdminColors.success : AdminColors.error,
              ),
              child: Text(
                selectedAction == 'validated' ? 'Valider' : 'Refuser',
                style: const TextStyle(color: Colors.white),
              ),
            ),
          ],
        ),
      ),
    );

    commentCtrl.dispose();

    if (result == null || !mounted) return;
    setState(() => _loading = true);
    try {
      final api = ref.read(apiClientProvider);
      await api.post(
        '${ApiConfig.adminDocuments}/${widget.doc['id']}/validate',
        data: {'status': result['action'], 'comment': result['comment']},
      );
      widget.onAction();
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text(
            result['action'] == 'validated' ? 'Document validé.' : 'Document refusé.',
          ),
          backgroundColor:
              result['action'] == 'validated' ? AdminColors.success : AdminColors.error,
        ));
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.toString()), backgroundColor: AdminColors.error),
        );
      }
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final doc = widget.doc;
    final status = doc['status']?.toString() ?? 'pending';
    final studentName = _extractStudentName(doc);

    final (statusBg, statusFg, statusLabel) = switch (status) {
      'validated' => (const Color(0xFFF0FDF4), AdminColors.success, 'Validé'),
      'rejected'  => (const Color(0xFFFEF2F2), AdminColors.error, 'Refusé'),
      _           => (const Color(0xFFFFFBEB), AdminColors.warning, 'En attente'),
    };

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AdminColors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AdminColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 42,
                height: 42,
                decoration: BoxDecoration(
                  color: const Color(0xFFEFF6FF),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(Icons.description_outlined, color: AdminColors.primary, size: 22),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      doc['type']?.toString() ?? 'Document',
                      style: const TextStyle(
                        fontWeight: FontWeight.w700,
                        fontSize: 14,
                        color: AdminColors.text,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      studentName,
                      style: const TextStyle(fontSize: 12, color: AdminColors.textSecondary),
                    ),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(color: statusBg, borderRadius: BorderRadius.circular(50)),
                child: Text(
                  statusLabel,
                  style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: statusFg),
                ),
              ),
            ],
          ),
          if (doc['comment'] != null) ...[
            const SizedBox(height: 10),
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: AdminColors.surface,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                doc['comment'].toString(),
                style: const TextStyle(fontSize: 12, color: AdminColors.textSecondary),
              ),
            ),
          ],
          if (status == 'pending') ...[
            const SizedBox(height: 12),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: _loading ? null : () => _showValidateDialog(context),
                icon: _loading
                    ? const SizedBox(
                        width: 16,
                        height: 16,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Icon(Icons.rate_review_outlined, size: 16),
                label: const Text(
                  'Traiter ce document',
                  style: TextStyle(fontWeight: FontWeight.w700),
                ),
                style: OutlinedButton.styleFrom(
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
