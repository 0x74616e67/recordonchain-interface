import { memo, useState } from "react";
import { useChainStore } from "@/utils/store";
import ChainComponent from "@/components/Chain";
import { useTranslations } from "use-intl";

function Chain() {
  const t = useTranslations();
  const chainStore = useChainStore((state) => ({
    chain: state.chain,
    setChain: state.setChain,
  }));

  const [value, setValue] = useState(chainStore.chain);

  const handleChange = (option) => {
    setValue(option.value);
    chainStore.setChain(option.value);
  };

  return (
    <div className={`flex grid grid-cols-2 items-center gap-4`}>
      {/* <Label className="block text-sm font-medium leading-6 text-gray-900">
        {t("title")}
      </Label> */}
      <label>{t("Setting.chain")}</label>
      <ChainComponent onChange={handleChange} value={value} />
    </div>
  );
}

export default memo(Chain);
