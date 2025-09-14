import React from "react";
import { useTranslation } from "react-i18next";

export default function RecycleCard({ img, title, muted, moreText }) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={`recycle-card rm-wrap ${open ? "open" : ""}`}>
      <div className="circle-img">
        <img src={img} alt="" />
      </div>

      <h3 className="rc-title">{title}</h3>
      <p className="rc-muted">{muted}</p>

      <div className="rm-more">
        <p>{moreText}</p>
      </div>

      <button
        type="button"
        className="btn"
        onClick={() => setOpen(v => !v)}
      >
        {open ? (t("recycle.readLess") || "Mai puțin")
              : (t("recycle.readMore") || "Citește mai mult")}
      </button>
    </div>
  );
}
