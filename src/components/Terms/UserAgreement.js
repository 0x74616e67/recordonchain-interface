import { memo } from "react";
import { useTranslations } from "use-intl";

function UserAgreement() {
  const t = useTranslations("Terms");
  return (
    <>
      <span>{t("UserAgreement.title")}</span>
      <pre className="break-words whitespace-break-spaces text-left text-xs">
        {t("UserAgreement.content")}
      </pre>
    </>
  );
}

export default memo(UserAgreement);
