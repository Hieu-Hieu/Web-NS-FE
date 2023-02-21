import React, { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./index.scss";

export const Search = forwardRef((props, searchMobileRef) => {
  let navigate = useNavigate();
  const [text, setText] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    finalTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ clearTranscriptOnListen: true });

  console.log(transcript);

  const handleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({
        language: "vi-VN",
      });
    }
  };

  useEffect(() => {
    setText(transcript);
  }, [transcript]);

  useEffect(() => {
    if (finalTranscript) {
      handleSubmit();
    }
  }, [finalTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (text.trim()) {
      navigate(`/catalog?name=${text}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form
      className="simple-search"
      onSubmit={handleSubmit}
      ref={searchMobileRef}
    >
      <span className="input_search_wrapper">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          required
          onChange={(e) => setText(e.target.value)}
          autoFocus
          onBlur={props.hanldeOnblur}
          value={text}
        />
        <span className="microphone" onClick={handleListening}>
          <i className="bx bxs-microphone"></i>
        </span>
      </span>

      <div className="search-action">
        <button type="submit">
          <i className="bx bx-search"></i>
        </button>
      </div>
    </form>
  );
});
