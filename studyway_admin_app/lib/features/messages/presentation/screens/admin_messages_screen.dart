import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/config/api_config.dart';
import '../../../../core/network/api_client.dart';
import '../../../../core/theme/admin_theme.dart';

final conversationsProvider = FutureProvider.autoDispose<List<Map<String, dynamic>>>((ref) async {
  final api = ref.read(apiClientProvider);
  final resp = await api.get(ApiConfig.adminConversations);
  final data = resp.data['data'];
  if (data is List) return data.cast<Map<String, dynamic>>();
  if (data is Map && data['data'] is List) return (data['data'] as List).cast<Map<String, dynamic>>();
  return [];
});

class AdminMessagesScreen extends ConsumerWidget {
  const AdminMessagesScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final convsAsync = ref.watch(conversationsProvider);

    return Scaffold(
      backgroundColor: AdminColors.surface,
      appBar: AppBar(
        title: const Text('Messages'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh_outlined),
            onPressed: () => ref.invalidate(conversationsProvider),
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: convsAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(
          child: Text(e.toString(), style: const TextStyle(color: AdminColors.error)),
        ),
        data: (convs) {
          if (convs.isEmpty) {
            return Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    Icons.chat_outlined,
                    size: 60,
                    color: AdminColors.textSecondary.withAlpha(102),
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'Aucun message',
                    style: TextStyle(color: AdminColors.textSecondary, fontWeight: FontWeight.w600),
                  ),
                ],
              ),
            );
          }
          return RefreshIndicator(
            onRefresh: () async => ref.invalidate(conversationsProvider),
            child: ListView.separated(
              itemCount: convs.length,
              separatorBuilder: (_, __) => const Divider(height: 1, indent: 72),
              itemBuilder: (_, i) => _ConversationTile(conv: convs[i]),
            ),
          );
        },
      ),
    );
  }
}

class _ConversationTile extends StatelessWidget {
  final Map<String, dynamic> conv;
  const _ConversationTile({required this.conv});

  static String _extractName(Map<String, dynamic> conv) {
    final student = conv['student'];
    if (student is! Map) return '';
    final name = student['name']?.toString() ?? '';
    if (name.isNotEmpty) return name;
    final first = student['first_name']?.toString() ?? '';
    final last = student['last_name']?.toString() ?? '';
    return '$first $last'.trim();
  }

