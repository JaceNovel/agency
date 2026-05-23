import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/config/api_config.dart';
import '../../../../core/network/api_client.dart';
import '../../../../core/theme/admin_theme.dart';

final paymentStatusFilterProvider = StateProvider<String?>((ref) => null);

final paymentsProvider = FutureProvider.autoDispose
    .family<List<Map<String, dynamic>>, String?>((ref, status) async {
  final api = ref.read(apiClientProvider);
  final params = <String, dynamic>{};
  if (status != null) params['status'] = status;
  final resp = await api.get(ApiConfig.adminPayments, params: params);
  final data = resp.data['data'];
  if (data is Map && data['data'] is List) return (data['data'] as List).cast<Map<String, dynamic>>();
  if (data is List) return data.cast<Map<String, dynamic>>();
  return [];
});

class AdminPaymentsScreen extends ConsumerWidget {
  const AdminPaymentsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final filter = ref.watch(paymentStatusFilterProvider);
    final paymentsAsync = ref.watch(paymentsProvider(filter));

    return Scaffold(
      backgroundColor: AdminColors.surface,
      appBar: AppBar(
        title: const Text('Paiements'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh_outlined),
            onPressed: () => ref.invalidate(paymentsProvider),
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
                    onTap: () => ref.read(paymentStatusFilterProvider.notifier).state = null,
                  ),
                  const SizedBox(width: 8),
                  _Chip(
                    label: 'En attente',
                    selected: filter == 'pending',
                    onTap: () => ref.read(paymentStatusFilterProvider.notifier).state = 'pending',
                  ),
                  const SizedBox(width: 8),
                  _Chip(
                    label: 'Validés',
                    selected: filter == 'validated',
                    onTap: () => ref.read(paymentStatusFilterProvider.notifier).state = 'validated',
                  ),
                  const SizedBox(width: 8),
                  _Chip(
                    label: 'Refusés',
                    selected: filter == 'rejected',
                    onTap: () => ref.read(paymentStatusFilterProvider.notifier).state = 'rejected',
                  ),
                ],
              ),
            ),
          ),
          const Divider(height: 1),
          Expanded(
            child: paymentsAsync.when(
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (e, _) => Center(
                child: Text(e.toString(), style: const TextStyle(color: AdminColors.error)),
              ),
              data: (payments) {
                if (payments.isEmpty) {
                  return Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          Icons.payments_outlined,
                          size: 60,
                          color: AdminColors.textSecondary.withAlpha(102),
                        ),
                        const SizedBox(height: 12),
                        const Text(
                          'Aucun paiement',
                          style: TextStyle(color: AdminColors.textSecondary, fontWeight: FontWeight.w600),
                        ),
                      ],
                    ),
                  );
                }

                final total = payments.fold<double>(
                  0,
                  (sum, p) => sum + (double.tryParse(p['amount']?.toString() ?? '0') ?? 0),
                );

                return Column(
                  children: [
                    Container(
                      margin: const EdgeInsets.all(16),
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        gradient: const LinearGradient(
                          colors: [Color(0xFF071B4D), Color(0xFF1D4ED8)],
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                        borderRadius: BorderRadius.circular(14),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Total affiché',
                                style: TextStyle(color: Colors.white60, fontSize: 12),
                              ),
                              Text(
                                '${total.toStringAsFixed(2)} €',
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 24,
                                  fontWeight: FontWeight.w900,
                                ),
                              ),
                            ],
                          ),
                          Text(
                            '${payments.length} paiements',
                            style: const TextStyle(color: Colors.white70, fontSize: 13),
                          ),
                        ],
                      ),
                    ),
                    Expanded(
                      child: RefreshIndicator(
                        onRefresh: () async => ref.invalidate(paymentsProvider),
                        child: ListView.separated(
                          padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
                          itemCount: payments.length,
                          separatorBuilder: (_, __) => const SizedBox(height: 10),
                          itemBuilder: (_, i) => _PaymentCard(
                            payment: payments[i],
                            onAction: () => ref.invalidate(paymentsProvider),
                          ),
                        ),
                      ),
                    ),
                  ],
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

class _PaymentCard extends ConsumerStatefulWidget {
  final Map<String, dynamic> payment;
  final VoidCallback onAction;
  const _PaymentCard({required this.payment, required this.onAction});

  @override
  ConsumerState<_PaymentCard> createState() => _PaymentCardState();
}

class _PaymentCardState extends ConsumerState<_PaymentCard> {
  bool _loading = false;

  static String _extractStudentName(Map<String, dynamic> p) {
    final student = p['student'];
    if (student is Map) {
      final name = student['name']?.toString() ?? '';
      if (name.isNotEmpty) return name;
      final first = student['first_name']?.toString() ?? '';
      final last = student['last_name']?.toString() ?? '';
      final full = '$first $last'.trim();
      if (full.isNotEmpty) return full;
    }
    return p['student_name']?.toString() ?? '—';
  }

  Future<void> _validate(String status) async {
    setState(() => _loading = true);
    try {
      final api = ref.read(apiClientProvider);
      await api.post(
        '${ApiConfig.adminPayments}/${widget.payment['id']}/validate',
        data: {'status': status},
      );
      widget.onAction();
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text(status == 'validated' ? 'Paiement validé.' : 'Paiement refusé.'),
          backgroundColor: status == 'validated' ? AdminColors.success : AdminColors.error,
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
    final p = widget.payment;
    final status = p['status']?.toString() ?? 'pending';
    final studentName = _extractStudentName(p);
    final amount =
        '${double.tryParse(p['amount']?.toString() ?? '0')?.toStringAsFixed(2) ?? '0.00'} €';

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
                  color: const Color(0xFFF0FDF4),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(Icons.payments_outlined, color: AdminColors.success, size: 22),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      p['label']?.toString() ?? 'Paiement',
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
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    amount,
                    style: const TextStyle(
                      fontWeight: FontWeight.w900,
                      fontSize: 16,
                      color: AdminColors.text,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
                    decoration: BoxDecoration(color: statusBg, borderRadius: BorderRadius.circular(50)),
                    child: Text(
                      statusLabel,
                      style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: statusFg),
                    ),
                  ),
                ],
              ),
            ],
          ),
          if (p['created_at'] != null) ...[
            const SizedBox(height: 8),
            Text(
              'Reçu le ${p['created_at']}',
              style: const TextStyle(fontSize: 11, color: AdminColors.textSecondary),
            ),
          ],
          if (status == 'pending') ...[
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: _loading ? null : () => _validate('rejected'),
                    icon: const Icon(Icons.close, size: 16, color: AdminColors.error),
                    label: const Text(
                      'Refuser',
                      style: TextStyle(color: AdminColors.error, fontWeight: FontWeight.w700),
                    ),
                    style: OutlinedButton.styleFrom(
                      side: const BorderSide(color: AdminColors.error),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: _loading ? null : () => _validate('validated'),
                    icon: _loading
                        ? const SizedBox(
                            width: 16,
                            height: 16,
                            child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                          )
                        : const Icon(Icons.check, size: 16, color: Colors.white),
                    label: const Text(
                      'Valider',
                      style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700),
                    ),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AdminColors.success,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ],
      ),
    );
  }
}
