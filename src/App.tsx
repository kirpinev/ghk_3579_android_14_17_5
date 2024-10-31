import { ButtonMobile } from "@alfalab/core-components/button/mobile";

import { Typography } from "@alfalab/core-components/typography";
import React, { useState } from "react";
import smart from "./assets/smart.png";
import smile from "./assets/smile.png";
import drums from "./assets/drums.png";
import smileArrow from "./assets/smile-arrow.png";
import cashback from "./assets/cashback.png";
import percent from "./assets/percent.png";
import free from "./assets/free.png";
import transfer from "./assets/transfer.png";
import cash from "./assets/cash.png";
import films from "./assets/films.png";
import music from "./assets/music.png";
import mobile from "./assets/mobile.png";
import { LS, LSKeys } from "./ls";
import { appSt } from "./style.css";
import { ThxLayout } from "./thx/ThxLayout";
import { Gap } from "@alfalab/core-components/gap";
import { Plate } from "@alfalab/core-components/plate";
import { StatusBadge } from "@alfalab/core-components/status-badge";
import { sendDataToGA } from "./utils/events.ts";

interface Product {
  title: string;
  text: string;
  image: string;
  name: string;
  value: number;
}

interface Categories {
  title: string;
  products: Array<Product>;
}

const categories: Array<Categories> = [
  {
    title: "Кэшбэк",
    products: [
      {
        title: "+1 топовая категория кэшбэка",
        text: "5% на самое популярное",
        image: smileArrow,
        name: "one_cashback",
        value: 1,
      },
      {
        title: "+1 попытка крутить барабан суперкэшбэка",
        text: "Выше шанс выиграть до 100% в случайной категории",
        image: drums,
        name: "one_baraban",
        value: 1,
      },
      {
        title: "Увеличенный лимит кэшбэка",
        text: "7000 ₽ в месяц вместо 5000 ₽ за покупки в категориях",
        image: cashback,
        name: "limit_cashback",
        value: 1,
      },
    ],
  },
  {
    title: "Сервисы",
    products: [
      {
        title: "Бесплатные уведомления",
        text: "Пуши и смс об операциях по всем дебетовым картам",
        image: free,
        name: "free_pushes",
        value: 1,
      },
      {
        title: "Бесплатные переводы",
        text: "По России без ограничений по сумме",
        image: transfer,
        name: "free_transfer",
        value: 1,
      },
      {
        title: "Бесплатное снятие наличных",
        text: "В банкоматах любых банков России",
        image: cash,
        name: "free_cash",
        value: 1,
      },
    ],
  },
  {
    title: "Накопления",
    products: [
      {
        title: "+1% годовых",
        text: "По накопительному Альфа-Счёту на ежедневный остаток",
        image: percent,
        name: "alfa_schet",
        value: 1,
      },
    ],
  },
  {
    title: "Развлечения",
    products: [
      {
        title: "Подписка на онлайн-кинотеатр",
        text: "Фильмы и сериалы в отличном качестве",
        image: films,
        name: "online_kino",
        value: 1,
      },
      {
        title: "Подписка на музыку",
        text: "Миллионы треков и тысячи подкастов",
        image: music,
        name: "sub_music",
        value: 1,
      },
      {
        title: "Интернет и мобильная связь",
        text: "Специальный тариф для молодых и свободных",
        image: mobile,
        name: "internet",
        value: 1,
      },
    ],
  },
];

