import React, { useEffect, useState } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";

import chatApi from "../../../api/chatApi";
import "react-chat-widget/lib/styles.css";
import "./ChatWidget.css";

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
    if (loading) return;
    setLoading(true);
    chatApi
      .chatGPT(newMessage)
      .then((res) => {
        if (res?.text) {
          addResponseMessage(res?.text);
          addResponseMessage(
            "Lưu ý: Câu trả lời trên chỉ mang tính chất tham khảo và có thể không hoàn toàn chính xác"
          );
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
        profileAvatar={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png"
        }
        title="Chat với AI"
        subtitle="Chat GPT - AI"
        senderPlaceHolder={
          loading
            ? "Tôi đang xử lý. Xin chờ chút nhé!"
            : "Hãy viết câu hỏi của bạn vào đây nhé!"
        }
        emojis={false}
        showBadge={true}
      />
    </div>
  );
}

export default ChatWidget;
