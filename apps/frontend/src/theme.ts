// ─── Neon AI Fintech — Dark Mode ─────────────────────────────────

export const COLORS = {
  // ── Backgrounds ──────────────────────────────────────────
  bgDark: '#000000',   // App background — True Black
  bgCard: '#151518',   // Card / input background — Dark Charcoal
  bgCardAlt: '#1A1A1E',   // Subtle divider / alt bg

  // ── Base Neon Accents (100% opaque for strict borders/text) ──
  neonYellow: '#bdff96ff',
  neonCyan: '#6bf5ff',
  neonPurple: '#cc95ffff',
  neonPink: '#ff799aff',
  neonBlue: '#0080FF',
  neonOrange: '#FFB347',

  // ── Hex aliases (Mapped for backward compatibility) ────────
  accent: '#6bf5ff',
  glowTeal: '#6bf5ff',
  glowViolet: '#cc95ffff',
  glowRose: '#ff799aff',
  glowPeach: '#FFB347',
  glowPink: '#ff799aff',
  glowAmber: '#bdff96ff',

  // ── Overrides for Pastel refs (Redirected to Neon) ─────────
  pastelBlue: '#6bf5ff',
  pastelGreen: '#9dff64ff',
  pastelPurple: '#cc95ffff',
  pastelPink: '#ff799aff',
  pastelGrey: '#1A1A1E',

  // ── Status ───────────────────────────────────────────────
  onTrack: '#E2FF54',
  atRisk: '#FF3366',
  completed: '#00F0FF',
  paused: '#888888',

  // ── Text ─────────────────────────────────────────────────
  textPrimary: '#FFFFFF',   // Bright white for high contrast headers/numbers
  textSecondary: '#adacacff',   // Light gray for subtext
  textMuted: '#e2e2e2ff',
  textLight: '#FFFFFF',

  // ── Finance ──────────────────────────────────────────────
  income: '#6bf5ff',   // Cyan for income
  expense: '#ff799a',   // Pink for expense

  // ── Misc ─────────────────────────────────────────────────
  border: '#333333',
  divider: '#222222',
};

type GradColors = [string, string, ...string[]];

// ── Glow Gradients ─────────────────────────────────────────
export const GLOW_RGBA = {
  yellow: ['rgba(226, 255, 84, 0)', 'rgba(226, 255, 84, 0.2)'] as GradColors,
  cyan: ['rgba(0, 240, 255, 0)', 'rgba(0, 240, 255, 0.2)'] as GradColors,
  purple: ['rgba(176, 38, 255, 0)', 'rgba(176, 38, 255, 0.2)'] as GradColors,
};

export const GOAL_GRADIENTS = [
  ['#FFB347', '#6bf5ff'],
  ['#bdF96F', '#FFB347'],
  ['#cc95ff', '#ff799a'],
];

// Gradients mappings
export const GRADIENTS: Record<string, GradColors> = {
  screenBg: ['#000000', '#000000'],
  agentBg: ['#000000', '#000000'],
  card: ['#151518', '#151518'],      // AI bubble: bgCard
  cardActive: ['#1A1A1E', '#1A1A1E'],
  btnPrimary: ['#FFB347', '#00F0FF'],      // Action buttons glow
  btnSecond: ['#E2FF54', '#FFB347'],
  btnTertiary: ['#B026FF', '#FF3366'],
  logo: ['#00F0FF', '#B026FF'],
  progressOk: ['#E2FF54', '#E2FF54'],
  progressRisk: ['#FF3366', '#FF3366'],
  barIncome: ['#6bf5ff', '#0080FF'],
  barExpense: ['#ff799a', '#cc95ff'],
  chatAvatar: ['#00F0FF', '#B026FF'],
  userBubble: ['#FFB347', '#6bf5ff'],
};
