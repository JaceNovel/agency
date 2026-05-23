import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/config/api_config.dart';
import '../../../../core/network/api_client.dart';
import '../../../../core/theme/admin_theme.dart';
import 'admin_student_detail_screen.dart';

final searchQueryProvider = StateProvider<String>((ref) => '');
final studentStatusFilterProvider = StateProvider<String?>((ref) => null);

final studentsProvider = FutureProvider.autoDispose.family<List<Map<String, dynamic>>, String>((ref, query) async {
  final api = ref.read(apiClientProvider);
  final params = <String, dynamic>{};
  if (query.isNotEmpty) params['search'] = query;
  final status = ref.read(studentStatusFilterProvider);
  if (status != null) params['file_status'] = status;
  final resp = await api.get(ApiConfig.adminStudents, params: params);
  final data = resp.data['data'];
  if (data is Map && data['data'] is List) return (data['data'] as List).cast<Map<String, dynamic>>();
  if (data is List) return data.cast<Map<String, dynamic>>();
  return [];
});

class AdminStudentsScreen extends ConsumerStatefulWidget {
  const AdminStudentsScreen({super.key});

  @override
  ConsumerState<AdminStudentsScreen> createState() => _AdminStudentsScreenState();
}

class _AdminStudentsScreenState extends ConsumerState<AdminStudentsScreen> {
  final _searchCtrl = TextEditingController();

