import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import useStore from "@/store/store";
import { IconWrapper, CrossIcon } from "@/icons";
import { singIn } from "@/api/authorization";
import { AuthorizationRes } from "@/types";
import { RegistrationModalComponent } from "..";

const LoginModalComponent = () => {
  const formRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { setModal, notificationMessage } = useStore();

  const handleCloseModal = () => {
    setModal(null);
  };

  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (formRef.current) {
      const username = (formRef.current[0] as HTMLInputElement).value;
      const password = (formRef.current[1] as HTMLInputElement).value;

      if (!password || !username) {
        setErrorMessage("Заполните все обязательные поля");
      } else {
        setErrorMessage("");
        singIn(username, password).then((res) => {
          notificationMessage?.success("Вы успешно вошли!");
          setModal(null);
          const response = res as AuthorizationRes;
          if (response) {
            const token = `${response.tokenType} ${response.accessToken}`;
            localStorage.setItem("token", token);
          }
        });
      }
    }
  }

  const handleOnFieldChange = () => {
    if (errorMessage !== "") {
      setErrorMessage("");
    }
  };

  useOnClickOutside(formRef, handleCloseModal);

  function onHaventAccountClick(): void {
    setModal(<RegistrationModalComponent />);
  }

  return (
    <div className="block absolute h-[100vh] w-screen z-[50] backdrop-blur-sm">
      <form
        className="flex flex-col h-fit bg-[#1f2023] gap-8 p-10 rounded-[50px] m-auto w-[500px] absolute z-10 left-[calc(50%-250px)] top-[5%] sm:relative sm:top-0 sm:max-w-full sm:left-0 sm:h-full sm:rounded-none"
        onSubmit={handleOnSubmit}
        ref={formRef}
      >
        <div className="flex">
          <h2 className="font-bold text-[36px] mb-5 mr-auto">Вход</h2>
          <div onClick={handleCloseModal}>
            <IconWrapper>
              <CrossIcon className="cursor-pointer" />
            </IconWrapper>
          </div>
        </div>
        <div
          className={`h-4 ${
            errorMessage !== "" ? "text-left text-[#ff4b4bc8]" : ""
          }`}
        >
          {errorMessage}
        </div>
        <label>
          <input
            onChange={handleOnFieldChange}
            type="text"
            placeholder="Логин"
            className="bg-[#1f2023] border-2 rounded-full p-2 px-5 pt-[10px] w-full"
          />
        </label>
        <label className="mb-5">
          <input
            onChange={handleOnFieldChange}
            type="password"
            placeholder="Пароль"
            className="bg-[#1f2023] border-2 rounded-full p-2 px-5 pt-[10px] w-full "
          />
        </label>
        <button
          type="submit"
          className="bg-secondaryColor p-2 rounded-full text-primaryColor font-semibold px-8 hover:bg-secondaryHoverColor active:bg-secondaryColor hover:text-primaryHoverColor active:text-primaryColor"
        >
          Войти
        </button>
        <div className="flex gap-3 font-[12px] justify-center">
          {/* <div
            onClick={() => {}}
            className="text-gray-400 font-semibold hover:underline cursor-pointer select-none"
          >
            Не помню пароль
          </div> */}
          <div
            className="text-gray-400 font-semibold hover:underline cursor-pointer select-none"
            onClick={onHaventAccountClick}
          >
            Нет аккаунта
          </div>
        </div>
      </form>
    </div>
  );
};

export { LoginModalComponent };
