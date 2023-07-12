import { Button, Dropdown, Select } from "antd";
import GlobalOutlined from "@ant-design/icons";
import React from "react";
import { useEffect } from "react";
import ViFlagIcon from "../../images/vi-flag.png";
import EnFlagIcon from "../../images/en-flag.png";
import "./LanguageSelector.css";

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item
      </a>
    ),
  },
];

const LanguageSelector1 = () => {
  const [lang, setLang] = React.useState(() => {
    return localStorage.getItem("locale") || "vi";
  });

  const handleChange = (value) => {
    if (lang) {
      setLang(lang);
      localStorage.setItem("locale", lang);
      window.location.reload();
    }
  };

  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomLeft"
        arrow
      >
        <Button>
          <GlobalOutlined />
        </Button>
      </Dropdown>
    </>
  );
};
// export default LanguageSelector1;

const LanguageSelector = () => {
  const [lang, setLang] = React.useState(() => {
    return localStorage.getItem("locale") || "vi";
  });

  const handleChange = (value) => {
    const newLang = value?.key;
    if (newLang) {
      setLang(newLang);
      localStorage.setItem("locale", newLang);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (!lang) {
      localStorage.setItem("locale", "vi");
    }
  }, []);

  return (
    <Select
      className="language_selector"
      labelInValue
      showSearch={false}
      defaultValue={{
        value: lang,
        label:
          lang === "vi" ? (
            <img src={ViFlagIcon} alt="Tiếng Việt" />
          ) : (
            <img src={EnFlagIcon} alt="English" />
          ),
      }}
      showArrow={false}
      style={{
        marginLeft: 10,
        // minWidth: 100,
      }}
      onChange={handleChange}
      options={[
        {
          value: "vi",
          label: <img src={ViFlagIcon} alt="Tiếng Việt" />,
        },
        {
          value: "en",
          label: <img src={EnFlagIcon} alt="English" />,
        },
      ]}
    />
  );
};

export default LanguageSelector;
