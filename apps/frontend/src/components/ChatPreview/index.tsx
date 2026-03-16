import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Bot, ChevronRight } from 'lucide-react-native';
import { ChatPreview as ChatPreviewType } from '../../coordinator/types';
import { GRADIENTS, COLORS } from '../../theme';
import { FONT, FONT_BOLD } from '../../utils/fonts';
import styles from './styles';

interface ChatPreviewProps {
  preview: ChatPreviewType;
  onPress?: () => void;
}

const ChatPreview: React.FC<ChatPreviewProps> = ({ preview, onPress }) => {
  const hasUnread = preview.unread_count > 0;

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      style={styles.container}
    >
      <LinearGradient
        colors={GRADIENTS.card}
        style={styles.bgGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.innerPad}>
        {/* Gradient avatar with Bot icon */}
        <View style={styles.avatarWrap}>
          <LinearGradient
            colors={GRADIENTS.chatAvatar as [string, string, ...string[]]}
            style={styles.avatarGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Bot size={22} color="#FFFFFF" strokeWidth={2.5} />
          </LinearGradient>
          {hasUnread && (
            <View style={styles.unreadBadge}>
              <Text style={[styles.unreadText, { fontFamily: FONT_BOLD }]}>
                {preview.unread_count > 9 ? '9+' : preview.unread_count}
              </Text>
            </View>
          )}
        </View>

        {/* Message */}
        <View style={styles.textBlock}>
          <View style={styles.nameRow}>
            <Text style={[styles.agentName, { fontFamily: FONT_BOLD }]}>GoalPilot Agent</Text>
            <View style={styles.liveChip}>
              <View style={styles.liveDot} />
              <Text style={[styles.liveText, { fontFamily: FONT_BOLD }]}>AI</Text>
            </View>
          </View>
          <Text style={[styles.lastMessage, { fontFamily: FONT }]} numberOfLines={2}>
            {preview.last_message}
          </Text>
        </View>

        {/* Lucide chevron */}
        <View style={styles.chevronWrap}>
          <ChevronRight size={20} color={COLORS.glowViolet} strokeWidth={2.5} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatPreview;
