import clsx from "clsx";

interface Props {
  isError?: boolean;
}
export const Empty = ({ isError }: Props) => {
  return (
    <div className="flex flex-col my-14 items-center">
      <img
        className="max-w-[200px] mix-blend-hard-light 768:max-w-[420px]"
        src="/assets/empty2.png"
        alt="No-data"
      />
      {isError ? (
        <p className="text-center mt-2 font-semibold text-xl px-10 text-primary-main">
          Oops...Looks like something went wrong
        </p>
      ) : (
        <p className={clsx("px-7 text-center mt-2 768:px-0")}>
          There is no available result
        </p>
      )}
    </div>
  );
};
