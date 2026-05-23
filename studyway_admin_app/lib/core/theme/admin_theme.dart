import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AdminColors {
  static const Color primary = Color(0xFF2563EB);
  static const Color nightBlue = Color(0xFF071B4D);
  static const Color surface = Color(0xFFF1F5F9);
  static const Color white = Color(0xFFFFFFFF);
  static const Color text = Color(0xFF0F172A);
  static const Color textSecondary = Color(0xFF64748B);
  static const Color border = Color(0xFFE2E8F0);
  static const Color success = Color(0xFF22C55E);
  static const Color error = Color(0xFFEF4444);
  static const Color warning = Color(0xFFF59E0B);
  // Dark sidebar
  static const Color sidebarBg = Color(0xFF0F172A);
  static const Color sidebarSelected = Color(0xFF1E293B);
  static const Color sidebarText = Color(0xFF94A3B8);
  static const Color sidebarTextActive = Color(0xFFFFFFFF);
}

class AdminTheme {
  static ThemeData get light => ThemeData(
    useMaterial3: true,
    brightness: Brightness.light,
    colorScheme: ColorScheme.light(primary: AdminColors.primary, surface: AdminColors.white),
    scaffoldBackgroundColor: AdminColors.surface,
    textTheme: GoogleFonts.interTextTheme().copyWith(
      headlineLarge: GoogleFonts.inter(fontWeight: FontWeight.w800, color: AdminColors.text, fontSize: 22),
      headlineMedium: GoogleFonts.inter(fontWeight: FontWeight.w700, color: AdminColors.text, fontSize: 18),
      titleLarge: GoogleFonts.inter(fontWeight: FontWeight.w700, color: AdminColors.text, fontSize: 15),
      bodyMedium: GoogleFonts.inter(fontWeight: FontWeight.w400, color: AdminColors.textSecondary, fontSize: 14),
    ),
    appBarTheme: AppBarTheme(
      backgroundColor: AdminColors.white,
      elevation: 0,
      scrolledUnderElevation: 0.5,
      titleTextStyle: GoogleFonts.inter(fontWeight: FontWeight.w800, fontSize: 18, color: AdminColors.text),
      iconTheme: const IconThemeData(color: AdminColors.text),
    ),
    cardTheme: CardThemeData(
      color: AdminColors.white,
      elevation: 0,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: const BorderSide(color: AdminColors.border)),
      margin: EdgeInsets.zero,
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: AdminColors.primary,
        foregroundColor: AdminColors.white,
        minimumSize: const Size(0, 44),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        textStyle: GoogleFonts.inter(fontWeight: FontWeight.w700, fontSize: 14),
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: AdminColors.surface,
      contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: const BorderSide(color: AdminColors.border)),
      enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: const BorderSide(color: AdminColors.border)),
      focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: const BorderSide(color: AdminColors.primary, width: 2)),
    ),
  );

  static ThemeData get dark => ThemeData(
    useMaterial3: true,
    brightness: Brightness.dark,
    scaffoldBackgroundColor: const Color(0xFF0F172A),
    colorScheme: const ColorScheme.dark(primary: AdminColors.primary, surface: Color(0xFF1E293B)),
  );
}
