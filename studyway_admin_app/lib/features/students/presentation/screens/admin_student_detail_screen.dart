import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/config/api_config.dart';
import '../../../../core/network/api_client.dart';
import '../../../../core/theme/admin_theme.dart';

final studentDetailProvider = FutureProvider.autoDispose
    .family<Map<String, dynamic>, String>((ref, id) async {
  final api = ref.read(apiClientProvider);
  final resp = await api.get('${ApiConfig.adminStudents}/$id');
  return (resp.data['data'] ?? resp.data) as Map<String, dynamic>;
});

class AdminStudentDetailScreen extends ConsumerWidget {
  final String studentId;
  const AdminStudentDetailScreen({super.key, required this.studentId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final studentAsync = ref.watch(studentDetailProvider(studentId));

    return Scaffold(
      backgroundColor: AdminColors.surface,
      appBar: AppBar(
        title: const Text('Fiche étudiant'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh_outlined),
            onPressed: () => ref.invalidate(studentDetailProvider(studentId)),
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: studentAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(
          child: Text(e.toString(), style: const TextStyle(color: AdminColors.error)),
        ),
        data: (student) => _StudentDetailBody(student: student, studentId: studentId),
      ),
    );
  }
}

class _StudentDetailBody extends ConsumerStatefulWidget {
  final Map<String, dynamic> student;
  final String studentId;
  const _StudentDetailBody({required this.student, required this.studentId});

  @override
  ConsumerState<_StudentDetailBody> createState() => _StudentDetailBodyState();
}

class _StudentDetailBodyState extends ConsumerState<_StudentDetailBody> {
  final _noteCtrl = TextEditingController();
  bool _savingNote = false;
  bool _updatingStatus = false;
  String? _error;

  static String _extractName(Map<String, dynamic> s) {
    final name = s['name']?.toString() ?? '';
    if (name.isNotEmpty) return name;
    final first = s['first_name']?.toString() ?? '';
    final last = s['last_name']?.toString() ?? '';
    return '$first $last'.trim();
  }

