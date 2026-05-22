import { Card, Typography } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import Grid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const { Text, Paragraph } = Typography;

interface Props {
  imageUrl: string | null;
  title: string;
  description: string;
  origin: string;
}

export function AntDesignPreview({ imageUrl, title, description, origin }: Props) {
  const { t } = useTranslation();

  const coverImage = imageUrl ? (
    <img alt={title} src={imageUrl} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
  ) : undefined;

  return (
    <>
      <Grid container sx={{ mt: 2, mb: 1 }}>
        <Grid size={12}>
          <MuiTypography variant="h6" component="h2">
            <AntDesignOutlined
              style={{ color: '#1677ff', marginRight: 4, verticalAlign: 'middle' }}
            />
            {t('preview.antd.title')}
          </MuiTypography>
        </Grid>
      </Grid>

      <div style={{ maxWidth: 384, marginBottom: 16 }}>
        <Card
          cover={coverImage}
          style={{
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <Card.Meta
            title={
              <Text strong ellipsis={{ tooltip: title }}>
                {title}
              </Text>
            }
            description={
              <>
                <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 4 }}>
                  {origin}
                </Text>
                <Paragraph ellipsis={{ rows: 3 }} style={{ marginBottom: 0 }}>
                  {description}
                </Paragraph>
              </>
            }
          />
        </Card>
      </div>
    </>
  );
}
