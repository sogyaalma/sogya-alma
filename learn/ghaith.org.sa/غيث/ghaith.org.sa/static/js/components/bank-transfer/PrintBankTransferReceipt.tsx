import ModalComponent from "../../bibilio/Modal/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../apis/store";
import PrimarButton from "../../bibilio/Buttons/PrimaryButton";
import { toPrintBankTransferReceipt } from "../../apis/actions/donation.actions";
import { setPrinting, setRatingVisible } from "../../apis/slices/ratingSlice";
import Lottie from "lottie-react";
import messageDonation from "../../assets/animations/Success.json";

interface Props {
  d?: string;
  s?: string;
}

const PrintBankTransferModal = ({ d, s }: Props) => {
  const loadinPrint = useSelector(
    (state: RootState) => state?.donation.loadingPrintBankReceipt,
  );
  const dispatch = useDispatch<AppDispatch>();
  const isPrint = useSelector((state: RootState) => state?.rating.print);
  const message = useSelector((state: RootState) => state?.rating.message);
  const accessToken = useSelector(
    (state: RootState) => state?.rating.accessTokenPrint,
  );



  const handlePrint = async () => {
    try {
      await dispatch(toPrintBankTransferReceipt(accessToken));
    } finally {
    }
  };

  const handleClose = () => {
    dispatch(setPrinting(false));
  };

  return (
    <ModalComponent
      title=""
      open={isPrint}
      onClose={handleClose}
      closeOnOutsideClick={false}
      width={520}
      centered={true}
      modalStyle={{ top: -200 }}
    >
      <div style={{ padding: "10px 20px", textAlign: "center" }}>
        {/* Success Animation */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1.5rem",
          }}
        >
          <Lottie
            animationData={messageDonation}
            loop={false}
            style={{ width: "130px", height: "130px" }}
          />
        </div>

        {/* Success Message Text */}
        <div style={{ marginBottom: "2rem" }}>
          <p
            style={{ fontSize: "18px", color: "#555", margin: 0 }}
            className="gh--font-light"
          >
            تم إرسال الطلب بنجاح برقم {message}
          </p>
        </div>

        {/* Buttons Container */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexDirection: "row",
          }}
        >
          {/* Cancel Button - Styled Gray */}
          <PrimarButton
            title={loadinPrint ? "جاري التحميل..." : "طباعة الإيصال"}
            onClick={handlePrint}
            disabled={loadinPrint}
            style={{
              width: "120px",
              height: "40px",
              backgroundColor: "#4f9d76",
              borderColor: "#4f9d76",
              direction: "rtl",
            }}
            loading={loadinPrint}
          />

          {/* Rate Service Button - Styled Green */}
          <PrimarButton
            onClick={() => dispatch(setRatingVisible(true))}
            title={"تقييم الخدمة"}
            style={{
              width: "120px",
              height: "40px",
              backgroundColor: "#4f9d76",
              borderColor: "#4f9d76",
            }}
          />
        </div>
      </div>
    </ModalComponent>
  );
};

export default PrintBankTransferModal;