import React, { useState, useEffect } from "react";
import { Alert, Space } from "antd";

const InternetConnectionAlert = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        {" "}
        <Alert
          message="Internet"
          description="No internet Connection"
          type="error"
          showIcon
        />
      </Space>
    );
  }

  return null;
};

export default InternetConnectionAlert;
