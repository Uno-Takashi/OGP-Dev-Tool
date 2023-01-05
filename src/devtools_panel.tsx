
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
import "./style/twitter_summary.scss"



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

    function create_table_data(
        tag: string,
        ogp_type: string,
        content: string,
        content_value: string = "",
    ) {
        return { tag, ogp_type, content, content_value };
    }

    function get_background_url() {
        let background_url = ""
        metaInfo["ogp"].forEach((meta) => {
            if (meta["ogp_type"] == "og:image") {
                background_url = meta["content_value"];
            }
        });
        return "url(" + background_url + ")"
    }

    function get_title() {
        let title = ""
        metaInfo["ogp"].forEach((meta) => {
            if (meta["ogp_type"] == "og:title") {
                title = meta["content_value"];
            }
        });
        return title
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
        const rows: any[] = []
        metaInfo["ogp"].forEach((row) => (
            rows.push(create_table_data(row["tag"], row["ogp_type"], row["content"], row["content_value"]))
        ))

        return (
            <React.Fragment>
                <IconButton onClick={update_metainfo}>
                    <CachedIcon />
                </IconButton>
                <IconButton >
                    <Brightness4Icon />
                </IconButton>
                <IconButton onClick={() => {
                    chrome.tabs.create({ url: "https://github.com/Uno-Takashi/OGP-Dev-Tool" });
                }}>
                    <GitHubIcon />
                </IconButton>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 350 }} aria-label="ogp info" className="ogp_info_table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">OGP Type</TableCell>
                                <TableCell align="center">tag</TableCell>
                                <TableCell align="center">Content</TableCell>
                                <TableCell align="left">Content value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow>
                                    <TableCell align="center">{row.ogp_type}</TableCell>
                                    <TableCell align="center">{row.tag}</TableCell>
                                    <TableCell align="center">{row.content}</TableCell>
                                    <TableCell align="left" className="ogp_content_cell">{row.content_value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="twitter_summary_pc">
                    <div className="preview_img" style={{ background: get_background_url() }}>
                    </div>
                    <div className="preview_text">
                        <p className="preview_title">{get_title()}</p>
                        <p className="preview_description"></p>
                    </div>
                </div>

            </React.Fragment >
        );
    }
}


ReactDOM.render(
    <Panel />
    ,
    document.getElementById("root")
);

