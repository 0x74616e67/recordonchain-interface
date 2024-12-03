import { memo } from "react";
import { useTranslations } from "use-intl";

function CustomerService() {
  const t = useTranslations();

  return (
    <div className={`flex grid grid-cols-2 items-center gap-4`}>
      {/* <Label className="block text-sm font-medium leading-6 text-gray-900">
        {t("title")}
      </Label> */}
      <label>{t("Setting.customerService")}</label>
      <img src="/wechat.png" className="w-full" alt="wechat qrcode"></img>
    </div>
  );
}

export default memo(CustomerService);
