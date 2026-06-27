import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';




export const FooterContainer = styled(Box)({
   textAlign: 'center',
  backgroundColor: 'rgba(40, 40, 40, 0.85)',  
  backdropFilter: 'blur(10px)',                
  padding: '20px 0',
  borderTop: '1px solid rgba(255,255,255,0.1)',
});

export const FooterLinks = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  marginBottom: '8px',
});

export const FooterText = styled(Typography)({
   fontSize: '0.9rem',
  opacity: 0.8,
  letterSpacing: '0.5px',
});