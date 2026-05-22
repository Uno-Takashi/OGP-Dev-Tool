import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/useOGPData';

interface Props {
  imageUrl: string | null;
  title: string;
  description: string;
  origin: string;
  siteName: string;
}

export function ShadcnPreview({ imageUrl, title, description, origin, siteName }: Props) {
  const { t } = useTranslation();
  const isDarkMode = useAppSelector((state) => state.ui.isDarkMode);

  return (
    <>
      <Grid container sx={{ mt: 2, mb: 1 }}>
        <Grid size={12}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            {t('preview.shadcn.title')}
          </Typography>
        </Grid>
      </Grid>

      <Box
        sx={{
          maxWidth: 384,
          borderRadius: '0.5rem',
          border: '1px solid',
          borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          bgcolor: isDarkMode ? 'hsl(222.2,84%,4.9%)' : '#ffffff',
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          fontFamily: '"Inter", "Geist", -apple-system, sans-serif',
          mb: 2,
        }}
      >
        {imageUrl && (
          <Box
            sx={{
              width: '100%',
              aspectRatio: '16/9',
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}
        <Box sx={{ p: '1.5rem' }}>
          <Typography
            sx={{
              fontSize: '1.5rem',
              fontWeight: 600,
              lineHeight: 1.2,
              color: isDarkMode ? 'hsl(210,40%,98%)' : 'hsl(222.2,47.4%,11.2%)',
              mb: '0.25rem',
              fontFamily: 'inherit',
            }}
          >
            {siteName || title}
          </Typography>
          <Typography
            sx={{
              fontSize: '0.875rem',
              color: isDarkMode ? 'hsl(215,20.2%,65.1%)' : 'hsl(215.4,16.3%,46.9%)',
              mb: '1rem',
              fontFamily: 'inherit',
            }}
          >
            {origin}
          </Typography>
          <Typography
            sx={{
              fontSize: '0.875rem',
              lineHeight: 1.6,
              color: isDarkMode ? 'hsl(210,40%,98%)' : 'hsl(222.2,47.4%,11.2%)',
              fontFamily: 'inherit',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
