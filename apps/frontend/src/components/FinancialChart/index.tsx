import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { CashFlowPoint } from '../../coordinator/types';
import { COLORS, GRADIENTS } from '../../theme';
import styles, { CHART_HEIGHT } from './styles';
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmtM = (n: number) =>
  n === 0 ? '0' : n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(1)}M`
    : `${(n / 1_000).toFixed(0)}K`;

// ─── FinancialChart ───────────────────────────────────────────────────────────
interface FinancialChartProps {
  data: CashFlowPoint[];
  title?: string;
}

const FinancialChart: React.FC<FinancialChartProps> = ({
  data,
  title = 'Weekly Overview',
}) => {

  const maxVal = Math.max(...data.flatMap((d) => [d.income, d.expense]), 1);
  const barH = (val: number) => Math.max((val / maxVal) * CHART_HEIGHT, val > 0 ? 6 : 0);

  const totalIncome = data.reduce((s, d) => s + d.income, 0);
  const totalExpense = data.reduce((s, d) => s + d.expense, 0);
  const netBalance = totalIncome - totalExpense;

  return (
    <LiquidGlassView
      style={[
        styles.container,
        {
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.1)',
        },
        !isLiquidGlassSupported && { backgroundColor: COLORS.bgCard }
      ]}
      effect="clear"
    >

      <View style={styles.innerPad}>
        {/* ── Header ── */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>{title}</Text>
        </View>

        {/* ── Summary strip ── */}
        <View style={styles.summaryStrip}>
          <View style={styles.summaryItem}>
            <View style={[styles.legendDot, { backgroundColor: COLORS.income }]} />
            <View>
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={[styles.summaryVal, { color: COLORS.income }]}>{fmtM(totalIncome)} ₫</Text>
            </View>
          </View>
          <View style={styles.summaryItem}>
            <View style={[styles.legendDot, { backgroundColor: COLORS.expense }]} />
            <View>
              <Text style={styles.summaryLabel}>Expenses</Text>
              <Text style={[styles.summaryVal, { color: COLORS.expense }]}>{fmtM(totalExpense)} ₫</Text>
            </View>
          </View>
          <View style={styles.summaryItem}>
            <View style={[styles.legendDot, { backgroundColor: netBalance >= 0 ? COLORS.glowTeal : COLORS.atRisk }]} />
            <View>
              <Text style={styles.summaryLabel}>Net</Text>
              <Text style={[styles.summaryVal, { color: netBalance >= 0 ? COLORS.glowTeal : COLORS.atRisk }]}>
                {netBalance >= 0 ? '+' : ''}{fmtM(netBalance)} ₫
              </Text>
            </View>
          </View>
        </View>

        {/* ── Bar chart ── */}
        <View style={styles.chartArea}>
          {/* Grid lines */}
          <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
            {[1, 0.66, 0.33].map((ratio) => (
              <View
                key={ratio}
                style={[styles.gridLine, { top: CHART_HEIGHT * (1 - ratio) }]}
              />
            ))}
          </View>

          {/* Bars */}
          {data.map((bar, i) => {
            const dateObj = new Date(bar.date);
            const label = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

            return (
              <View key={i} style={styles.barGroup}>
                <View style={styles.barsInner}>
                  {/* Income bar */}
                  <View style={[styles.barGradientWrapper, { height: barH(bar.income) }]}>
                    <LinearGradient
                      colors={GRADIENTS.barIncome}
                      style={{ flex: 1, borderRadius: 5 }}
                      start={{ x: 0, y: 1 }}
                      end={{ x: 0, y: 0 }}
                    />
                  </View>
                  {/* Expense bar */}
                  <View style={[styles.barGradientWrapper, { height: barH(bar.expense) }]}>
                    <LinearGradient
                      colors={GRADIENTS.barExpense}
                      style={{ flex: 1, borderRadius: 5 }}
                      start={{ x: 0, y: 1 }}
                      end={{ x: 0, y: 0 }}
                    />
                  </View>
                </View>
                <Text style={styles.barLabel}>{label}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </LiquidGlassView>
  );
};

export default FinancialChart;
