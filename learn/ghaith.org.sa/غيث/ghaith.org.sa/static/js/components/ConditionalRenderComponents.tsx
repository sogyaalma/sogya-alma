import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../apis/store";
import { useLocation, useNavigate } from "react-router-dom";
import DonateCard from "../bibilio/cards/DonateCard";
import GiftButton from "../bibilio/Buttons/giftButton";
import useIsMobile from "../bibilio/mobileVersion/useIsMobile";
import { GiftOutlined } from "@ant-design/icons";
import UmrahButton from "../bibilio/Buttons/umrahButton";
import kabahIcon from "../assets/icons/umra.png";
import RamadanButton from "../bibilio/Buttons/ramadanButton";
import { getRamadamanSetting } from "../apis/actions/ramadan.actions";
import crescentImage from "../assets/icons/ramadan.svg";
import { useCookies } from "react-cookie";
import Login from "../domains/pages/auth/Login";
const ConditionalRenderComponents = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [display, setDisplay] = useState<boolean>(false);
  const ShowRamadan = useSelector(
    (state: RootState) => state?.ramadan?.ShowRamadan,
  );
  const isMobile = useIsMobile();
  const [cookies] = useCookies(["apiKey", "role"]);
  const isConnected = cookies?.apiKey ?? false;
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    dispatch(getRamadamanSetting());
  }, [dispatch]);

  const shareIds = [
    { id: 1, name: "10 ر.س", amount: 10, open_share: true },
    { id: 2, name: "50 ر.س", amount: 50, open_share: true },
    { id: 3, name: "100 ر.س", amount: 100, open_share: true },
  ];

  const hideOnPaths = ["/profile", "/gift", "/umrah"];

  const location = useLocation();

  useEffect(() => {
    let check = true;
    hideOnPaths.map((el) => {
      if (location.pathname.includes(el)) {
        check = false;
      }
    });
    setDisplay(check);
  }, [location]);

  return (
    <>
      {display && (
        <>
          <DonateCard variant="donation" tags={shareIds} />
          <GiftButton
            onClick={() => navigate("/gift")}
            title={isMobile ? "" : "أهدي من تحب"}
            icon={
              isMobile ? <GiftOutlined width={32} height={32} /> : undefined
            }
          />{" "}
          <UmrahButton
            onClick={() => isConnected ? navigate("/umrah") : setShowLogin(true) }
            title={isMobile ? "" : "عمرة البدل"}
            icon={
              isMobile ? (
                <img
                  src={kabahIcon}
                  alt="Umrah"
                  width={34}
                  height={34}
                  style={{ marginTop: "6px" }}
                />
              ) : undefined
            }
          />{" "}
          {ShowRamadan && (
            <RamadanButton
              onClick={() => navigate("/ramadan_meals")}
              title={isMobile ? "" : "إفطار صائم"}
              icon={
                isMobile ? (
                  <img
                    src={crescentImage}
                    alt="Crescent"
                    width={34}
                    height={34}
                    style={{ marginTop: "6px" }}
                  />
                ) : undefined
              }
            />
          )}
        </>
      )}{" "}
      <Login
        open={showLogin}
        handleClose={() => setShowLogin(false)}
        login_type="exterior_donor"
      />
    </>
  );
};

export default ConditionalRenderComponents;
