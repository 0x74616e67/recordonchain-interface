import { memo } from "react";
import { useTranslations } from "use-intl";

function Disclaimer() {
  const t = useTranslations("Terms");
  return (
    <>
      <span>{t("Disclaimer.title")}</span>
      <pre className="break-words whitespace-break-spaces text-left text-xs">
        {t("Disclaimer.content")}
      </pre>
    </>
  );
}

export default memo(Disclaimer);
