import { Orbit } from "@uiball/loaders";

const LoadingScreen = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E4DDD3",
      }}
    >
      <Orbit size={200} color="white" />
    </div>
  );
};

export default LoadingScreen;
