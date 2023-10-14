const LoadingComponent = () => {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex justify-center items-center flex-col md:px-0 px-3 pb-20">
      <h1 className="loading-dots text-4xl font-bold mb-3 w-[41rem] max-w-full">
        Your meal recipe is being cooked
      </h1>
      <p className="text-neutral-500">
        It may take several minutes, so be patient 😊
      </p>
    </div>
  );
};

export default LoadingComponent;
