import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { useTranslation } from 'react-i18next';
import type { OGPTag } from '../../domain/entities/OGPMetadata';
import { useCopyToClipboard } from '../../shared/hooks/useCopyToClipboard';

interface CopyButtonProps {
  text: string | null;
}

function CopyButton({ text }: CopyButtonProps) {
  const { t } = useTranslation();
  const { copy, copied } = useCopyToClipboard();

  return (
    <Tooltip title={copied ? t('panel.table.copied') : t('panel.table.copy')}>
      <IconButton size="small" onClick={() => copy(text ?? '')} color={copied ? 'success' : 'default'}>
        {copied ? <CheckIcon sx={{ fontSize: 14 }} /> : <ContentCopyIcon sx={{ fontSize: 14 }} />}
      </IconButton>
    </Tooltip>
  );
}

interface Props {
  tags: OGPTag[];
}

export function OGPTable({ tags }: Props) {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper} sx={{ mb: 2 }}>
      <Table sx={{ minWidth: 350 }} size="small" aria-label="ogp info">
        <TableHead>
          <TableRow>
            <TableCell align="center">{t('panel.table.ogpType')}</TableCell>
            <TableCell align="center">{t('panel.table.tag')}</TableCell>
            <TableCell align="center">{t('panel.table.content')}</TableCell>
            <TableCell align="left">{t('panel.table.contentValue')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tags.map((row) => (
            <TableRow key={row.ogpType}>
              <TableCell align="center">
                {row.ogpType}
                <Tooltip title={t(row.tipKey)} arrow>
                  <IconButton size="small">
                    <HelpOutlineIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell align="center">{row.tag}</TableCell>
              <TableCell align="center">{row.content}</TableCell>
              <TableCell align="left" sx={{ maxWidth: 200, wordBreak: 'break-all' }}>
                {row.contentValue}
                <CopyButton text={row.contentValue} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