  @override
  Widget build(BuildContext context) {
    final name = _extractName(conv);
    final initials = name.isNotEmpty ? name[0].toUpperCase() : '?';
    final lastMsg = conv['last_message']?.toString() ?? '';
    final unread = (conv['unread_count'] as num?)?.toInt() ?? 0;
    final time = conv['updated_at']?.toString() ?? '';

    return ListTile(
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      leading: Stack(
        clipBehavior: Clip.none,
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
          if (unread > 0)
            Positioned(
              right: -2,
              top: -2,
              child: Container(
                width: 14,
                height: 14,
                decoration: const BoxDecoration(
                  color: AdminColors.error,
                  shape: BoxShape.circle,
                ),
              ),
            ),
        ],
      ),
      title: Text(
        name.isEmpty ? 'Étudiant' : name,
        style: TextStyle(
          fontWeight: unread > 0 ? FontWeight.w800 : FontWeight.w600,
          fontSize: 14,
          color: AdminColors.text,
        ),
      ),
      subtitle: Text(
        lastMsg,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        style: TextStyle(
          fontSize: 12,
          color: unread > 0 ? AdminColors.text : AdminColors.textSecondary,
          fontWeight: unread > 0 ? FontWeight.w600 : FontWeight.normal,
        ),
      ),
      trailing: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Text(
            _formatTime(time),
            style: const TextStyle(fontSize: 11, color: AdminColors.textSecondary),
          ),
          if (unread > 0) ...[
            const SizedBox(height: 4),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
              decoration: BoxDecoration(
                color: AdminColors.error,
                borderRadius: BorderRadius.circular(50),
              ),
              child: Text(
                '$unread',
                style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.w700),
              ),
            ),
          ],
        ],
      ),
      onTap: () => Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => AdminChatScreen(
            conversationId: conv['id']?.toString() ?? '',
            studentName: name,
          ),
        ),
      ),
    );
  }

  String _formatTime(String raw) {
    try {
      final dt = DateTime.parse(raw).toLocal();
      final now = DateTime.now();
      final diff = now.difference(dt);
      if (diff.inDays == 0) {
        return '${dt.hour.toString().padLeft(2, '0')}:${dt.minute.toString().padLeft(2, '0')}';
      }
      if (diff.inDays == 1) return 'Hier';
      return '${dt.day}/${dt.month}';
    } catch (_) {
      return '';
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Chat screen
// ─────────────────────────────────────────────────────────────────────────────

final chatMessagesProvider = FutureProvider.autoDispose
    .family<List<Map<String, dynamic>>, String>((ref, convId) async {
  final api = ref.read(apiClientProvider);
  final resp = await api.get('${ApiConfig.adminConversations}/$convId');
  final data = resp.data['data'];
  if (data is Map) {
    final msgs = data['messages'];
    if (msgs is List) return msgs.cast<Map<String, dynamic>>();
  }
  if (data is List) return data.cast<Map<String, dynamic>>();
  return [];
});

class AdminChatScreen extends ConsumerStatefulWidget {
  final String conversationId;
  final String studentName;
  const AdminChatScreen({
    super.key,
    required this.conversationId,
    required this.studentName,
  });

  @override
  ConsumerState<AdminChatScreen> createState() => _AdminChatScreenState();
}

class _AdminChatScreenState extends ConsumerState<AdminChatScreen> {
  final _msgCtrl = TextEditingController();
  final _scrollCtrl = ScrollController();
  bool _sending = false;

  Future<void> _send() async {
    final text = _msgCtrl.text.trim();
    if (text.isEmpty) return;
    setState(() => _sending = true);
    try {
      final api = ref.read(apiClientProvider);
      await api.post(
        '${ApiConfig.adminConversations}/${widget.conversationId}/messages',
        data: {'body': text},
      );
      _msgCtrl.clear();
      ref.invalidate(chatMessagesProvider(widget.conversationId));
      await Future.delayed(const Duration(milliseconds: 300));
      if (mounted && _scrollCtrl.hasClients) {
        _scrollCtrl.animateTo(
          _scrollCtrl.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.toString()), backgroundColor: AdminColors.error),
        );
      }
    } finally {
      if (mounted) setState(() => _sending = false);
    }
  }

  @override
  void dispose() {
    _msgCtrl.dispose();
    _scrollCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final msgsAsync = ref.watch(chatMessagesProvider(widget.conversationId));

    return Scaffold(
      backgroundColor: AdminColors.surface,
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              widget.studentName.isEmpty ? 'Conversation' : widget.studentName,
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
            ),
            const Text(
              'Étudiant',
              style: TextStyle(fontSize: 12, color: AdminColors.textSecondary),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh_outlined),
            onPressed: () => ref.invalidate(chatMessagesProvider(widget.conversationId)),
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: msgsAsync.when(
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (e, _) => Center(
                child: Text(e.toString(), style: const TextStyle(color: AdminColors.error)),
              ),
              data: (msgs) {
                if (msgs.isEmpty) {
                  return const Center(
                    child: Text(
                      'Aucun message.',
                      style: TextStyle(color: AdminColors.textSecondary),
                    ),
                  );
                }
                return ListView.builder(
                  controller: _scrollCtrl,
                  padding: const EdgeInsets.all(16),
                  itemCount: msgs.length,
                  itemBuilder: (_, i) {
                    final m = msgs[i];
                    final isAdmin = m['is_mine'] == true;
                    return _MessageBubble(message: m, isAdmin: isAdmin);
                  },
                );
              },
            ),
          ),
          Container(
            padding: const EdgeInsets.fromLTRB(12, 8, 12, 12),
            color: AdminColors.white,
            child: SafeArea(
              top: false,
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _msgCtrl,
                      maxLines: 4,
                      minLines: 1,
                      textInputAction: TextInputAction.send,
                      onSubmitted: (_) => _send(),
                      decoration: InputDecoration(
                        hintText: 'Écrire un message...',
                        filled: true,
                        fillColor: AdminColors.surface,
                        contentPadding:
                            const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(24),
                          borderSide: BorderSide.none,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  GestureDetector(
                    onTap: _sending ? null : _send,
                    child: Container(
                      width: 44,
                      height: 44,
                      decoration: const BoxDecoration(
                        color: AdminColors.primary,
                        shape: BoxShape.circle,
                      ),
                      child: _sending
                          ? const Padding(
                              padding: EdgeInsets.all(12),
                              child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                            )
                          : const Icon(Icons.send_rounded, color: Colors.white, size: 20),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _MessageBubble extends StatelessWidget {
  final Map<String, dynamic> message;
  final bool isAdmin;
  const _MessageBubble({required this.message, required this.isAdmin});

  @override
  Widget build(BuildContext context) {
    final body = message['body']?.toString() ?? message['content']?.toString() ?? '';
    final time = message['created_at']?.toString() ?? '';

    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Align(
        alignment: isAdmin ? Alignment.centerRight : Alignment.centerLeft,
        child: ConstrainedBox(
          constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.72),
          child: Column(
            crossAxisAlignment:
                isAdmin ? CrossAxisAlignment.end : CrossAxisAlignment.start,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                decoration: BoxDecoration(
                  color: isAdmin ? AdminColors.primary : AdminColors.white,
                  borderRadius: BorderRadius.only(
                    topLeft: const Radius.circular(16),
                    topRight: const Radius.circular(16),
                    bottomLeft: Radius.circular(isAdmin ? 16 : 4),
                    bottomRight: Radius.circular(isAdmin ? 4 : 16),
                  ),
                  border: isAdmin ? null : Border.all(color: AdminColors.border),
                ),
                child: Text(
                  body,
                  style: TextStyle(
                    fontSize: 14,
                    color: isAdmin ? Colors.white : AdminColors.text,
                    height: 1.4,
                  ),
                ),
              ),
              const SizedBox(height: 3),
              Text(
                _formatTime(time),
                style: const TextStyle(fontSize: 10, color: AdminColors.textSecondary),
              ),
            ],
          ),
        ),
      ),
    );
  }

  String _formatTime(String raw) {
    try {
      final dt = DateTime.parse(raw).toLocal();
      return '${dt.hour.toString().padLeft(2, '0')}:${dt.minute.toString().padLeft(2, '0')}';
    } catch (_) {
      return '';
    }
  }
}
