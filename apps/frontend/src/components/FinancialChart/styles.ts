import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme';
import { FONT, FONT_BOLD } from '../../utils/fonts';

export const CHART_HEIGHT = 120;
export const BAR_GAP = 5;

const styles = StyleSheet.create({
  // ── Container ────────────────────────────────────────────
  container: {
    borderRadius: 20,
    marginHorizontal: 20,
    shadowColor: COLORS.neonCyan,
    shadowOffset: { width: 0, height: 12, },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 15,
    overflow: 'visible',
  },
  innerPad: {
    padding: 20,
  },
  bgGradient: {
    display: 'none',
  },

  // ── Header ──────────────────────────────────────────────
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: { fontSize: 16, fontFamily: FONT_BOLD, color: COLORS.textPrimary, letterSpacing: -0.2 },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 10,
    padding: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  toggleBtn: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 8,
  },
  toggleBtnActive: { backgroundColor: COLORS.glowViolet },
  toggleText: { fontSize: 12, fontWeight: '600', color: COLORS.textMuted },
  toggleTextActive: { color: '#FFFFFF', fontWeight: '700' },

  // ── Summary strip ────────────────────────────────────────
  summaryStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  summaryItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  summaryLabel: { fontSize: 10, color: COLORS.textMuted, marginBottom: 2, fontFamily: FONT },
  summaryVal: { fontSize: 13, color: COLORS.textPrimary, fontFamily: FONT_BOLD },

  // ── Chart area ───────────────────────────────────────────
  chartArea: {
    height: CHART_HEIGHT + 24,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: COLORS.divider,
  },
  barGroup: {
    flex: 1,
    alignItems: 'center',
  },
  barsInner: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: CHART_HEIGHT,
    gap: BAR_GAP,
  },
  bar: {
    width: 9,
    borderRadius: 5,
    overflow: 'hidden',
  },
  barGradientWrapper: {
    width: 9,
    borderRadius: 5,
    overflow: 'hidden',
  },
  barLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 6,
    fontFamily: FONT,
  },
});

export default styles;
