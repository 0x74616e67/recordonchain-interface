import { memo } from "react";
import { useTranslations } from "use-intl";
import Select from "@/components/Select";

function Chain({ value, onChange, className }) {
  const t = useTranslations();

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

  const v = options.find((o) => o.value === value) || options[0];

  return (
    <Select
      options={options}
      value={v}
      onChange={onChange}
      optionContainerClassName="right-0"
      className={className}
    ></Select>
  );
}

export default memo(Chain);
