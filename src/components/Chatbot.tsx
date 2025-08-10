import React, { useState } from 'react';
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Paper,
  IconButton,
} from '@mui/material';
import { Chat, Close, Send, SmartToy } from '@mui/icons-material';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your LMS assistant. I can help you with course recommendations, learning paths, and answer questions about the platform. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(message);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('course') || lowerMessage.includes('learn')) {
      return 'I recommend checking out our Course Catalog! We have 6 courses available including React Development, Python Programming, Data Science, UI/UX Design, Machine Learning, and Project Management. Which area interests you most?';
    }

    if (lowerMessage.includes('skill') || lowerMessage.includes('progress')) {
      return 'You can track your skills in the Skills Profile section. It shows your proficiency levels across different technologies and provides analytics on your learning progress. Would you like me to guide you there?';
    }

    if (lowerMessage.includes('personalized') || lowerMessage.includes('path')) {
      return 'Our Personalized Learning feature creates custom learning paths based on your goals and progress. We offer Beginner to Expert tracks for different career paths. Check out the Personalized Learning section to explore your options!';
    }

    if (lowerMessage.includes('social') || lowerMessage.includes('forum')) {
      return 'Join our Social Learning community! You can participate in discussion forums, join study groups, and see what other learners are achieving. It\'s a great way to stay motivated and get help when needed.';
    }

    if (lowerMessage.includes('achievement') || lowerMessage.includes('badge')) {
      return 'You can earn badges and certificates by completing courses, participating in forums, and maintaining learning streaks. Check your Achievements page to see your progress and available badges to earn!';
    }

    if (lowerMessage.includes('mandatory') || lowerMessage.includes('required')) {
      return 'Mandatory courses are assigned by your organization and have specific deadlines. You can find them in the Mandatory Courses section under My Courses. Make sure to complete them before their due dates!';
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
      return 'I can help you with:\n• Course recommendations\n• Learning path guidance\n• Platform navigation\n• Progress tracking\n• Social features\n• Achievement system\n\nWhat specific area would you like help with?';
    }

    return 'I understand you\'re asking about "' + userMessage + '". While I\'m still learning, I can help you with course recommendations, learning paths, skills tracking, and platform navigation. Could you rephrase your question or ask about one of these topics?';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="chat"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
        onClick={() => setOpen(true)}
      >
        <Chat />
      </Fab>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { height: '600px', display: 'flex', flexDirection: 'column' }
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SmartToy color="primary" />
            <Typography variant="h6">LMS Assistant</Typography>
          </Box>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
            {messages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, maxWidth: '80%' }}>
                  {msg.sender === 'bot' && (
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                      <SmartToy sx={{ fontSize: 20 }} />
                    </Avatar>
                  )}
                  <Paper
                    sx={{
                      p: 2,
                      backgroundColor: msg.sender === 'user' ? 'primary.main' : 'grey.100',
                      color: msg.sender === 'user' ? 'white' : 'text.primary',
                    }}
                  >
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                      {msg.text}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        mt: 1,
                        opacity: 0.7,
                      }}
                    >
                      {msg.timestamp.toLocaleTimeString()}
                    </Typography>
                  </Paper>
                  {msg.sender === 'user' && (
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                      U
                    </Avatar>
                  )}
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              multiline
              maxRows={3}
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button
              variant="contained"
              onClick={handleSendMessage}
              disabled={!message.trim()}
              sx={{ minWidth: 'auto', px: 2 }}
            >
              <Send />
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
