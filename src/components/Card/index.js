import { memo, useCallback } from "react";
import { formatTimestamp } from "@/utils";
import { useTxStore } from "@/utils/store";
import { useRouter } from "next/router";
import { useTranslations } from "use-intl";

const Card = memo(function Card({
  tx = {
    hash: "",
    chain: "",
    message: "",
    timestamp: 0,
  },
  className,
  disabled,
  ...others
}) {
  const router = useRouter();
  const txStore = useTxStore((state) => ({ tx: state.tx, add: state.add }));
  const t = useTranslations("Detail");
  const tCommon = useTranslations("Common");

  const handleCardClick = useCallback(() => {
    if (!disabled) {
      txStore.add(tx);
      router.push({
        pathname: `/record/detail`,
        query: {
          tx: `${tx.chain}.${tx.hash}`,
        },
      });
    }
  }, []);

  return (
    <div
      className={`bg-gray2/10 mb-4 rounded p-4 ${className}`}
      key={tx.hash}
      onClick={handleCardClick}
      {...others}
    >
      {tx.hash ? (
        <>
          <div className="text-wrap break-words">{tx.message}</div>
          <div className="mt-4 text-right text-sm text-gray-900/60">
            {formatTimestamp(tx.timestamp)}
          </div>
          <div className="text-right text-sm text-gray-900/60">
            <span>{tCommon("recordOn")} </span>
            {tx.chain.charAt(0).toUpperCase() + tx.chain.slice(1)}
          </div>
        </>
      ) : (
        <div className="text-gray2/40">{t("noContent")}</div>
      )}
    </div>
  );
});

export default Card;
