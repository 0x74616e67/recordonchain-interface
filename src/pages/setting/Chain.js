import { memo, useEffect, useMemo, useState } from "react";
import { useTranslations } from "use-intl";
import { useChainStore } from "@/utils/store";
import Select from "@/components/Select";

function Chain({}) {
  const t = useTranslations();
  const chainStore = useChainStore((state) => ({
    chain: state.chain,
    setChain: state.setChain,
  }));

  const options = [
    {
      value: "conflux",
      label: t("Record.chain.conflux"),
    },
    {
      value: "ethereum",
      label: t("Record.chain.ethereum"),
    },
    {
      value: "confluxevmtestnet",
      label: t("Record.chain.freetrail"),
    },
  ];

  const [value, setValue] = useState(
    options.find((o) => o.value === chainStore.chain)
  );

  const handleChange = (option) => {
    setValue(option);
    chainStore.setChain(option.value);
  };

  useEffect(() => {
    setValue(options.find((o) => o.value === chainStore.chain));
  }, [t]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 flex items-center">
        {/* <Label className="block text-sm font-medium leading-6 text-gray-900">
          {t("title")}
        </Label> */}
        <label>{t("Setting.chain")}</label>
        <Select
          options={options}
          value={value}
          onChange={handleChange}
          optionContainerClassName="right-0"
        ></Select>
      </div>
    </div>
  );
}

export default memo(Chain);
