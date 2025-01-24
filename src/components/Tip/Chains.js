import { memo } from "react";
import { useTranslations } from "use-intl";

function Chains() {
  const t = useTranslations("Tip.chains");

  return (
    <div className="max-h-full overflow-auto px-2 text-left text-sm text-gray-800">
      <h1>{t("brief")}</h1>
      <div className="mt-4">
        <h3 className="text-base font-bold">{t("ethereum.title")}</h3>
        <ul className="ml-4 list-disc">
          {t.rich("ethereum.li", {
            li: (chunks) => <li>{chunks}</li>,
            b: (chunks) => <b>{chunks}</b>,
          })}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="text-base font-bold">{t("conflux.title")}</h3>
        <ul className="ml-4 list-disc">
          {t.rich("conflux.li", {
            li: (chunks) => <li>{chunks}</li>,
            b: (chunks) => <b>{chunks}</b>,
          })}
        </ul>
      </div>
    </div>
  );
}

export default memo(Chains);
