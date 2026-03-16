import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme';
import { FONT, FONT_BOLD } from '../../utils/fonts';

const styles = StyleSheet.create({
  // ── User bubble ──────────────────────────────────────────
  userRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 16,
    marginVertical: 5,
  },
  userBubble: {
    maxWidth: '78%',
    borderRadius: 20,
    borderBottomRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    shadowColor: COLORS.neonPurple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 3,
  },
  userText: {
    fontFamily: FONT,
    fontSize: 14,
    lineHeight: 21,
  },

  // ── AI bubble ────────────────────────────────────────────
  aiRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginHorizontal: 16,
    marginVertical: 5,
  },
  aiAvatarWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: COLORS.neonCyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 2,
  },
  aiBubble: {
    maxWidth: '78%',
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    backgroundColor: "#424244ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 2,
  },
  aiText: {
    fontFamily: FONT,
    fontSize: 14,
    lineHeight: 21,
  },

  // ── Timestamp ────────────────────────────────────────────
  timestamp: {
    fontFamily: FONT,
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 3,
    marginHorizontal: 16,
  },
  timestampUser: { textAlign: 'right' },
  timestampAi: { marginLeft: 48 },
});

export default styles;
