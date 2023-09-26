
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CircularProgress from '@mui/material/CircularProgress';
import CachedIcon from '@mui/icons-material/Cached';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkIcon from '@mui/icons-material/Link';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import IconButton from '@mui/material/IconButton';
import LaptopIcon from '@mui/icons-material/Laptop';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import "./style/panel.scss"
import "./style/twitter_summary.scss"
import "./style/twitter_summary_large_image.scss"
import { Help } from "@mui/icons-material";



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
        tip: string,
        ogp_type: string,
        content: string,
        content_value: string = "",
    ) {
        return { tag, tip, ogp_type, content, content_value };
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

    function get_origin() {
        try {
            let url = ""
            metaInfo["ogp"].forEach((meta) => {
                if (meta["ogp_type"] == "og:url") {
                    url = meta["content_value"];
                }
            });
            const parser = new URL(url);
            return parser.hostname.toString();
        } catch (e) {
            return "";
        }

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

    function get_description() {
        let description = ""
        metaInfo["ogp"].forEach((meta) => {
            if (meta["ogp_type"] == "og:description") {
                description = meta["content_value"];
            }
        });
        return description
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
            rows.push(create_table_data(row["tag"], row["tip"], row["ogp_type"], row["content"], row["content_value"]))
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
                                    <TableCell align="center">
                                        {row.ogp_type}
                                        <Tooltip title={row.tip}>
                                            <IconButton>
                                                <HelpIcon sx={{ fontSize: 15 }} />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="center">{row.tag}</TableCell>
                                    <TableCell align="center">{row.content}</TableCell>
                                    <TableCell align="left" className="ogp_content_cell">{row.content_value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Grid container className="sns_title">
                    <Grid xs={12} >
                        <Link href="#" onClick={() => { chrome.tabs.create({ url: "https://cards-dev.twitter.com/validator" }); }} underline="none" color="inherit">
                            <Typography variant="h6" component="h2">
                                <TwitterIcon sx={{ color: "#1DA1F2", verticalAlign: "middle" }} ></TwitterIcon>
                                Twitter
                                <LinkIcon sx={{ verticalAlign: "middle" }} fontSize="small"></LinkIcon>
                            </Typography >
                        </Link>
                    </Grid>
                </Grid>
                <Grid xs={12} md={12}>
                    <Typography variant="subtitle1" component="h3">
                        <LaptopIcon sx={{ verticalAlign: "middle" }} ></LaptopIcon>
                        Summary with Large Image Card (PC)
                    </Typography>
                    <div className="twitter_summary_large_image_large">
                        <div className="preview_img" style={{ background: get_background_url() }}>
                        </div>
                        <div className="preview_text">
                            <p className="preview_url">{get_origin()}</p>
                            <p className="preview_title">{get_title()}</p>
                            <p className="preview_description">{get_description()}</p>
                        </div>
                    </div>
                </Grid>

                <Grid container>
                    <Grid xs={12} md={6}>
                        <Typography variant="subtitle1" component="h3">
                            <LaptopIcon sx={{ verticalAlign: "middle" }} ></LaptopIcon>
                            Summary Card (PC)
                        </Typography>
                        <div className="twitter_summary_large">
                            <div className="preview_img" style={{ background: get_background_url() }}>
                            </div>
                            <div className="preview_text">
                                <p className="preview_url">{get_origin()}</p>
                                <p className="preview_title">{get_title()}</p>
                                <p className="preview_description">{get_description()}</p>
                            </div>
                        </div>
                    </Grid>
                    <Grid xs={12} lg={6}>
                        <Typography variant="subtitle1" component="h3">
                            <SmartphoneIcon sx={{ verticalAlign: "middle" }} ></SmartphoneIcon>
                            Summary Card (SmartPhone)
                        </Typography>
                        <div className="twitter_summary_small">
                            <div className="preview_img" style={{ background: get_background_url() }}>
                            </div>
                            <div className="preview_text">
                                <p className="preview_url">{get_origin()}</p>
                                <p className="preview_title">{get_title()}</p>
                            </div>
                        </div>
                    </Grid>
                </Grid>

            </React.Fragment >
        );
    }
}


ReactDOM.render(
    <Panel />
    ,
    document.getElementById("root")
);

