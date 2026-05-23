import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/config/api_config.dart';
import '../../../../core/network/api_client.dart';
import '../../../../core/storage/secure_storage.dart';
import '../../../../core/theme/admin_theme.dart';
import '../../../../core/constants/admin_routes.dart';

class AdminLoginScreen extends ConsumerStatefulWidget {
  const AdminLoginScreen({super.key});

  @override
  ConsumerState<AdminLoginScreen> createState() => _AdminLoginScreenState();
}

class _AdminLoginScreenState extends ConsumerState<AdminLoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailCtrl = TextEditingController(text: '');
  final _passCtrl = TextEditingController();
  bool _obscure = true;
  bool _loading = false;
  String? _error;

  @override
  void initState() {
    super.initState();
    _checkAlreadyLoggedIn();
  }

  Future<void> _checkAlreadyLoggedIn() async {
    final isLoggedIn = await ref.read(secureStorageProvider).isLoggedIn();
    if (isLoggedIn && mounted) context.go(AdminRoutes.dashboard);
  }

  Future<void> _login() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() { _loading = true; _error = null; });

    try {
      final api = ref.read(apiClientProvider);
      final resp = await api.post(ApiConfig.login, data: {
        'email': _emailCtrl.text.trim(),
        'password': _passCtrl.text,
      });

      final token = resp.data['data']?['token'] ?? resp.data['token'];
      final user = resp.data['data']?['user'] ?? resp.data['user'];

      if (token == null) throw Exception('Token manquant.');

      // Check admin role
      final roles = (user?['roles'] as List?)?.map((r) => r.toString()).toList() ?? [];
      final isAdmin = roles.any((r) => ['SUPER_ADMIN', 'STAFF', 'MOBILITY_AGENT', 'ACCOUNTANT'].contains(r));
      if (!isAdmin) throw Exception('Accès refusé. Ce compte n\'a pas les droits admin.');

      final storage = ref.read(secureStorageProvider);
      await storage.saveToken(token.toString());
      if (user != null) await storage.saveUser(Map<String, dynamic>.from(user));

      if (mounted) context.go(AdminRoutes.dashboard);
    } on DioException catch (e) {
      setState(() => _error = parseApiError(e));
    } on Exception catch (e) {
      setState(() => _error = e.toString().replaceFirst('Exception: ', ''));
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isWide = MediaQuery.of(context).size.width > 800;

    return Scaffold(
      body: Row(
        children: [
          if (isWide)
            Expanded(
              child: Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Color(0xFF071B4D), Color(0xFF1D4ED8)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                ),
                child: SafeArea(
                  child: Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(
                          width: 80, height: 80,
                          decoration: BoxDecoration(color: Colors.white.withAlpha(26), borderRadius: BorderRadius.circular(24)),
                          child: const Center(child: Text('SW', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 30))),
                        ),
                        const SizedBox(height: 24),
                        const Text('StudyWay Admin', style: TextStyle(color: Colors.white, fontSize: 30, fontWeight: FontWeight.w900)),
                        const SizedBox(height: 8),
                        const Text('Gestion centralisée des étudiants', style: TextStyle(color: Colors.white60, fontSize: 16)),
                        const SizedBox(height: 48),
                        ...[
                          (Icons.people_rounded, 'Gestion des étudiants', 'Suivez chaque dossier en temps réel'),
                          (Icons.folder_rounded, 'Validation de documents', 'Approuvez ou refusez en un clic'),
                          (Icons.payments_rounded, 'Suivi des paiements', 'Contrôle financier complet'),
                        ].map((item) => Padding(
                          padding: const EdgeInsets.only(bottom: 20),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Container(
                                width: 44, height: 44,
                                decoration: BoxDecoration(color: Colors.white.withAlpha(26), borderRadius: BorderRadius.circular(12)),
                                child: Icon(item.$1, color: Colors.white, size: 22),
                              ),
                              const SizedBox(width: 16),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(item.$2, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 14)),
                                  Text(item.$3, style: const TextStyle(color: Colors.white60, fontSize: 12)),
                                ],
                              ),
                            ],
                          ),
                        )),
                      ],
                    ),
                  ),
                ),
              ),
            ),

          // Login form panel
          SizedBox(
            width: isWide ? 440 : double.infinity,
            child: Scaffold(
              backgroundColor: AdminColors.white,
              body: SafeArea(
                child: Center(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.all(40),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        if (!isWide) ...[
                          Container(
                            width: 52, height: 52,
                            decoration: BoxDecoration(
                              gradient: const LinearGradient(colors: [Color(0xFF071B4D), Color(0xFF1D4ED8)]),
                              borderRadius: BorderRadius.circular(14),
                            ),
                            child: const Center(child: Text('SW', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 20))),
                          ),
                          const SizedBox(height: 28),
                        ],
                        const Text('Connexion Admin', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w900, color: AdminColors.text)),
                        const SizedBox(height: 6),
                        const Text('Réservé au personnel StudyWay.', style: TextStyle(color: AdminColors.textSecondary, fontSize: 15)),
                        const SizedBox(height: 36),

                        Form(
                          key: _formKey,
                          child: Column(
                            children: [
                              TextFormField(
                                controller: _emailCtrl,
                                keyboardType: TextInputType.emailAddress,
                                textInputAction: TextInputAction.next,
                                decoration: const InputDecoration(
                                  labelText: 'Email',
                                  prefixIcon: Icon(Icons.email_outlined),
                                ),
                                validator: (v) => (v == null || !v.contains('@')) ? 'Email invalide' : null,
                              ),
                              const SizedBox(height: 16),
                              TextFormField(
                                controller: _passCtrl,
                                obscureText: _obscure,
                                textInputAction: TextInputAction.done,
                                onFieldSubmitted: (_) => _login(),
                                decoration: InputDecoration(
                                  labelText: 'Mot de passe',
                                  prefixIcon: const Icon(Icons.lock_outline),
                                  suffixIcon: IconButton(
                                    icon: Icon(_obscure ? Icons.visibility_outlined : Icons.visibility_off_outlined),
                                    onPressed: () => setState(() => _obscure = !_obscure),
                                  ),
                                ),
                                validator: (v) => (v == null || v.length < 6) ? 'Requis' : null,
                              ),

                              if (_error != null) ...[
                                const SizedBox(height: 14),
                                Container(
                                  padding: const EdgeInsets.all(14),
                                  decoration: BoxDecoration(
                                    color: const Color(0xFFFEF2F2),
                                    borderRadius: BorderRadius.circular(10),
                                    border: Border.all(color: AdminColors.error.withAlpha(51)),
                                  ),
                                  child: Row(
                                    children: [
                                      const Icon(Icons.error_outline, color: AdminColors.error, size: 18),
                                      const SizedBox(width: 10),
                                      Expanded(child: Text(_error!, style: const TextStyle(color: AdminColors.error, fontWeight: FontWeight.w600, fontSize: 13))),
                                    ],
                                  ),
                                ),
                              ],

                              const SizedBox(height: 24),
                              SizedBox(
                                width: double.infinity,
                                height: 52,
                                child: ElevatedButton(
                                  onPressed: _loading ? null : _login,
                                  style: ElevatedButton.styleFrom(
                                    backgroundColor: AdminColors.nightBlue,
                                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                  ),
                                  child: _loading
                                      ? const SizedBox(width: 22, height: 22, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2.5))
                                      : const Text('Se connecter', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w800, fontSize: 15)),
                                ),
                              ),
                            ],
                          ),
                        ),

                        const SizedBox(height: 32),
                        Container(
                          padding: const EdgeInsets.all(14),
                          decoration: BoxDecoration(
                            color: AdminColors.surface,
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(color: AdminColors.border),
                          ),
                          child: const Row(
                            children: [
                              Icon(Icons.shield_outlined, size: 16, color: AdminColors.textSecondary),
                              SizedBox(width: 8),
                              Text('Connexion sécurisée SSL · StudyWay 2026', style: TextStyle(fontSize: 12, color: AdminColors.textSecondary, fontWeight: FontWeight.w500)),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
