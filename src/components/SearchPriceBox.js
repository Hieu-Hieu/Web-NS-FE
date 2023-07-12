import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const marks = {
  0: "0",
  200000: "200k",
  500000: "500k",
  2000000: {
    style: {
      color: "#f50",
    },
    label: <strong>2tr</strong>,
  },
  10000000: {
    style: {
      color: "#f50",
    },
    label: <strong>10tr</strong>,
  },
};

const styles = {
  height: "30px",
  width: "62px",
  backgroundColor: "#fcfcfc",
  border: "solid 1px #ccc",
  marginTop: "5px",
  borderRadius: 4,
};
const apply = {
  marginTop: "10px",
  padding: "5px",
  height: "30px",
  width: "100%",
  backgroundColor: "#024137",
  color: "#fff",
  display: "block",
  textAlign: "center",
  maxWidth: "140px",
  cursor: "pointer",
  borderRadius: 4,
};

const SearchPriceBox = ({ params, handleSearch }) => {
  const [min, setMin] = useState(0);
  const [max, setmax] = useState(0);

  const { t } = useTranslation();

  return (
    <div>
      <div className="catalog__filter__widget">
        <div className="catalog__filter__widget__title">{t("price_range")}</div>

        {/* <div>
          <Slider marks={marks} included={false} defaultValue={200000} />
        </div> */}
        <div style={{ width: "80%" }}>
          {/* <Row>
            <Col>
              <InputNumber min={0} />
            </Col>
            <span>
              <ArrowRightOutlined />
            </span>
            <Col>
              <InputNumber min={0} />
            </Col>
          </Row> */}
          <input
            style={styles}
            placeholder={t("from")}
            type="number"
            onChange={(e) => setMin(+e.target.value)}
          />
          <span style={{ fontSize: "20px", padding: "0 5px" }}>-</span>
          <input
            style={styles}
            placeholder={t("to")}
            type="number"
            onChange={(e) => setmax(+e.target.value)}
          />
          <div
            onClick={() => handleSearch({ ...params, min: min, max: max })}
            style={apply}
          >
            {t("apply")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPriceBox;
