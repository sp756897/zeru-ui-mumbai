import { Skeleton, Typography } from "antd";
import React from "react";

const { Text } = Typography;

export default function Address({ address }) {

  if (!address) {
    return (
      <span>
        <Skeleton avatar paragraph={{ rows: 1 }} />
      </span>
    );
  }

  return (
    <span>
      <span style={{ fontSize: 28, color: "white" }}>
        <Text copyable={{ text: address }} style={{ color: "white" }}>
          {address}
        </Text>
      </span>
    </span>
  );
}
