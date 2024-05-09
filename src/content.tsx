import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { CountButton } from "~features/CountButton"
import AiModal from "~features/AiModal"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {

  const [targetElement, setTargetElement] = useState<Element>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const targetFunction = () => {
    const target = document.getElementsByClassName("msg-form__contenteditable");
    if (target.length > 0) {
      setTargetElement(target[0])
      console.log("target : ", target[0]);

      // i want to add a icon in the bottom of this target div
      const icon = document.createElement("div");
      icon.innerHTML = `<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_dd_3_37)">
      <rect x="5" y="1" width="32" height="32" rx="16" fill="white"/>
      <path d="M28.4667 18.7333C28.4667 18.8866 28.4063 19.0335 28.2989 19.1419C28.1915 19.2502 28.0458 19.3111 27.8938 19.3111H26.7482V20.4667C26.7482 20.6199 26.6879 20.7668 26.5804 20.8752C26.473 20.9836 26.3273 21.0444 26.1754 21.0444C26.0235 21.0444 25.8778 20.9836 25.7703 20.8752C25.6629 20.7668 25.6026 20.6199 25.6026 20.4667V19.3111H24.4569C24.305 19.3111 24.1593 19.2502 24.0519 19.1419C23.9445 19.0335 23.8841 18.8866 23.8841 18.7333C23.8841 18.5801 23.9445 18.4331 24.0519 18.3248C24.1593 18.2164 24.305 18.1555 24.4569 18.1555H25.6026V17C25.6026 16.8467 25.6629 16.6998 25.7703 16.5914C25.8778 16.4831 26.0235 16.4222 26.1754 16.4222C26.3273 16.4222 26.473 16.4831 26.5804 16.5914C26.6879 16.6998 26.7482 16.8467 26.7482 17V18.1555H27.8938C28.0458 18.1555 28.1915 18.2164 28.2989 18.3248C28.4063 18.4331 28.4667 18.5801 28.4667 18.7333ZM14.719 12.9555H15.8646V14.1111C15.8646 14.2643 15.925 14.4113 16.0324 14.5196C16.1398 14.628 16.2855 14.6889 16.4375 14.6889C16.5894 14.6889 16.7351 14.628 16.8425 14.5196C16.9499 14.4113 17.0103 14.2643 17.0103 14.1111V12.9555H18.1559C18.3078 12.9555 18.4535 12.8947 18.561 12.7863C18.6684 12.678 18.7287 12.531 18.7287 12.3778C18.7287 12.2245 18.6684 12.0776 18.561 11.9692C18.4535 11.8609 18.3078 11.8 18.1559 11.8H17.0103V10.6444C17.0103 10.4912 16.9499 10.3442 16.8425 10.2359C16.7351 10.1275 16.5894 10.0667 16.4375 10.0667C16.2855 10.0667 16.1398 10.1275 16.0324 10.2359C15.925 10.3442 15.8646 10.4912 15.8646 10.6444V11.8H14.719C14.5671 11.8 14.4214 11.8609 14.314 11.9692C14.2065 12.0776 14.1462 12.2245 14.1462 12.3778C14.1462 12.531 14.2065 12.678 14.314 12.7863C14.4214 12.8947 14.5671 12.9555 14.719 12.9555ZM23.8841 21.6222H23.3113V21.0444C23.3113 20.8912 23.2509 20.7442 23.1435 20.6359C23.0361 20.5275 22.8904 20.4667 22.7385 20.4667C22.5866 20.4667 22.4409 20.5275 22.3334 20.6359C22.226 20.7442 22.1657 20.8912 22.1657 21.0444V21.6222H21.5928C21.4409 21.6222 21.2952 21.6831 21.1878 21.7914C21.0804 21.8998 21.02 22.0467 21.02 22.2C21.02 22.3532 21.0804 22.5002 21.1878 22.6085C21.2952 22.7169 21.4409 22.7778 21.5928 22.7778H22.1657V23.3555C22.1657 23.5088 22.226 23.6557 22.3334 23.7641C22.4409 23.8724 22.5866 23.9333 22.7385 23.9333C22.8904 23.9333 23.0361 23.8724 23.1435 23.7641C23.2509 23.6557 23.3113 23.5088 23.3113 23.3555V22.7778H23.8841C24.036 22.7778 24.1817 22.7169 24.2892 22.6085C24.3966 22.5002 24.4569 22.3532 24.4569 22.2C24.4569 22.0467 24.3966 21.8998 24.2892 21.7914C24.1817 21.6831 24.036 21.6222 23.8841 21.6222ZM26.4124 13.5333L16.4375 23.5946C16.2226 23.8111 15.9313 23.9328 15.6276 23.9328C15.3239 23.9328 15.0326 23.8111 14.8178 23.5946L13.3356 22.101C13.2292 21.9937 13.1448 21.8663 13.0872 21.7261C13.0296 21.5859 13 21.4356 13 21.2838C13 21.1321 13.0296 20.9818 13.0872 20.8416C13.1448 20.7014 13.2292 20.574 13.3356 20.4667L23.3113 10.4054C23.4177 10.298 23.544 10.2129 23.683 10.1548C23.822 10.0967 23.971 10.0668 24.1215 10.0668C24.2719 10.0668 24.4209 10.0967 24.5599 10.1548C24.699 10.2129 24.8253 10.298 24.9317 10.4054L26.4124 11.8989C26.5188 12.0062 26.6032 12.1336 26.6608 12.2738C26.7184 12.4141 26.748 12.5644 26.748 12.7161C26.748 12.8679 26.7184 13.0182 26.6608 13.1584C26.6032 13.2986 26.5188 13.426 26.4124 13.5333ZM25.6026 12.7165L24.1211 11.2222L21.8298 13.5333L23.3113 15.0276L25.6026 12.7165Z" fill="#2563EB"/>
      </g>
      <defs>
      <filter id="filter0_dd_3_37" x="0" y="0" width="42" height="42" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect1_dropShadow_3_37"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="3"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3_37"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feMorphology radius="2" operator="erode" in="SourceAlpha" result="effect2_dropShadow_3_37"/>
      <feOffset dy="2"/>
      <feGaussianBlur stdDeviation="2"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
      <feBlend mode="normal" in2="effect1_dropShadow_3_37" result="effect2_dropShadow_3_37"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_3_37" result="shape"/>
      </filter>
      </defs>
      </svg>
      `;
      icon.style.position = "absolute";
      icon.style.bottom = "0";
      icon.style.right = "50px";
      icon.style.color = "red";
      icon.style.fontSize = "20px";
      icon.style.cursor = "pointer";
      icon.setAttribute("contenteditable", "false");

      target[0].addEventListener('focus', function () {
        if (target[0].getAttribute('data-artdeco-is-focused') === 'true') {
          target[0].appendChild(icon);
        }
      });

      target[0].addEventListener('blur', function () {
        target[0].removeChild(icon);
        if (target[0].innerHTML === "" || target[0].innerHTML === "<p><br></p>") {
          const placeholderClass = document.body.querySelector(".msg-form__placeholder")
          console.log("placeholder : ", placeholderClass)
          placeholderClass.classList.add("msg-form__placeholder");
        }
      }
      );

      icon.addEventListener('click', function () {
        setIsModalOpen(true)
      });

    }

  }

  const updateMessageBox = (message: string) => {
    const placeholderClass = document.body.querySelector(".msg-form__placeholder")
    console.log("placeholder : ", placeholderClass)
    placeholderClass.classList.remove("msg-form__placeholder");

    targetElement.innerHTML = `<p>${message}</p>`;
    setIsModalOpen(false)
  }

  const body = document.body;
  console.log("🔥  body: ", body);
  setTimeout(() => {
    const messageCard = document.body.querySelectorAll(".msg-conversation-card")
    console.log("messageCard : ", messageCard)

    for (let i = 0; i < messageCard.length; i++) {
      messageCard[i].addEventListener('click', function () {
        console.log('Clicked!');
        targetFunction();
      });
    }
  }, 2000);

  return (
    <>
      {isModalOpen && <AiModal updateMessageBox={updateMessageBox} />}
    </>
  )
}

export default PlasmoOverlay
