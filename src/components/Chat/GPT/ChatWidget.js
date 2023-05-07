import React, { useEffect, useState } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";

import "react-chat-widget/lib/styles.css";
import chatApi from "../../../api/chatApi";
import logo from "../../../images/admin/avata.jpg";

function ChatWidget() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    addResponseMessage(
      `Chào mừng bạn đến với HFood shop! Hãy đặt câu hỏi cho tôi nhé!
      Ví dụ: Cách nấu canh bí đỏ. Hoặc công dụng của trái cà chua
      `
    );
  }, []);

  const handleNewUserMessage = (newMessage) => {
    setLoading(true);
    chatApi
      .chatGPT(newMessage)
      .then((res) => {
        if (res?.text) {
          addResponseMessage(res?.text);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="chat-widget_gpt">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={logo}
        title="Chat với AI"
        subtitle="Chat GPT - AI"
        senderPlaceHolder={
          loading
            ? "Đang xử lý. Xin chờ chút nhé!"
            : "Bạn muốn hỏi tôi điều gì không?"
        }
      />
    </div>
  );
}

export default ChatWidget;
