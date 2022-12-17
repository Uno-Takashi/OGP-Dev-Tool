
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import List from '@mui/material/List';



const Panel = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [metaInfo, setMetaInfo] = useState({});

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
        return (
            <React.Fragment>
                <Button variant="contained" onClick={update_metainfo}>update</Button>
            </React.Fragment>
        );
    }
}


ReactDOM.render(
    <Panel />
    ,
    document.getElementById("root")
);

