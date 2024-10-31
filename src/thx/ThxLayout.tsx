import { Typography } from "@alfalab/core-components/typography";
import { ButtonMobile } from "@alfalab/core-components/button/mobile";
import rocket from "../assets/rocket.png";
import { thxSt } from "./style.css";
import { appSt } from "../style.css.ts";

export const ThxLayout = () => {
  return (
    <>
      <div className={thxSt.container}>
        <img
          alt="Картинка ракеты"
          src={rocket}
          width={135}
          className={thxSt.rocket}
        />
        <Typography.TitleResponsive
          font="system"
          tag="h1"
          view="large"
          defaultMargins
          weight="bold"
        >
          Только тссс
        </Typography.TitleResponsive>
        <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
          Вы поучаствовали в очень важном исследовании, которое поможет создать
          персональный тариф для молодежи. Вы – наш герой!
        </Typography.Text>
      </div>

      <div className={appSt.bottomBtn}>
        <ButtonMobile
          block
          view="primary"
          href="alfabank://multistep-route?fromModule=FORM&alias=alfa-subscription-alias&version=2"
        >
          Хорошо
        </ButtonMobile>
      </div>
    </>
  );
};
