
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from '@mui/material/Button';


chrome.devtools.inspectedWindow.getResources(
    function (exceptionInfo: object) {
        console.log("hello");
        console.log(document.title)
        const tabid = chrome.devtools.inspectedWindow.tabId;
        console.log(tabid);
        chrome.tabs.sendMessage(
            tabid,
            {
                color: "#555555",
            },
            (msg: HTMLCollection) => {
                console.log(msg);
            }
        );
    },
)

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

