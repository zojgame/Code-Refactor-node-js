import { LoadingIcon } from "@/icons/LoadingIcon/LoadingIcon";

const LoadingModal = () => {
  return (
    <div className="block absolute h-[100vh] w-[100vw] z-[50] backdrop-blur-sm">
      <div className="h-full flex justify-center items-center">
        <LoadingIcon />
      </div>
    </div>
  );
};

export { LoadingModal };
