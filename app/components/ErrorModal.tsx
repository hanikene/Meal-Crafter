"use client";

import { useContext } from "react";
import { ErrorContext } from "../hooks/ErrorContext";

const ErrorModal = () => {
  const [error, setError] = useContext(ErrorContext);
  return (
    <div
      className={`bg-red-500 absolute left-1/2 -translate-x-1/2 w-96 h-12 truncate px-5 py-3 rounded-lg cursor-pointer transition-transform top-3 z-40 ${
        error ? "" : "-translate-y-28"
      }`}
      onClick={() => {
        setError(null);
      }}
    >
      <p className="text-base text-white text-center">{error}</p>
    </div>
  );
};

export default ErrorModal;
