import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Coin from "./../../assets/svg/coin.svg";
import BuyCoin from "./../../assets/svg/buyCoin-logo.svg";
import CardAdded from "./../../assets/png/buyCoin-card.png";
import CheckIcon from "@mui/icons-material/Check";
import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import Click from "./../../assets/png/click.png";
import Payme from "./../../assets/png/payme.png";
import { instance } from "../axios";

const Price = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [stateCoin, setStateCoin] = useState({ coin: 0 });
  const [selectedPayment, setSelectedPayment] = useState(null);

  const showModal = (card) => {
    setSelectedCard(card);
    setIsModalVisible(true);
  };

  const hideModal = async () => {
    try {
      const total = parseFloat(selectedCard.newPrice.replace(/\s+/g, ""));

      const response = await instance.post("/payment/generate", {
        type: selectedCard.type,
        total: total,
        payment: selectedPayment,
      });
      console.log("Response from backend:", response.data);
      setIsModalVisible(false);

      if (response.data.url) {
        window.open(response.data.url, "_blank");
      } else {
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error("Error while sending request:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get("/users/me");
        setStateCoin((prevState) => ({ ...prevState, coin: res.data }));
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const cards = [
    {
      id: 1,
      type: "basic",
      title: "Special offer",
      duration: "3 months",
      oldPrice: "35 000 UZS",
      newPrice: "25 000 UZS",
      coins: "50 + 7",
    },
    {
      id: 2,
      type: "pro",
      title: "Special offer",
      duration: "3 months",
      oldPrice: "75 000 UZS",
      newPrice: "49 000 UZS",
      coins: "100 + 15",
    },
    {
      id: 3,
      type: "premium",
      title: "Special offer",
      duration: "3 months",
      oldPrice: "120 000 UZS",
      newPrice: "99 000 UZS",
      coins: "200 + 30",
    },
  ];

  return (
    <>
      <div className="bg-white">
        <div className="max-w-[1400px] my-0 h-[80px] mx-auto flex justify-between items-center max-[1000px]:mx-[10px]">
          <a href="/">
            <HomeIcon
              fontSize="50px"
              className="text-[50px] max-[770px]:text-[40px]"
            />
          </a>
          <div className="flex justify-center items-center gap-[10px] max-[770px]:gap-[5px] max-[400px]:flex-wrap">
            <h1 className="text-[30px] font-semibold max-[770px]:text-[22px] leading-3">
              Balance:
            </h1>
            <div className="flex justify-center items-center gap-[5px]">
              <p className="text-[#F8AB24] font-semibold text-[30px] max-[770px]:text-[22px]">
                {stateCoin.coin.coin} coin
              </p>
              <img src={Coin} alt="coin" className="scale-75" />
            </div>
          </div>
          <div className="flex justify-center gap-[10px] items-center">
            <AccountCircleIcon
              fontSize="50px"
              className="text-[#0A4577] text-[50px] max-[770px]:text-[40px]"
            />
            <p className="text-[22px] font-bold max-[770px]:text-[18px]">
              {stateCoin.coin.first_name} {stateCoin.coin.last_name}
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundImage:
            "linear-gradient(to bottom, gray, rgba(39, 103, 200, 0.6))",
        }}
        className="bg-gradient-to-b from-blue-200 to-blue-900"
      >
        <div
          className="max-w-[1400px] mx-auto my-0"
          style={{ fontFamily: "'League Spartan', sans-serif" }}
        >
          <div className="pt-[60px] flex justify-center flex-col items-center gap-[20px] max-[770px]:gap-[5px] max-[770px]:pt-[30px]">
            <img
              src={BuyCoin}
              alt="BuyCoin"
              className="max-[770px]:scale-75 max-[400px]:scale-50"
            />
            <h1 className="text-[#1E4B85] text-[60px] font-bold max-[770px]:text-[45px] max-[400px]:text-[30px]">
              Uni Coin Shop
            </h1>
          </div>
          <div className="flex justify-between items-center py-[30px] mx-[10px] max-[1100px]:flex-wrap max-[1100px]:justify-center max-[1100px]:gap-[40px]">
            {cards.map((card) => (
              <div
                key={card.id}
                className="relative bg-white rounded-[20px] h-[485px] w-[345px] max-[770px]:h-[450px] max-[770px]:w-[300px]"
              >
                <div>
                  <img
                    src={CardAdded}
                    alt="CardAdded"
                    className="absolute left-[-14px] top-[15px]"
                  />
                  <p className="absolute left-[0] top-[25px] font-bold text-[18px] text-white">
                    {card.title}
                  </p>
                </div>

                <div className="mx-[15px]">
                  <div className="flex justify-end pt-[20px]">
                    <div className=" bg-[#F8C768] rounded-[10px] flex justify-center items-center w-[100px] h-[31px]">
                      <p className="font-bold text-[18px] text-white">
                        {card.duration}
                      </p>
                    </div>
                  </div>
                  <div className="pt-[30px] text-[#2075E1] text-center font-bold">
                    <h1 className="relative text-[28px] max-[770px]:text-[22px]">
                      {card.oldPrice}
                      <span className="absolute top-[-10px] left-[88px] text-[red] max-[770px]:left-[80px]">
                        ____________
                      </span>
                    </h1>
                    <h2 className="text-[40px] max-[770px]:text-[30px]">
                      {card.newPrice}
                    </h2>
                    <div className="flex gap-[10px] justify-center max-[770px]:gap-[5px]">
                      <h2 className="text-[38px] max-[770px]:text-[30px]">
                        {card.coins}
                      </h2>
                      <img
                        src={Coin}
                        alt="coin"
                        className="max-[770px]:scale-75"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-[15px]">
                    <div className="flex justify-start items-center gap-[20px]">
                      <div className="p-[10px] text-white bg-[#80E151] w-[30px] h-[30px] rounded-[10px] flex justify-center items-center">
                        <CheckIcon />
                      </div>
                      <h1 className="text-[20px] font-medium">
                        University information
                      </h1>
                    </div>

                    <div className="flex justify-start items-center gap-[20px]">
                      <div className="p-[10px] text-white bg-[#80E151] w-[30px] h-[30px] rounded-[10px] flex justify-center items-center">
                        <CheckIcon />
                      </div>
                      <h1 className="text-[20px] font-medium">AI assistant</h1>
                    </div>

                    <div className="flex justify-start items-center gap-[20px]">
                      <div className="p-[10px] text-white bg-[#80E151] w-[30px] h-[30px] rounded-[10px] flex justify-center items-center">
                        <CheckIcon />
                      </div>
                      <h1 className="text-[20px] font-medium">Smart filter</h1>
                    </div>

                    <div className="flex justify-start items-center gap-[20px]">
                      <div className="p-[10px] text-white bg-[#80E151] w-[30px] h-[30px] rounded-[10px] flex justify-center items-center">
                        <CheckIcon />
                      </div>
                      <h1 className="text-[20px] font-medium">Job</h1>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-[30px] pb-[30px]">
                  <button
                    className="text-[20px] font-semibold text-white bg-[#204ECF] w-[201px] py-[5px] rounded-[10px]"
                    onClick={() => showModal(card)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Modal
          open={isModalVisible}
          onClose={hideModal}
          className="flex justify-center items-center"
        >
          <div className="bg-white py-[30px] px-[50px] max-[770px]:w-[370px] max-[770px]:h-[450px] rounded-[20px] flex flex-col justify-center items-center max-[400px]:mx-[20px] max-[400px]:px-[30px]">
            {selectedCard && (
              <>
                <div className="flex justify-center items-center gap-[10px]">
                  <h1 className="text-[#1E4B85] text-[40px] font-bold max-[770px]:text-[30px]">
                    {selectedCard.newPrice}
                  </h1>
                </div>
                <div className="text-center">
                  <p className="text-[#1E4B85] text-[20px] font-medium">
                    {selectedCard.title}
                  </p>
                  <div className="flex justify-center items-center gap-[5px]">
                    <p className="text-[#1E4B85] font-medium text-[40px]">
                      {selectedCard.coins} coins
                    </p>
                    <img src={Coin} alt="Coin" />
                  </div>
                </div>
                <span className="text-center">
                  Choose your suitable payment method!
                </span>
                <div className="mt-[10px] w-[226px] rounded-[10px]">
                  <div
                    className={`flex justify-center items-center gap-[10px] border border-1 border-[gray] px-[20px] rounded-t-lg cursor-pointer ${
                      selectedPayment === "payme"
                        ? "border-2 border-[blue]"
                        : selectedPayment === "click"
                        ? "border-b-0"
                        : ""
                    }`}
                    onClick={() => handlePaymentSelection("payme")}
                  >
                    <input
                      type="radio"
                      name="payment"
                      required
                      checked={selectedPayment === "payme"}
                      onChange={() => handlePaymentSelection("payme")}
                    />
                    <img src={Payme} alt="payme" />
                  </div>
                  <div
                    className={`flex justify-center items-center gap-[10px] border border-1 border-[gray] border-t-0 px-[20px] rounded-b-lg cursor-pointer ${
                      selectedPayment === "click"
                        ? "border-2 border-[blue] border-t-2"
                        : ""
                    }`}
                    onClick={() => handlePaymentSelection("click")}
                  >
                    <input
                      type="radio"
                      name="payment"
                      required
                      checked={selectedPayment === "click"}
                      onChange={() => handlePaymentSelection("click")}
                    />
                    <img src={Click} alt="click" />
                  </div>
                </div>
                <button
                  className="text-[20px] font-semibold text-white bg-[blue] w-[226px] h-[50px] rounded-[10px] mt-[20px]"
                  onClick={hideModal}
                >
                  Confirm
                </button>
              </>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Price;
