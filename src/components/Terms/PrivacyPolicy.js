import { memo } from "react";
import { useTranslations } from "use-intl";

function PrivacyPolicy() {
  const t = useTranslations("Terms");
  return (
    <>
      <span>{t("PrivacyPolicy.title")}</span>
      <pre className="whitespace-break-spaces break-words text-left text-xs">
        {t("PrivacyPolicy.content")}
      </pre>
    </>
  );
}

export default memo(PrivacyPolicy);
