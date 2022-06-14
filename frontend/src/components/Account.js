import { Button } from "antd";
import React from "react";

export default function Account({
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
}) {

  let accountButtonInfo;
  if (web3Modal?.cachedProvider) {
    accountButtonInfo = { name: 'Logout', action: logoutOfWeb3Modal };
  } else {
    accountButtonInfo = { name: 'Connect', action: loadWeb3Modal };
  }


  return (
    <div style={{ display: "flex" }}>
      {web3Modal && (
        <Button
          style={{ marginLeft: 8 }}
          shape="round"
          onClick={accountButtonInfo.action}
        >
          {accountButtonInfo.name}
        </Button>
      )}
    </div>
  );
}
