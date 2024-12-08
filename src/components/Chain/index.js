import { memo } from "react";
import { useTranslations } from "use-intl";
import Select from "@/components/Select";

function Chain({ value, onChange, className, all = false, trail = true }) {
  const t = useTranslations();

  let options = [
    {
      value: "conflux",
      label: t("Record.chain.conflux"),
    },
    {
      value: "ethereum",
      label: t("Record.chain.ethereum"),
    },
  ];

  if (all) {
    options.unshift({
      value: "",
      label: t("Record.chain.all"),
    });
  }

  if (trail) {
    options.push({
      value: "confluxevmtestnet",
      label: t("Record.chain.freetrail"),
    });
  }

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
