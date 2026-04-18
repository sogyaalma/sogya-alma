import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../apis/store";
import { useCookies } from "react-cookie";
import ModalComponent from "../../bibilio/Modal/ModalComponent";
import DotsLoader from "../../bibilio/loader/DotsLoader";
import { getKeys, getKeysByState } from "../../apis/actions/moyassar.actions";
import {
  getBeneficiaryDetails,
  getDonorDetails,
} from "../../apis/actions/profile.actions";

interface MoyasarProps {
  amount: number;
  description?: string;
  open: boolean;
  handleClose: () => void;
  moyassarType: "by_state" | "general";
  moyassarState: any;
}

const MoyasarForm = ({
  amount,
  description,
  open,
  handleClose,
  moyassarType,
  moyassarState,
}: MoyasarProps) => {
  const moyasar = useSelector((state: RootState) => state?.moyassar);
  const donor = useSelector((state: RootState) => state?.profile?.DonorDetails);
  const [cookies] = useCookies(["apiKey", "role"]);
  const role = cookies?.role;
  const dispatch = useDispatch<AppDispatch>();

  const donorDetails = useSelector(
    (state: RootState) => state?.profile?.DonorDetails,
  );
  const beneficiaryDetails = useSelector(
    (state: RootState) => state?.profile?.BeneficiaryDetails,
  );

  useEffect(() => {
    if (cookies.apiKey)
      role === "donor"
        ? dispatch(getDonorDetails())
        : dispatch(getBeneficiaryDetails());
  }, [dispatch, cookies.apiKey, role]);

  const userName = role
    ? role === "donor"
      ? donorDetails?.name
      : beneficiaryDetails?.name
    : "";
  const userPhone = role
    ? role === "donor"
      ? donorDetails?.mobile
      : beneficiaryDetails?.mobile
    : "";
  const userEmail = role
    ? role === "donor"
      ? donorDetails?.email
      : beneficiaryDetails?.email
    : "";
  const moyasarRef = useRef(null);
  const [key, setKey] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    if (moyassarType === "by_state") {
      getKeysByState({ state_id: moyassarState }).then((res: any) => {
        setKey(res?.result.default_publishable_api_key);
      });
    } else {
      getKeys().then((res: any) => {
        setKey(res.default_publishable_api_key);
      });
    }
  }, []);

  const buildMetadata = () => {
    const metadata: Record<string, any> = {};

    // Mobile
    let mobile: string = "";
    if (moyasar.mobile && moyasar.mobile !== "") {
      mobile = moyasar.mobile;
    } else if (donor && donor?.mobile) {
      mobile = donor?.mobile;
    }

    if (mobile) metadata.mobile = mobile;

    // Donation type
    if (moyasar.donation_type_name) {
      metadata.donation_type_name = moyasar.donation_type_name;
    }
    if (moyasar.donation_type) {
      metadata.donation_type = moyasar.donation_type;
    }
    if (moyasar.share_quantity && !metadata.share_quantity) {
      metadata.share_quantity = moyasar.share_quantity;
    }
    if (moyasar.share_id) {
      metadata.share_id = moyasar.share_id;
    }
    if (moyasar.share_quantity && !metadata.share_quantity) {
      metadata.share_quantity = moyasar.share_quantity;
    }
    // Type
    if (moyasar.type) metadata.type = moyasar.type;
    // Program
    if (moyasar.program_id) {
      metadata.program_id = moyasar.program_id;
    }
    if (moyasar.beneficiary_request_id) {
      metadata.beneficiary_request_id = moyasar.beneficiary_request_id;
    }
    if (moyasar.umrahLines && moyasar.umrahLines.length > 0) {
      const filteredUmrahLines = moyasar.umrahLines.map((line: any) => {
        const { beneficiary_name_voice_recording_ids, ...rest } = line;
        return rest;
      });
      metadata.umrah_lines = JSON.stringify(filteredUmrahLines);
    }
    if (moyasar.umrah_id) {
      metadata.umrah_id = moyasar.umrah_id;
    }
    if (donor && donor.id) {
      metadata.partner_id = donor.id;
    }

    // ramadan properties
    if (moyasar.ramadan_lines && moyasar.ramadan_lines.length > 0) {
      metadata.ramadan_lines = JSON.stringify(moyasar.ramadan_lines);
    }
    // Gift properties
    const gift = moyasar.gift;
    if (gift) {
      if (gift.sender_name) metadata.sender_name = gift.sender_name;
      if (gift.card_type_id) metadata.card_type_id = gift.card_type_id;
      if (gift.name) metadata.name = gift.name;
      if (gift.mobile_number) metadata.mobile_number = gift.mobile_number;
      if (gift.send_copy_to_sender !== undefined)
        metadata.send_copy_to_sender = gift.send_copy_to_sender;
      if (gift.show_name_in_dedication !== undefined)
        metadata.show_name_in_dedication = gift.show_name_in_dedication;
      if (gift.show_amount !== undefined)
        metadata.show_amount = gift.show_amount;
      if (gift.send_gift !== undefined) metadata.send_gift = gift.send_gift;
    }

    // Arrays - only include if not empty

    metadata.ghaith_website = true;

    return metadata;
  };
  useEffect(() => {
    const initMoyasar = () => {
      if (moyasarRef.current && window.Moyasar && key) {
        let callbackUrl = `${window.location.origin}/?`;

        if (moyasar.donation_type_name) {
          callbackUrl += `donation_type_name=${encodeURIComponent(moyasar.donation_type_name)}&`;
        }

        // Add other parameters
        callbackUrl += `amountPaid=${amount}&`;
        callbackUrl += `openModal=true&`;
        callbackUrl += `user_name=${encodeURIComponent(userName || "")}&`;
        callbackUrl += `user_email=${encodeURIComponent(userEmail || "")}&`;
        callbackUrl += `user_phone=${encodeURIComponent(userPhone || "")}`;

        window.Moyasar.init({
          element: moyasarRef.current,
          amount: amount * 100,
          currency: "SAR",
          fee_format: "1.17 SAR",
          description: description ?? "",
          publishable_api_key: key,
          callback_url: callbackUrl,
          methods: ["creditcard", "applepay"],
          apple_pay: {
            country: "SA",
            label: "Ghaith_Website",
            validate_merchant_url:
              "https://api.moyasar.com/v1/applepay/initiate",
          },
          language: "ar",
          metadata: buildMetadata(),
          credit_card: {
            save_card: false,
          },
        });
        setIsLoading(false);
      }
    };

    initMoyasar();
  }, [
    moyasarRef,
    key,
    window.Moyasar,
    open,
    amount,
    userName,
    userEmail,
    userPhone,
    moyasar.donation_type_name,
  ]);
  return (
    <ModalComponent
      title=""
      open={open}
      onClose={handleClose}
      closeOnOutsideClick={true}
    >
      {isLoading && (
        <div
          className="ghaith--loading-projects-cases"
          style={{ minHeight: "20vh" }}
        >
          <p className="ghaith--no-project-message"> جارٍ التحميل</p>
          <DotsLoader />
        </div>
      )}
      <div ref={moyasarRef} style={{ direction: "rtl" }} />
    </ModalComponent>
  );
};

export default MoyasarForm;