const preSelectedProducts: Product[] = [
  ...categories.reduce(
    (acc: Product[], curr) => [...acc, ...curr.products],
    [],
  ),
];

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [selectedProducts, setSelectedProducts] =
    useState<Product[]>(preSelectedProducts);
  const numberOfProductsToDelete = 5;

  const findProduct = (product: Product) => {
    return selectedProducts.find((option) => option.title === product.title);
  };

  const selectProducts = (product: Product) => {
    const find = findProduct(product);
    const filteredProducts = selectedProducts.filter(
      (p) => p.title !== product.title,
    );

    if (filteredProducts.length >= 5) {
      if (find) {
        product.value = 0;
        setSelectedProducts(filteredProducts);
      } else {
        product.value = 1;
        setSelectedProducts([...selectedProducts, product]);
      }
    }
  };

  const submit = () => {
    const products: Record<string, number> = {};

    selectedProducts.forEach((product) => {
      products[product.name] = product.value;
    });

    categories.forEach((category) => {
      category.products.forEach((product) => {
        if (products[product.name] === undefined) {
          products[product.name] = product.value;
        }
      });
    });

    setLoading(true);
    sendDataToGA({ ...products }).then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      setThx(true);
      setLoading(false);
    });
  };

  const optionText = (count: number) => {
    switch (count) {
      case 1:
        return ["опцию"];
      case 2:
      case 3:
      case 4:
        return ["опции"];
      case 5:
        return ["опций"];
    }
  };

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <div className={appSt.box}>
          <img src={smart} alt="Картинка Альфа-Смарт" />
          <Typography.TitleResponsive
            tag="h1"
            view="medium"
            font="system"
            weight="bold"
          >
            Альфа-Смарт
          </Typography.TitleResponsive>
          <Typography.Text view="primary-medium" color="secondary">
            Стоимость — 299 руб/мес
          </Typography.Text>
        </div>

        <div className={appSt.subscription}>
          <img src={smile} alt="" width={24} height={24} />
          <Typography.Text
            view="primary-medium"
            className={appSt.subscriptionText}
          >
            Подписка стоит 299 ₽, если тратите с карты 20 000 ₽ в месяц. Если
            тратите меньше — 399 ₽
          </Typography.Text>
        </div>

        <Gap size={8} />

        <Plate
          view={selectedProducts.length > 5 ? "attention" : "positive"}
          title={
            selectedProducts.length > 5
              ? `Чтобы подключить подписку, удалите ${Math.abs(numberOfProductsToDelete - selectedProducts.length)} 
            ${optionText(Math.abs(numberOfProductsToDelete - selectedProducts.length))?.[0]} из предложенных`
              : "Лишние опции удалены"
          }
          leftAddons={
            <StatusBadge
              view={
                selectedProducts.length > 5
                  ? "attention-alert"
                  : "positive-checkmark"
              }
            />
          }
        />

        <div className={appSt.products}>
          {categories.map((category) => (
            <React.Fragment key={category.title}>
              <Gap size={8} />
              <Typography.TitleResponsive
                font="system"
                tag="h2"
                weight="bold"
                view="small"
                className={appSt.productsTitle}
              >
                {category.title}
              </Typography.TitleResponsive>
              {category.products.map((product) => (
                <div
                  className={appSt.product}
                  key={product.title}
                  onClick={() => {
                    selectProducts(product);
                  }}
                  style={{
                    ...(findProduct(product)
                      ? {
                          border: "2px solid #0cc44d",
                        }
                      : { border: "2px solid #F2F3F5", opacity: "0.5" }),
                  }}
                >
                  {findProduct(product) && (
                    <StatusBadge
                      view={"positive-checkmark"}
                      size={24}
                      className={appSt.statusBadge}
                    />
                  )}
                  <div>
                    <Typography.TitleResponsive
                      font="system"
                      view="small"
                      weight="bold"
                      tag="h3"
                      className={appSt.productTitle}
                    >
                      {product.title}
                    </Typography.TitleResponsive>

                    <Typography.Text
                      view="secondary-large"
                      tag="p"
                      color="secondary"
                      className={appSt.productText}
                    >
                      {product.text}
                    </Typography.Text>
                  </div>
                  <img
                    src={product.image}
                    alt=""
                    width={96}
                    height={96}
                    className={appSt.productIcon}
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <Gap size={72} />

      {selectedProducts.length === 5 && (
        <div className={appSt.bottomBtn}>
          <ButtonMobile loading={loading} block view="primary" onClick={submit}>
            Подключить
          </ButtonMobile>
        </div>
      )}
    </>
  );
};