  Future<void> _addNote() async {
    if (_noteCtrl.text.trim().isEmpty) return;
    setState(() {
      _savingNote = true;
      _error = null;
    });
    try {
      final api = ref.read(apiClientProvider);
      await api.post(
        '${ApiConfig.adminStudents}/${widget.studentId}/notes',
        data: {'note': _noteCtrl.text.trim()},
      );
      _noteCtrl.clear();
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text('Note ajoutée.'),
          backgroundColor: AdminColors.success,
        ));
        ref.invalidate(studentDetailProvider(widget.studentId));
      }
    } catch (e) {
      if (mounted) setState(() => _error = e.toString());
    } finally {
      if (mounted) setState(() => _savingNote = false);
    }
  }

  Future<void> _updateStatus(String status) async {
    setState(() {
      _updatingStatus = true;
      _error = null;
    });
    try {
      final api = ref.read(apiClientProvider);
      await api.patch(
        '${ApiConfig.adminStudents}/${widget.studentId}',
        data: {'file_status': status},
      );
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text('Statut mis à jour : $status'),
          backgroundColor: AdminColors.success,
        ));
        ref.invalidate(studentDetailProvider(widget.studentId));
      }
    } catch (e) {
      if (mounted) setState(() => _error = e.toString());
    } finally {
      if (mounted) setState(() => _updatingStatus = false);
    }
  }

  @override
  void dispose() {
    _noteCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final s = widget.student;
    final name = _extractName(s);
    final initials = name.isNotEmpty ? name[0].toUpperCase() : '?';
    final status = s['file_status']?.toString() ?? s['status']?.toString() ?? 'draft';
    final documents = (s['documents'] as List?)?.cast<Map<String, dynamic>>() ?? [];
    final payments = (s['payments'] as List?)?.cast<Map<String, dynamic>>() ?? [];
    final notes = (s['notes'] as List?)?.cast<Map<String, dynamic>>() ?? [];

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Profile header
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AdminColors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AdminColors.border),
            ),
            child: Row(
              children: [
                CircleAvatar(
                  radius: 32,
                  backgroundColor: const Color(0xFFEFF6FF),
                  child: Text(
                    initials,
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.w900,
                      color: AdminColors.primary,
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        name.isEmpty ? 'Sans nom' : name,
                        style: const TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.w800,
                          color: AdminColors.text,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        s['email']?.toString() ?? '',
                        style: const TextStyle(color: AdminColors.textSecondary, fontSize: 13),
                      ),
                      const SizedBox(height: 6),
                      _StatusBadge(status: status),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),

          // Info grid
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AdminColors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AdminColors.border),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Informations',
                  style: TextStyle(fontWeight: FontWeight.w800, fontSize: 15, color: AdminColors.text),
                ),
                const SizedBox(height: 14),
                _InfoRow(label: 'Téléphone', value: s['phone']?.toString() ?? '—'),
                _InfoRow(label: 'Nationalité', value: s['nationality']?.toString() ?? '—'),
                _InfoRow(label: 'Date de naissance', value: s['birth_date']?.toString() ?? '—'),
                _InfoRow(label: 'Passeport', value: s['passport_number']?.toString() ?? '—'),
                _InfoRow(label: 'Expiration passeport', value: s['passport_expiry']?.toString() ?? '—'),
                _InfoRow(label: 'Niveau actuel', value: s['current_level']?.toString() ?? '—'),
                _InfoRow(
                  label: 'Destination',
                  value: s['destination_country']?.toString() ?? '—',
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),

          // Status update
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AdminColors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AdminColors.border),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Changer le statut',
                  style: TextStyle(fontWeight: FontWeight.w800, fontSize: 15, color: AdminColors.text),
                ),
                const SizedBox(height: 14),
                if (_error != null) ...[
                  Text(
                    _error!,
                    style: const TextStyle(color: AdminColors.error, fontSize: 13),
                  ),
                  const SizedBox(height: 8),
                ],
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    _ActionButton(
                      label: 'Activer',
                      color: AdminColors.success,
                      icon: Icons.check_circle_outline,
                      loading: _updatingStatus,
                      onTap: () => _updateStatus('active'),
                    ),
                    _ActionButton(
                      label: 'Terminer',
                      color: AdminColors.primary,
                      icon: Icons.done_all,
                      loading: _updatingStatus,
                      onTap: () => _updateStatus('completed'),
                    ),
                    _ActionButton(
                      label: 'Suspendre',
                      color: AdminColors.error,
                      icon: Icons.block_outlined,
                      loading: _updatingStatus,
                      onTap: () => _updateStatus('suspended'),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),

          // Documents
          if (documents.isNotEmpty) ...[
            _SectionCard(
              title: 'Documents (${documents.length})',
              child: Column(
                children: documents.map((doc) => ListTile(
                  dense: true,
                  leading: const Icon(Icons.description_outlined, size: 20, color: AdminColors.primary),
                  title: Text(
                    doc['type']?.toString() ?? 'Document',
                    style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13),
                  ),
                  trailing: _DocStatusBadge(status: doc['status']?.toString() ?? 'pending'),
                )).toList(),
              ),
            ),
            const SizedBox(height: 12),
          ],

          // Payments
          if (payments.isNotEmpty) ...[
            _SectionCard(
              title: 'Paiements (${payments.length})',
              child: Column(
                children: payments.map((p) => ListTile(
                  dense: true,
                  leading: const Icon(Icons.payments_outlined, size: 20, color: AdminColors.success),
                  title: Text(
                    p['label']?.toString() ?? 'Paiement',
                    style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13),
                  ),
                  subtitle: Text(
                    p['created_at']?.toString() ?? '',
                    style: const TextStyle(fontSize: 11),
                  ),
                  trailing: Text(
                    '${p['amount'] ?? 0} €',
                    style: const TextStyle(fontWeight: FontWeight.w700, color: AdminColors.text),
                  ),
                )).toList(),
              ),
            ),
            const SizedBox(height: 12),
          ],

          // Notes
          _SectionCard(
            title: 'Notes internes',
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (notes.isEmpty)
                  const Padding(
                    padding: EdgeInsets.only(bottom: 12),
                    child: Text(
                      'Aucune note.',
                      style: TextStyle(color: AdminColors.textSecondary, fontSize: 13),
                    ),
                  ),
                ...notes.map((n) => Container(
                  margin: const EdgeInsets.only(bottom: 8),
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AdminColors.surface,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        n['note']?.toString() ?? '',
                        style: const TextStyle(fontSize: 13, color: AdminColors.text),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        n['created_at']?.toString() ?? '',
                        style: const TextStyle(fontSize: 11, color: AdminColors.textSecondary),
                      ),
                    ],
                  ),
                )),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _noteCtrl,
                        maxLines: 2,
                        decoration: InputDecoration(
                          hintText: 'Ajouter une note...',
                          filled: true,
                          fillColor: AdminColors.surface,
                          contentPadding: const EdgeInsets.all(12),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                            borderSide: const BorderSide(color: AdminColors.border),
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 10),
                    ElevatedButton(
                      onPressed: _savingNote ? null : _addNote,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AdminColors.primary,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                      ),
                      child: _savingNote
                          ? const SizedBox(
                              width: 18,
                              height: 18,
                              child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                            )
                          : const Icon(Icons.send, color: Colors.white, size: 18),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 32),
        ],
      ),
    );
  }
}

