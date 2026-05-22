import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LaptopIcon from '@mui/icons-material/Laptop';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LinkIcon from '@mui/icons-material/Link';
import XIcon from '@mui/icons-material/X';
import { useTranslation } from 'react-i18next';
import '../../../style/twitter_summary.scss';
import '../../../style/twitter_summary_large_image.scss';
import '../../../style/panel.scss';

interface Props {
  imageUrl: string | null;
  title: string;
  description: string;
  origin: string;
}

export function TwitterPreview({ imageUrl, title, description, origin }: Props) {
  const { t } = useTranslation();
  const backgroundStyle = imageUrl
    ? { background: `url(${imageUrl}) center/cover no-repeat` }
    : {};

  return (
    <>
      <Grid container className="sns_title" sx={{ mt: 2, mb: 1 }}>
        <Grid size={12}>
          <Link
            href="#"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              chrome.tabs.create({ url: 'https://cards-dev.twitter.com/validator' });
            }}
            underline="none"
            color="inherit"
          >
            <Typography variant="h6" component="h2">
              <XIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} />
              {t('preview.x.title')}
              <LinkIcon sx={{ verticalAlign: 'middle', ml: 0.5 }} fontSize="small" />
            </Typography>
          </Link>
        </Grid>
      </Grid>

      <Grid size={12} sx={{ mb: 2 }}>
        <Typography variant="subtitle1" component="h3">
          <LaptopIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} />
          {t('preview.x.summaryLargeImagePc')}
        </Typography>
        <div className="twitter_summary_large_image_large">
          <div className="preview_img" style={backgroundStyle} />
          <div className="preview_text">
            <p className="preview_url">{origin}</p>
            <p className="preview_title">{title}</p>
            <p className="preview_description">{description}</p>
          </div>
        </div>
      </Grid>

      <Grid container sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="subtitle1" component="h3">
            <LaptopIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} />
            {t('preview.x.summaryCardPc')}
          </Typography>
          <div className="twitter_summary_large">
            <div className="preview_img" style={backgroundStyle} />
            <div className="preview_text">
              <p className="preview_url">{origin}</p>
              <p className="preview_title">{title}</p>
              <p className="preview_description">{description}</p>
            </div>
          </div>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Typography variant="subtitle1" component="h3">
            <SmartphoneIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} />
            {t('preview.x.summaryCardSp')}
          </Typography>
          <div className="twitter_summary_small">
            <div className="preview_img" style={backgroundStyle} />
            <div className="preview_text">
              <p className="preview_url">{origin}</p>
              <p className="preview_title">{title}</p>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
