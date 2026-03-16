import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../theme';
import { FONT, FONT_BOLD, FONT_EXTRABOLD } from '../../utils/fonts';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const CARD_WIDTH   = SCREEN_WIDTH * 0.78;
export const CARD_MARGIN  = 12;

const styles = StyleSheet.create({
  sliderWrapper: { marginBottom: 4 },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 8 },

  // ── Card ────────────────────────────────────────────────
  cardWrapper: {
    width: CARD_WIDTH,
    marginHorizontal: CARD_MARGIN,
    borderRadius: 20,
    overflow: 'hidden', // to contain the neon glow gradient
  },
  cardActive: {
    // subtle indication, no borders
  },
  cardGradientFull: { 
    flex: 1,
    padding: 20,
  },

  // ── Header ───────────────────────────────────────────────
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalName: {
    fontFamily: FONT_EXTRABOLD,
    fontSize: 18,
    color: '#000000',
    flex: 1,
    marginRight: 8,
    letterSpacing: -0.3,
  },

  // Status badge
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 99,
    gap: 5,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  statusText: { fontFamily: FONT_BOLD, fontSize: 11, color: '#000000' },

  // ── Amounts ──────────────────────────────────────────────
  amountsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  amountBlock: { flex: 1, alignItems: 'center' },
  amountLabel: {
    fontFamily: FONT,
    fontSize: 10,
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 3,
  },
  amountValue: {
    fontFamily: FONT_BOLD,
    fontSize: 14,
    color: '#000000',
  },
  amountDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: 4,
  },

  // ── Progress bar ─────────────────────────────────────────
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 99,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: { height: '100%', borderRadius: 99, backgroundColor: '#000000' },
  progressLabelRow: { flexDirection: 'row', justifyContent: 'space-between' },
  progressPct: { fontFamily: FONT_BOLD, fontSize: 12, color: 'rgba(0,0,0,0.8)' },
  targetDate:  { fontFamily: FONT, fontSize: 12, color: 'rgba(0,0,0,0.6)' },

  // ── Pagination dots ──────────────────────────────────────
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 7,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.border,
  },
  dotActive: {
    width: 22,
    backgroundColor: COLORS.neonCyan,
    borderRadius: 3,
  },
});

export default styles;