class _StatusBadge extends StatelessWidget {
  final String status;
  const _StatusBadge({required this.status});

  @override
  Widget build(BuildContext context) {
    final (bg, fg, label) = switch (status) {
      'active'    => (const Color(0xFFF0FDF4), AdminColors.success, 'Actif'),
      'completed' => (const Color(0xFFEFF6FF), AdminColors.primary, 'Terminé'),
      'suspended' => (const Color(0xFFFEF2F2), AdminColors.error, 'Suspendu'),
      'archived'  => (const Color(0xFFF8FAFC), AdminColors.textSecondary, 'Archivé'),
      _           => (const Color(0xFFFFFBEB), AdminColors.warning, 'Nouveau'),
    };
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
      decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(50)),
      child: Text(label, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: fg)),
    );
  }
}

class _DocStatusBadge extends StatelessWidget {
  final String status;
  const _DocStatusBadge({required this.status});

  @override
  Widget build(BuildContext context) {
    final (bg, fg, label) = switch (status) {
      'validated' => (const Color(0xFFF0FDF4), AdminColors.success, 'Validé'),
      'rejected'  => (const Color(0xFFFEF2F2), AdminColors.error, 'Refusé'),
      _           => (const Color(0xFFFFFBEB), AdminColors.warning, 'En attente'),
    };
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(50)),
      child: Text(label, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: fg)),
    );
  }
}

class _InfoRow extends StatelessWidget {
  final String label;
  final String value;
  const _InfoRow({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 150,
            child: Text(label, style: const TextStyle(color: AdminColors.textSecondary, fontSize: 13)),
          ),
          Expanded(
            child: Text(
              value,
              style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13, color: AdminColors.text),
            ),
          ),
        ],
      ),
    );
  }
}

class _ActionButton extends StatelessWidget {
  final String label;
  final Color color;
  final IconData icon;
  final bool loading;
  final VoidCallback onTap;
  const _ActionButton({
    required this.label,
    required this.color,
    required this.icon,
    required this.loading,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return OutlinedButton.icon(
      onPressed: loading ? null : onTap,
      icon: loading
          ? SizedBox(
              width: 14,
              height: 14,
              child: CircularProgressIndicator(color: color, strokeWidth: 2),
            )
          : Icon(icon, size: 16, color: color),
      label: Text(label, style: TextStyle(color: color, fontWeight: FontWeight.w700, fontSize: 13)),
      style: OutlinedButton.styleFrom(
        side: BorderSide(color: color.withAlpha(102)),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      ),
    );
  }
}

class _SectionCard extends StatelessWidget {
  final String title;
  final Widget child;
  const _SectionCard({required this.title, required this.child});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AdminColors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AdminColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 15, color: AdminColors.text),
          ),
          const SizedBox(height: 14),
          child,
        ],
      ),
    );
  }
}
