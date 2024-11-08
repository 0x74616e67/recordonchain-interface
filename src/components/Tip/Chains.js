import { memo } from "react";
import { useTranslations } from "use-intl";

function Chains() {
  const t = useTranslations("Tip.chains");

  return (
    <div className="text-left text-sm px-2 max-h-full overflow-auto text-gray-800">
      <h1>{t("brief")}</h1>
      <div className="mt-4">
        <h3 className="text-base font-bold">{t("conflux.title")}</h3>
        <ul className="list-disc ml-4">
          {t.rich("conflux.li", {
            li: (chunks) => <li>{chunks}</li>,
            b: (chunks) => <b>{chunks}</b>,
          })}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="text-base font-bold">Ethereum：</h3>
        <ul className="list-disc ml-4">
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
