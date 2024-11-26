import Dialog from "@/components/Dialog";
import UserAgreement from "./UserAgreement";
import PrivacyPolicy from "./PrivacyPolicy";
import Disclaimer from "./Disclaimer";
import { memo, useCallback, useState } from "react";
import { useTranslations } from "use-intl";
import { useTermsStore } from "@/utils/store";

function Terms({ open = false, onOk = () => {}, onCancel = () => {} }) {
  const t = useTranslations("Terms");
  const [checked, setChecked] = useState(false);
  const termsStore = useTermsStore((state) => ({
    acceptance: state.acceptance,
    setAcceptance: state.setAcceptance,
  }));

  const handleChange = useCallback((e) => {
    setChecked(e.target.checked);
  }, []);

  const handleOk = useCallback(async () => {
    if (checked) {
      await termsStore.setAcceptance("true");
    } else {
      await termsStore.setAcceptance("false");
    }

    onOk();
  }, [checked, onOk]);

  return (
    <Dialog
      title=""
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      okButton={[t("Dialog.ok")]}
      cancelButton={[t("Dialog.cancel")]}
    >
      <div className="overflow-auto">
        <UserAgreement></UserAgreement>
        <Disclaimer></Disclaimer>
        <PrivacyPolicy></PrivacyPolicy>
      </div>
      <div className="relative -mb-2 ml-1 mt-2 flex flex-none gap-x-3">
        <div className="flex h-6 items-center">
          <input
            id="comments"
            name="comments"
            type="checkbox"
            className="h-3 w-3 rounded border-gray-300 text-blue-600 hover:text-blue-500 focus:ring-blue-600"
            onChange={handleChange}
          />
        </div>
        <div className="text-sm/6">
          <label
            htmlFor="comments"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {t("Dialog.checkbox")}
          </label>
        </div>
      </div>
    </Dialog>
  );
}

export default memo(Terms);
