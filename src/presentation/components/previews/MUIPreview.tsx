import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';

interface Props {
  imageUrl: string | null;
  title: string;
  description: string;
  origin: string;
}

export function MUIPreview({ imageUrl, title, description, origin }: Props) {
  const { t } = useTranslation();

  return (
    <>
      <Grid container sx={{ mt: 2, mb: 1 }}>
        <Grid size={12}>
          <Typography variant="h6" component="h2">
            {t('preview.mui.title')}
          </Typography>
        </Grid>
      </Grid>

      <Card sx={{ maxWidth: 384, mb: 2 }} elevation={2}>
        {imageUrl && (
          <CardMedia
            component="img"
            height="200"
            image={imageUrl}
            alt={title}
            sx={{ objectFit: 'cover' }}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h6" component="h3" noWrap>
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary" gutterBottom sx={{ display: 'block' }}>
            {origin}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
