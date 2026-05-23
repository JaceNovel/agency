import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../core/storage/secure_storage.dart';
import '../core/theme/admin_theme.dart';
import '../core/constants/admin_routes.dart';

class AdminShell extends ConsumerWidget {
  final Widget child;
  const AdminShell({super.key, required this.child});

  static const _navItems = [
    (Icons.dashboard_outlined, Icons.dashboard_rounded, 'Dashboard', AdminRoutes.dashboard),
    (Icons.people_outlined, Icons.people_rounded, 'Étudiants', AdminRoutes.students),
    (Icons.folder_outlined, Icons.folder_rounded, 'Documents', AdminRoutes.documents),
    (Icons.payments_outlined, Icons.payments_rounded, 'Paiements', AdminRoutes.payments),
    (Icons.event_outlined, Icons.event_rounded, 'RDV', AdminRoutes.appointments),
    (Icons.chat_outlined, Icons.chat_rounded, 'Messages', AdminRoutes.messages),
  ];

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final location = GoRouterState.of(context).matchedLocation;
    final isWide = MediaQuery.of(context).size.width > 800;

    if (isWide) {
      return Scaffold(
        body: Row(
          children: [
            _AdminSidebar(location: location),
            Expanded(child: child),
          ],
        ),
      );
    }

    int currentIndex = _navItems.indexWhere((n) => location.startsWith(n.$4));
    if (currentIndex < 0) currentIndex = 0;

    return Scaffold(
      body: child,
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          color: AdminColors.white,
          border: Border(top: BorderSide(color: AdminColors.border)),
        ),
        child: SafeArea(
          child: SizedBox(
            height: 60,
            child: Row(
              children: _navItems.asMap().entries.map((e) {
                final i = e.key;
                final item = e.value;
                final active = currentIndex == i;
                return Expanded(
                  child: InkWell(
                    onTap: () => context.go(item.$4),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          active ? item.$2 : item.$1,
                          size: 22,
                          color: active ? AdminColors.primary : AdminColors.textSecondary,
                        ),
                        const SizedBox(height: 2),
                        Text(
                          item.$3,
                          style: TextStyle(
                            fontSize: 10,
                            fontWeight: active ? FontWeight.w700 : FontWeight.w500,
                            color: active ? AdminColors.primary : AdminColors.textSecondary,
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              }).toList(),
            ),
          ),
        ),
      ),
    );
  }
}

class _AdminSidebar extends ConsumerWidget {
  final String location;
  const _AdminSidebar({required this.location});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      width: 240,
      color: AdminColors.sidebarBg,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SafeArea(
            child: Padding(
              padding: EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'SW',
                    style: TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.w900),
                  ),
                  Text(
                    'Admin Panel',
                    style: TextStyle(
                      color: AdminColors.sidebarText,
                      fontSize: 13,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            ),
          ),
          const Divider(color: AdminColors.sidebarSelected, height: 1),
          const SizedBox(height: 12),
          Expanded(
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              children: AdminShell._navItems.map((item) {
                final active = location.startsWith(item.$4);
                return GestureDetector(
                  onTap: () => context.go(item.$4),
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 150),
                    margin: const EdgeInsets.only(bottom: 4),
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                    decoration: BoxDecoration(
                      color: active ? AdminColors.sidebarSelected : Colors.transparent,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Row(
                      children: [
                        Icon(
                          active ? item.$2 : item.$1,
                          size: 20,
                          color: active ? Colors.white : AdminColors.sidebarText,
                        ),
                        const SizedBox(width: 12),
                        Text(
                          item.$3,
                          style: TextStyle(
                            color: active ? Colors.white : AdminColors.sidebarText,
                            fontWeight: active ? FontWeight.w700 : FontWeight.w500,
                            fontSize: 14,
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              }).toList(),
            ),
          ),
          const Divider(color: AdminColors.sidebarSelected, height: 1),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                const CircleAvatar(
                  radius: 18,
                  backgroundColor: AdminColors.sidebarSelected,
                  child: Icon(Icons.admin_panel_settings, color: Colors.white, size: 18),
                ),
                const SizedBox(width: 12),
                const Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Super Admin',
                        style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 13),
                      ),
                      Text(
                        'studyway.space',
                        style: TextStyle(color: AdminColors.sidebarText, fontSize: 11),
                      ),
                    ],
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.logout, color: AdminColors.sidebarText, size: 18),
                  onPressed: () async {
                    await ref.read(secureStorageProvider).clearAll();
                    if (context.mounted) context.go(AdminRoutes.login);
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
