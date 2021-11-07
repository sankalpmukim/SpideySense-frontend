export const Service = ({ info, func, funcText }) => {
  return (
    <div>
      <div>{info}</div>
      <button
        onClick={() => {
          func();
        }}
      >
        {funcText}
      </button>
    </div>
  );
};
