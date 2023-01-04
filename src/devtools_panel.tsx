
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CircularProgress from '@mui/material/CircularProgress';
import CachedIcon from '@mui/icons-material/Cached';
import GitHubIcon from '@mui/icons-material/GitHub';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./style/panel.scss"



const Panel = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [metaInfo, setMetaInfo] = useState({ "ogp": [] });

    function update_metainfo() {
        const tabid = chrome.devtools.inspectedWindow.tabId;
        chrome.tabs.sendMessage(
            tabid,
            {},
            (msg) => {
                setMetaInfo(msg);
                setIsLoading(false);
            }
        );
    }

    function createData(
        tag: string,
        ogp_type: string,
        content: string,
        content_value: string = "",
    ) {
        return { tag, ogp_type, content, content_value };
    }

    if (isLoading) {
        update_metainfo();
        return (
            <React.Fragment>
                <CircularProgress />
            </React.Fragment>
        )
    }
    else {
        console.log(metaInfo);
        const rows: any[] = []
        metaInfo["ogp"].forEach((row) => (
            rows.push(createData(row["tag"], row["ogp_type"], row["content"], row["content_value"]))
        ))

        return (
            <React.Fragment>
                <IconButton onClick={update_metainfo}>
                    <CachedIcon />
                </IconButton>
                <IconButton >
                    <Brightness4Icon />
                </IconButton>
                <IconButton >
                    <GitHubIcon />
                </IconButton>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 350 }} aria-label="ogp info" className="ogp_info_table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">OGP Type</TableCell>
                                <TableCell align="left">tag</TableCell>
                                <TableCell align="left">Content</TableCell>
                                <TableCell align="left">Content value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow>
                                    <TableCell align="center">{row.ogp_type}</TableCell>
                                    <TableCell align="left">{row.tag}</TableCell>
                                    <TableCell align="left">{row.content}</TableCell>
                                    <TableCell align="left" className="ogp_content_cell">{row.content_value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </React.Fragment>
        );
    }
}


ReactDOM.render(
    <Panel />
    ,
    document.getElementById("root")
);

