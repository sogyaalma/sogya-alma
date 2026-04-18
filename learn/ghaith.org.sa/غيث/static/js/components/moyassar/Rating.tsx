import { Col, Divider, Input, Row } from "antd";
import rating from "../../assets/icons/smiles/good-feedback.png";
import bad from "../../assets/icons/smiles/bad.svg";
import notbad from "../../assets/icons/smiles/happy.svg";
import good from "../../assets/icons/smiles/emotion.svg";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../apis/store";
import { setRatingVisible } from "../../apis/slices/ratingSlice";
import RequestButton from "../../bibilio/Buttons/RequestButton";
import ModalComponent from "../../bibilio/Modal/ModalComponent";
import { toAddRating } from "../../apis/actions/moyassar.actions";
import { showNotification } from "../../apis/utils/utils";

interface Props {
  res_id: number;
  isOpe: boolean;
  setIsOpen: (open: boolean) => void;
}
const Rating = ({ res_id, isOpe, setIsOpen }: Props) => {
  const { TextArea } = Input;
  const [cookies] = useCookies(["role"]);

  const role = cookies?.role;
  const dispatch = useDispatch<AppDispatch>();

  const isOpen = useSelector((state: RootState) => state?.rating?.isOpen);
  const res_model = useSelector((state: RootState) => state?.rating?.res_model);
  const res_ids = useSelector((state: RootState) => state?.rating?.res_ids);
  const rated_partner_id = useSelector(
    (state: RootState) => state?.rating?.rated_partner_id,
  );
  const beneficiaryDetails = useSelector(
    (state: RootState) => state?.profile?.BeneficiaryDetails,
  );
  const donor = useSelector((state: RootState) => state?.profile?.DonorDetails);

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [activeItem, setActiveItem] = useState<number>(-1);
  const [reason, setReason] = useState<string>("");

  useEffect(() => {
    setIsButtonDisabled(
      activeItem === -1 || (activeItem === 1 && reason === ""),
    );
  }, [activeItem, reason]);
  const addRating = async () => {
    const json: any = {
      rating: activeItem,
      res_model: res_model,
      res_ids: res_ids,
    };
    if (activeItem === 1) json.feedback = reason;
    if (role)
      json.rated_partner_id = rated_partner_id
        ? rated_partner_id
        : role === "beneficiary"
          ? beneficiaryDetails?.id
          : donor?.id;

    const res = await toAddRating(json);
    if (res.result?.code === 200) {
      setReason("");
      setActiveItem(-1);
      dispatch(setRatingVisible(false));
      setIsOpen(false);
      showNotification(res.result?.message, "success");
    } else {
      showNotification(res.result?.failure, "error");
    }
  };
  return (
    <ModalComponent
      open={isOpen}
      title=""
      showCloseIcon={true}
      onClose={() => dispatch(setRatingVisible(false))}
      closeOnOutsideClick
    >
      <div
        className="ghaith--share-cases-container"
        style={{ marginTop: "0.5rem" }}
      >
        <div className="ghaith--share-cases-title-grand">
          <img width={40} src={rating} alt="ghaith" />
          <span> تقييم الخدمة</span>
        </div>
      </div>

      <Divider className="ghaith--divider-method-payment" />

      <Row dir="rtl">
        <Col
          className="ghaith--rating-item"
          span={8}
          onClick={() => setActiveItem(5)}
          style={{
            backgroundColor: activeItem === 5 ? "#f0f0f0" : "transparent",
          }}
        >
          <div>
            <img width={80} src={good} alt="" />
          </div>
          <p className="ghaith--rating-good">راضي تماماً</p>
        </Col>
        <Col
          className="ghaith--rating-item"
          span={8}
          onClick={() => setActiveItem(3)}
          style={{
            backgroundColor: activeItem === 3 ? "#f0f0f0" : "transparent",
          }}
        >
          <div>
            <img width={80} src={notbad} alt="" />
          </div>
          <p className="ghaith--rating-notbad">راضي نوعاً ما</p>
        </Col>
        <Col
          className="ghaith--rating-item"
          span={8}
          onClick={() => setActiveItem(1)}
          style={{
            backgroundColor: activeItem === 1 ? "#f0f0f0" : "transparent",
          }}
        >
          <div>
            <img width={80} src={bad} alt="" />
          </div>
          <p className="ghaith--rating-bad">غير راضي</p>
        </Col>
      </Row>
      {activeItem === 1 && (
        <div
          dir="rtl"
          style={{ padding: "1rem", marginTop: "1rem", width: "100%" }}
        >
          <p className="ghaith--rating-label">سبب عدم الرضا</p>
          <TextArea
            className="ghaith--textarea-input"
            rows={4}
            placeholder="فضلاً اكتب سبب عدم رضاك عن الخدمة"
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
      )}
      <RequestButton
        style={{ marginTop: "2rem" }}
        className={`${
          isButtonDisabled ? "ghaith--inactive" : "ghaith--btn-color"
        }`}
        title="إرسال "
        disabled={isButtonDisabled}
        onClick={addRating}
      />
    </ModalComponent>
  );
};

export default Rating;
