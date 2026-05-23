import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/config/api_config.dart';
import '../../../../core/network/api_client.dart';
import '../../../../core/theme/admin_theme.dart';

final apptStatusFilterProvider = StateProvider<String?>((ref) => null);

final appointmentsProvider = FutureProvider.autoDispose
    .family<List<Map<String, dynamic>>, String?>((ref, status) async {
  final api = ref.read(apiClientProvider);
  final params = <String, dynamic>{};
  if (status != null) params['status'] = status;
  final resp = await api.get(ApiConfig.adminAppointments, params: params);
  final data = resp.data['data'];
  if (data is Map && data['data'] is List) return (data['data'] as List).cast<Map<String, dynamic>>();
  if (data is List) return data.cast<Map<String, dynamic>>();
  return [];
});

class AdminAppointmentsScreen extends ConsumerWidget {
  const AdminAppointmentsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final filter = ref.watch(apptStatusFilterProvider);
    final apptAsync = ref.watch(appointmentsProvider(filter));

    return Scaffold(
      backgroundColor: AdminColors.surface,
      appBar: AppBar(
        title: const Text('Rendez-vous'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh_outlined),
            onPressed: () => ref.invalidate(appointmentsProvider),
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
                    onTap: () => ref.read(apptStatusFilterProvider.notifier).state = null,
                  ),
                  const SizedBox(width: 8),
                  _Chip(
                    label: 'Planifié',
                    selected: filter == 'scheduled',
                    onTap: () => ref.read(apptStatusFilterProvider.notifier).state = 'scheduled',
                  ),
                  const SizedBox(width: 8),
                  _Chip(
                    label: 'Confirmé',
                    selected: filter == 'confirmed',
                    onTap: () => ref.read(apptStatusFilterProvider.notifier).state = 'confirmed',
                  ),
                  const SizedBox(width: 8),
                  _Chip(
                    label: 'Terminé',
                    selected: filter == 'done',
                    onTap: () => ref.read(apptStatusFilterProvider.notifier).state = 'done',
                  ),
                  const SizedBox(width: 8),
                  _Chip(
                    label: 'Annulé',
                    selected: filter == 'cancelled',
                    onTap: () => ref.read(apptStatusFilterProvider.notifier).state = 'cancelled',
                  ),
                ],
              ),
            ),
          ),
          const Divider(height: 1),
          Expanded(
            child: apptAsync.when(
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (e, _) => Center(
                child: Text(e.toString(), style: const TextStyle(color: AdminColors.error)),
              ),
              data: (appts) {
                if (appts.isEmpty) {
                  return Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          Icons.event_outlined,
                          size: 60,
                          color: AdminColors.textSecondary.withAlpha(102),
                        ),
                        const SizedBox(height: 12),
                        const Text(
                          'Aucun rendez-vous',
                          style: TextStyle(color: AdminColors.textSecondary, fontWeight: FontWeight.w600),
                        ),
                      ],
                    ),
                  );
                }
                return RefreshIndicator(
                  onRefresh: () async => ref.invalidate(appointmentsProvider),
                  child: ListView.separated(
                    padding: const EdgeInsets.all(16),
                    itemCount: appts.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 10),
                    itemBuilder: (_, i) => _AppointmentCard(
                      appt: appts[i],
                      onAction: () => ref.invalidate(appointmentsProvider),
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

class _AppointmentCard extends ConsumerStatefulWidget {
  final Map<String, dynamic> appt;
  final VoidCallback onAction;
  const _AppointmentCard({required this.appt, required this.onAction});

  @override
  ConsumerState<_AppointmentCard> createState() => _AppointmentCardState();
}

class _AppointmentCardState extends ConsumerState<_AppointmentCard> {
  bool _loading = false;

  static String _extractStudentName(Map<String, dynamic> a) {
    final student = a['student'];
    if (student is Map) {
      final name = student['name']?.toString() ?? '';
      if (name.isNotEmpty) return name;
      final first = student['first_name']?.toString() ?? '';
      final last = student['last_name']?.toString() ?? '';
      final full = '$first $last'.trim();
      if (full.isNotEmpty) return full;
    }
    return a['student_name']?.toString() ?? '—';
  }

  Future<void> _updateStatus(String status) async {
    setState(() => _loading = true);
    try {
      final api = ref.read(apiClientProvider);
      await api.patch(
        '${ApiConfig.adminAppointments}/${widget.appt['id']}',
        data: {'status': status},
      );
      widget.onAction();
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text('Statut mis à jour : $status'),
          backgroundColor: AdminColors.success,
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
    final a = widget.appt;
    final status = a['status']?.toString() ?? 'scheduled';
    final studentName = _extractStudentName(a);
    final type = a['type']?.toString() ?? 'Rendez-vous';
    final date = a['scheduled_at']?.toString() ?? a['date']?.toString() ?? '—';

    final (statusBg, statusFg, statusLabel) = switch (status) {
      'confirmed' => (const Color(0xFFF0FDF4), AdminColors.success, 'Confirmé'),
      'done'      => (const Color(0xFFEFF6FF), AdminColors.primary, 'Terminé'),
      'cancelled' => (const Color(0xFFFEF2F2), AdminColors.error, 'Annulé'),
      _           => (const Color(0xFFFFFBEB), AdminColors.warning, 'Planifié'),
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
                  color: const Color(0xFFF5F3FF),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(Icons.event_outlined, color: Color(0xFF7C3AED), size: 22),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      type,
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
          const SizedBox(height: 10),
          Row(
            children: [
              const Icon(Icons.calendar_today_outlined, size: 14, color: AdminColors.textSecondary),
              const SizedBox(width: 6),
              Flexible(
                child: Text(
                  date,
                  style: const TextStyle(
                    fontSize: 12,
                    color: AdminColors.textSecondary,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
              if (a['location'] != null) ...[
                const SizedBox(width: 12),
                const Icon(Icons.location_on_outlined, size: 14, color: AdminColors.textSecondary),
                const SizedBox(width: 4),
                Flexible(
                  child: Text(
                    a['location'].toString(),
                    style: const TextStyle(fontSize: 12, color: AdminColors.textSecondary),
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ],
          ),
          if (a['notes'] != null) ...[
            const SizedBox(height: 8),
            Text(
              a['notes'].toString(),
              style: const TextStyle(fontSize: 12, color: AdminColors.textSecondary),
            ),
          ],
          if (status == 'scheduled' || status == 'confirmed') ...[
            const SizedBox(height: 12),
            Wrap(
              spacing: 8,
              runSpacing: 6,
              children: [
                if (status == 'scheduled')
                  _ActionBtn(
                    label: 'Confirmer',
                    color: AdminColors.success,
                    icon: Icons.check_circle_outline,
                    loading: _loading,
                    onTap: () => _updateStatus('confirmed'),
                  ),
                _ActionBtn(
                  label: 'Terminer',
                  color: AdminColors.primary,
                  icon: Icons.done_all,
                  loading: _loading,
                  onTap: () => _updateStatus('done'),
                ),
                _ActionBtn(
                  label: 'Annuler',
                  color: AdminColors.error,
                  icon: Icons.cancel_outlined,
                  loading: _loading,
                  onTap: () => _updateStatus('cancelled'),
                ),
              ],
            ),
          ],
        ],
      ),
    );
  }
}

class _ActionBtn extends StatelessWidget {
  final String label;
  final Color color;
  final IconData icon;
  final bool loading;
  final VoidCallback onTap;
  const _ActionBtn({
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
          : Icon(icon, size: 15, color: color),
      label: Text(label, style: TextStyle(color: color, fontWeight: FontWeight.w700, fontSize: 12)),
      style: OutlinedButton.styleFrom(
        side: BorderSide(color: color.withAlpha(102)),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      ),
    );
  }
}
