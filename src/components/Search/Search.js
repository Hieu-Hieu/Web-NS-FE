import React, { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./index.scss";
import { useTranslation } from "react-i18next";

export const Search = forwardRef((props, searchMobileRef) => {
  let navigate = useNavigate();
  const { t } = useTranslation();
  const [text, setText] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    finalTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ clearTranscriptOnListen: true });

  function filterSensitiveText(text) {
    const sensitiveWords = ["sex", "ass", "fuck"];
    const regex = new RegExp(sensitiveWords.join("|"), "gi");
    return text.replace(regex, "");
  }

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
    console.log(transcript);
    setText(filterSensitiveText(transcript));
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
      navigate("/catalog");
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
          placeholder={t("search")}
          onChange={(e) => setText(e.target.value)}
          autoFocus
          onBlur={props.hanldeOnblur}
          value={text}
        />

        <span className="microphone" onClick={handleListening}>
          <button className={`btn ${listening ? "active" : ""}`}>
            {listening ? (
              <i className="bx bxs-microphone"></i>
            ) : (
              <i class="bx bx-microphone-off"></i>
            )}
          </button>
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
