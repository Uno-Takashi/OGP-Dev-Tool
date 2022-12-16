
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from '@mui/material/Button';



const tabid = chrome.devtools.inspectedWindow.tabId;
console.log(tabid);
chrome.tabs.sendMessage(
    tabid,
    {
        color: "#888888",
    },
    (msg) => {
        console.log(msg);
    }
);

const Panel = () => {

    return (
        <React.Fragment>
            <Button variant="contained">Hello World</Button>
        </React.Fragment>
    );
}




ReactDOM.render(
    <Panel />,
    document.getElementById("root")
);

