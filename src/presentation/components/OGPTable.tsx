import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useTranslation } from 'react-i18next';
import type { OGPTag } from '../../domain/entities/OGPMetadata';
import { useCopyToClipboard } from '../../shared/hooks/useCopyToClipboard';
import { validateOGPValue } from '../../shared/utils/ogpValidation';

function isUrl(value: string | null): boolean {
  if (!value) return false;
  return value.startsWith('http://') || value.startsWith('https://');
}

interface CopyButtonProps {
  text: string | null;
}

function CopyButton({ text }: CopyButtonProps) {
  const { t } = useTranslation();
  const { copy, copied } = useCopyToClipboard();

  return (
    <Tooltip title={copied ? t('panel.table.copied') : t('panel.table.copy')}>
      <IconButton
        size="small"
        onClick={() => copy(text ?? '')}
        color={copied ? 'success' : 'default'}
      >
        {copied ? <CheckIcon sx={{ fontSize: 14 }} /> : <ContentCopyIcon sx={{ fontSize: 14 }} />}
      </IconButton>
    </Tooltip>
  );
}

interface LinkButtonProps {
  url: string;
}

function LinkButton({ url }: LinkButtonProps) {
  const { t } = useTranslation();

  return (
    <Tooltip title={t('panel.table.openLink')}>
      <IconButton size="small" onClick={() => chrome.tabs.create({ url })}>
        <OpenInNewIcon sx={{ fontSize: 14 }} />
      </IconButton>
    </Tooltip>
  );
}

interface StatusIconProps {
  ogpType: string;
  contentValue: string | null;
}

function StatusIcon({ ogpType, contentValue }: StatusIconProps) {
  const { t } = useTranslation();
  const status = validateOGPValue(ogpType, contentValue);

  if (status === 'valid') {
    return (
      <Tooltip title={t('panel.table.valid')} arrow>
        <CheckCircleOutlineIcon
          sx={{ fontSize: 16, color: 'success.main', verticalAlign: 'middle' }}
        />
      </Tooltip>
    );
  }
  if (status === 'invalid') {
    return (
      <Tooltip title={t('panel.table.invalid')} arrow>
        <WarningAmberIcon sx={{ fontSize: 16, color: 'warning.main', verticalAlign: 'middle' }} />
      </Tooltip>
    );
  }
  return null;
}

interface Props {
  tags: OGPTag[];
}

export function OGPTable({ tags }: Props) {
  const { t } = useTranslation();
  const [filterValid, setFilterValid] = useState(false);

  const visibleTags = useMemo(
    () =>
      filterValid
        ? tags.filter((row) => validateOGPValue(row.ogpType, row.contentValue) === 'valid')
        : tags,
    [filterValid, tags]
  );

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 0.5 }}>
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={filterValid}
              onChange={(e) => setFilterValid(e.target.checked)}
            />
          }
          label={<Typography variant="caption">{t('panel.table.filterValid')}</Typography>}
          labelPlacement="start"
        />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} size="small" aria-label="ogp info">
          <TableHead>
            <TableRow>
              <TableCell align="center">{t('panel.table.ogpType')}</TableCell>
              <TableCell align="center">{t('panel.table.tag')}</TableCell>
              <TableCell align="center">{t('panel.table.content')}</TableCell>
              <TableCell align="center" sx={{ width: 44, px: 0.5 }}>
                {t('panel.table.status')}
              </TableCell>
              <TableCell align="left">{t('panel.table.contentValue')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleTags.map((row) => (
              <TableRow key={row.ogpType}>
                <TableCell align="center">
                  {row.ogpType}
                  <Tooltip title={t(row.tipKey)} arrow>
                    <IconButton size="small">
                      <InfoOutlinedIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">{row.tag}</TableCell>
                <TableCell align="center">{row.content}</TableCell>
                <TableCell align="center" sx={{ px: 0.5 }}>
                  <StatusIcon ogpType={row.ogpType} contentValue={row.contentValue} />
                </TableCell>
                <TableCell align="left" sx={{ maxWidth: 200, wordBreak: 'break-all' }}>
                  {row.contentValue}
                  {row.contentValue !== null && <CopyButton text={row.contentValue} />}
                  {isUrl(row.contentValue) && <LinkButton url={row.contentValue!} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
