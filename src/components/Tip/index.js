import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import Dialog from "../Dialog";
import { useCallback, useState } from "react";
import { useTranslations } from "use-intl";

export default function Tips({ children }) {
  const t = useTranslations("Common");
  const [open, setOpen] = useState(false);

  const handleIconClick = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const handleOk = useCallback(() => {
    setOpen(false);
  }, []);

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <span>
      <QuestionMarkCircleIcon
        className="size-5 align-text-top inline-block"
        onClick={handleIconClick}
      ></QuestionMarkCircleIcon>

      <Dialog
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButton={[]}
        okButton={[t("button.close")]}
        closeable={true}
      >
        {children}
      </Dialog>
    </span>
  );
}
