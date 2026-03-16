import React from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * GlowBackground — Pastel Dark Flat Glassmorphism variant for Agent screen.
 * Three large pastel blobs with big borderRadius create a soft gradient-like
 * ambient light effect on the #5D5D5A background. Opacity kept low — clean flat feel.
 */
const GlowBackground: React.FC = () => (
  <View style={StyleSheet.absoluteFill} pointerEvents="none">
    {/* Top-left pastel blue blob */}
    <View style={[styles.blob, styles.blobTopLeft]} />
    {/* Bottom-right pastel purple blob */}
    <View style={[styles.blob, styles.blobBottomRight]} />
    {/* Centre-right pastel pink blob */}
    <View style={[styles.blob, styles.blobCentreRight]} />
  </View>
);

const styles = StyleSheet.create({
  blob: {
    position: 'absolute',
    borderRadius: 999,
  },
  blobTopLeft: {
    width: 340,
    height: 340,
    top: -120,
    left: -100,
    backgroundColor: '#CDEBF1',   // pastelBlue
    opacity: 0.17,
  },
  blobBottomRight: {
    width: 380,
    height: 380,
    bottom: -130,
    right: -110,
    backgroundColor: '#CBCEEA',   // pastelPurple
    opacity: 0.15,
  },
  blobCentreRight: {
    width: 260,
    height: 260,
    top: '35%',
    right: -80,
    backgroundColor: '#F8E5E5',   // pastelPink
    opacity: 0.11,
  },
});

export default GlowBackground;
