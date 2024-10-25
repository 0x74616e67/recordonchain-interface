import { memo, useState } from "react";
import { useTranslations } from "use-intl";
import { useLocaleStore } from "@/utils/store";
import Select from "@/components/Select";

const options = [
  {
    value: "zh",
    label: "中文",
  },
  {
    value: "en",
    label: "English",
  },
];

function Locale({}) {
  const t = useTranslations();
  const localeStore = useLocaleStore((state) => ({
    locale: state.locale,
    setLocale: state.setLocale,
  }));

  const [value, setValue] = useState(
    options.find((o) => o.value === localeStore.locale)
  );

  const handleChange = (option) => {
    setValue(option);
    localeStore.setLocale(option.value);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 flex items-center">
        {/* <Label className="block text-sm font-medium leading-6 text-gray-900">
          {t("title")}
        </Label> */}
        <label>{t("Setting.locale")}</label>
        <Select
          options={options}
          value={value}
          onChange={handleChange}
        ></Select>
      </div>
    </div>
  );
}

export default memo(Locale);
