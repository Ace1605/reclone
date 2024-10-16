import { Spinner } from "../svgs/Spinner";

export const Loader = () => {
  return (
    <div className="mt-14 h-40 flex flex-col items-center justify-center">
      <Spinner className="w-10 h-10 text-primary-main" />
    </div>
  );
};
