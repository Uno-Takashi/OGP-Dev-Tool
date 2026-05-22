import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LinkIcon from '@mui/icons-material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

interface Props {
  imageUrl: string | null;
  title: string;
  description: string;
  origin: string;
}

export function FacebookPreview({ imageUrl, title, description, origin }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <Grid container className="sns_title" sx={{ mt: 2, mb: 1 }}>
        <Grid item xs={12}>
          <Link
            href="#"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              chrome.tabs.create({ url: 'https://developers.facebook.com/tools/debug/' });
            }}
            underline="none"
            color="inherit"
          >
            <Typography variant="h6" component="h2">
              <FacebookIcon sx={{ color: '#1877F2', verticalAlign: 'middle', mr: 0.5 }} />
              {t('preview.facebook.title')}
              <LinkIcon sx={{ verticalAlign: 'middle', ml: 0.5 }} fontSize="small" />
            </Typography>
          </Link>
        </Grid>
      </Grid>

      <Box
        sx={{
          maxWidth: 500,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 0,
          overflow: 'hidden',
          mb: 2,
        }}
      >
        {imageUrl && (
          <Box
            component="div"
            sx={{
              width: '100%',
              height: 261,
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}
        <Box sx={{ p: 1.5, bgcolor: 'background.paper' }}>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              textTransform: 'uppercase',
              fontSize: '0.7rem',
            }}
          >
            {origin}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              mt: 0.25,
              lineHeight: 1.3,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mt: 0.5,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
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
