import { memo } from "react";
import { useTranslations } from "use-intl";

function Disclaimer() {
  const t = useTranslations("Terms");
  return (
    <>
      <span>{t("Disclaimer.title")}</span>
      <pre className="whitespace-break-spaces break-words text-left text-xs">
        {t("Disclaimer.content")}
      </pre>
    </>
  );
}

export default memo(Disclaimer);
