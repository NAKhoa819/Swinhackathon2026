import React from 'react';
import { View, Text } from 'react-native';
import { Bot } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChatMessage } from '../../coordinator/types';
import { COLORS, GRADIENTS } from '../../theme';
import ActionButtons from '../ActionButtons';
import styles from './styles';

interface ChatBubbleProps {
  message: ChatMessage;
  onActionPress: (action: any) => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, onActionPress }) => {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <View>
        <View style={styles.userRow}>
          <LinearGradient
            colors={GRADIENTS.btnPrimary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.userBubble, { borderWidth: 0 }]}
          >
            <Text style={[styles.userText, { color: COLORS.textPrimary }]}>
              {message.text}
            </Text>
          </LinearGradient>
        </View>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.aiRow}>
        <View style={[styles.aiAvatarWrap, { backgroundColor: COLORS.bgCardAlt, borderColor: COLORS.neonCyan }]}>
          <Bot size={16} color={COLORS.neonCyan} strokeWidth={2.5} />
        </View>
        <View style={[styles.aiBubble, { backgroundColor: '#2A2A30', borderWidth: 0 }]}>
          <Text style={[styles.aiText, { color: COLORS.textPrimary }]}>
            {message.text}
          </Text>
        </View>
      </View>
      {message.actions && message.actions.length > 0 && (
        <ActionButtons actions={message.actions} onPress={onActionPress} />
      )}
    </View>
  );
};

export default ChatBubble;
