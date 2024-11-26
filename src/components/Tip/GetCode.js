import { memo } from "react";
import { useTranslations } from "use-intl";

function GetCode() {
  const t = useTranslations("Tip.verificationCode");

  return (
    <div className="max-h-full overflow-auto px-2 text-left text-sm text-gray-800">
      <div>
        <h3 className="text-base font-bold">{t("price.title")}</h3>
        <p>{t("price.p1")}</p>
        <ul className="ml-4 list-disc">
          {t.rich("price.li", {
            li: (chunks) => <li>{chunks}</li>,
          })}
        </ul>
        <p>{t("price.p2")}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-base font-bold">{t("approach.title")}</h3>
        <ul className="ml-4 list-disc">
          {t.rich("approach.li", {
            li: (chunks) => <li>{chunks}</li>,
            span: (chunks) => <span>{chunks}</span>,
            img: () => (
              <img
                src="/wechat.png"
                className="w-3/5"
                alt="wechat qrcode"
              ></img>
            ),
          })}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="text-base font-bold">{t("qa.title")}</h3>
        <ul className="ml-4 list-decimal">
          <li>
            <p>{t("qa.q1.q")}</p>
            <ul className="ml-4 list-disc">
              {t.rich("qa.q1.a", {
                li: (chunks) => <li>{chunks}</li>,
                b: (chunks) => <b>{chunks}</b>,
              })}
            </ul>
          </li>

          <li>
            <p>{t("qa.q2.q")}</p>
            <p>
              {t.rich("qa.q2.a", {
                b: (chunks) => <b>{chunks}</b>,
              })}
            </p>
          </li>

          <li>
            <p>{t("qa.q3.q")}</p>
            <p>
              {t.rich("qa.q3.a", {
                b: (chunks) => <b>{chunks}</b>,
              })}
            </p>
          </li>

          <li>
            <p>{t("qa.q4.q")}</p>
            <p>
              {t.rich("qa.q4.a", {
                b: (chunks) => <b>{chunks}</b>,
              })}
            </p>
          </li>

          <li>
            <p>{t("qa.q5.q")}</p>
            <p>
              {t.rich("qa.q5.a", {
                b: (chunks) => <b>{chunks}</b>,
              })}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default memo(GetCode);
