function Background() {
  return (
    <div
      className="fixed w-full inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="relative h-[22rem] bg-[#F1F1FF]"
        style={{
          width: "100vw",
        }}
      />
    </div>
  );
}

export default Background;