  @override
  void dispose() {
    _searchCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final query = ref.watch(searchQueryProvider);
    final statusFilter = ref.watch(studentStatusFilterProvider);
    final studentsAsync = ref.watch(studentsProvider(query));

    return Scaffold(
      backgroundColor: AdminColors.surface,
      appBar: AppBar(
        title: const Text('Étudiants'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh_outlined),
            onPressed: () => ref.invalidate(studentsProvider),
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: Column(
        children: [
          Container(
            color: AdminColors.white,
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
            child: Column(
              children: [
                TextField(
                  controller: _searchCtrl,
                  decoration: InputDecoration(
                    hintText: 'Rechercher un étudiant...',
                    prefixIcon: const Icon(Icons.search, size: 20),
                    suffixIcon: query.isNotEmpty
                        ? IconButton(
                            icon: const Icon(Icons.clear, size: 18),
                            onPressed: () {
                              _searchCtrl.clear();
                              ref.read(searchQueryProvider.notifier).state = '';
                            },
                          )
                        : null,
                    filled: true,
                    fillColor: AdminColors.surface,
                    contentPadding: const EdgeInsets.symmetric(vertical: 10),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: BorderSide.none,
                    ),
                  ),
                  onChanged: (v) => ref.read(searchQueryProvider.notifier).state = v,
                ),
                const SizedBox(height: 10),
                SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    children: [
                      _FilterChip(
                        label: 'Tous',
                        selected: statusFilter == null,
                        onTap: () => ref.read(studentStatusFilterProvider.notifier).state = null,
                      ),
                      const SizedBox(width: 8),
                      _FilterChip(
                        label: 'Actif',
                        selected: statusFilter == 'active',
                        onTap: () => ref.read(studentStatusFilterProvider.notifier).state = 'active',
                      ),
                      const SizedBox(width: 8),
                      _FilterChip(
                        label: 'Nouveau',
                        selected: statusFilter == 'draft',
                        onTap: () => ref.read(studentStatusFilterProvider.notifier).state = 'draft',
                      ),
                      const SizedBox(width: 8),
                      _FilterChip(
                        label: 'Terminé',
                        selected: statusFilter == 'completed',
                        onTap: () => ref.read(studentStatusFilterProvider.notifier).state = 'completed',
                      ),
                      const SizedBox(width: 8),
                      _FilterChip(
                        label: 'Suspendu',
                        selected: statusFilter == 'suspended',
                        onTap: () => ref.read(studentStatusFilterProvider.notifier).state = 'suspended',
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 4),
              ],
            ),
          ),
          const Divider(height: 1),
          Expanded(
            child: studentsAsync.when(
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (e, _) => _ErrorView(
                message: e.toString(),
                onRetry: () => ref.invalidate(studentsProvider),
              ),
              data: (students) {
                if (students.isEmpty) {
                  return Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          Icons.people_outlined,
                          size: 60,
                          color: AdminColors.textSecondary.withAlpha(102),
                        ),
                        const SizedBox(height: 12),
                        const Text(
                          'Aucun étudiant trouvé',
                          style: TextStyle(
                            color: AdminColors.textSecondary,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  );
                }
                return RefreshIndicator(
                  onRefresh: () async => ref.invalidate(studentsProvider),
                  child: ListView.separated(
                    padding: const EdgeInsets.all(16),
                    itemCount: students.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 10),
                    itemBuilder: (_, i) => _StudentCard(student: students[i]),
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

class _FilterChip extends StatelessWidget {
  final String label;
  final bool selected;
  final VoidCallback onTap;

  const _FilterChip({required this.label, required this.selected, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
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

class _StudentCard extends StatelessWidget {
  final Map<String, dynamic> student;
  const _StudentCard({required this.student});

  static String _extractName(Map<String, dynamic> s) {
    final name = s['name']?.toString() ?? '';
    if (name.isNotEmpty) return name;
    final first = s['first_name']?.toString() ?? '';
    final last = s['last_name']?.toString() ?? '';
    return '$first $last'.trim();
  }

  @override
  Widget build(BuildContext context) {
    final name = _extractName(student);
    final email = student['email']?.toString() ?? '';
    final country = student['destination_country']?.toString()
        ?? student['nationality']?.toString()
        ?? '—';
    final status = student['file_status']?.toString()
        ?? student['status']?.toString()
        ?? 'draft';
    final initials = name.isNotEmpty ? name[0].toUpperCase() : '?';

    final (statusBg, statusFg, statusLabel) = switch (status) {
      'active'    => (const Color(0xFFF0FDF4), AdminColors.success, 'Actif'),
      'completed' => (const Color(0xFFEFF6FF), AdminColors.primary, 'Terminé'),
      'suspended' => (const Color(0xFFFEF2F2), AdminColors.error, 'Suspendu'),
      'archived'  => (const Color(0xFFF8FAFC), AdminColors.textSecondary, 'Archivé'),
      _           => (const Color(0xFFFFFBEB), AdminColors.warning, 'Nouveau'),
    };

    return GestureDetector(
      onTap: () => Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => AdminStudentDetailScreen(
            studentId: student['id']?.toString() ?? '',
          ),
        ),
      ),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AdminColors.white,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: AdminColors.border),
        ),
        child: Row(
          children: [
            CircleAvatar(
              radius: 24,
              backgroundColor: const Color(0xFFEFF6FF),
              child: Text(
                initials,
                style: const TextStyle(
                  fontWeight: FontWeight.w800,
                  color: AdminColors.primary,
                  fontSize: 18,
                ),
              ),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    name.isEmpty ? 'Sans nom' : name,
                    style: const TextStyle(
                      fontWeight: FontWeight.w700,
                      fontSize: 15,
                      color: AdminColors.text,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    email,
                    style: const TextStyle(fontSize: 12, color: AdminColors.textSecondary),
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      const Icon(Icons.flag_outlined, size: 13, color: AdminColors.textSecondary),
                      const SizedBox(width: 4),
                      Flexible(
                        child: Text(
                          country,
                          style: const TextStyle(fontSize: 12, color: AdminColors.textSecondary),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: statusBg,
                    borderRadius: BorderRadius.circular(50),
                  ),
                  child: Text(
                    statusLabel,
                    style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: statusFg),
                  ),
                ),
                const SizedBox(height: 6),
                const Icon(Icons.chevron_right, color: AdminColors.textSecondary, size: 18),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _ErrorView extends StatelessWidget {
  final String message;
  final VoidCallback onRetry;
  const _ErrorView({required this.message, required this.onRetry});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.error_outline, size: 48, color: AdminColors.error),
            const SizedBox(height: 12),
            Text(
              message,
              textAlign: TextAlign.center,
              style: const TextStyle(color: AdminColors.textSecondary),
            ),
            const SizedBox(height: 16),
            ElevatedButton(onPressed: onRetry, child: const Text('Réessayer')),
          ],
        ),
      ),
    );
  }
}
