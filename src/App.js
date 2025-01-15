const Section1 = () => {
  return (
    <div className="w-full lg:max-w-screen-xl py-24 lg:py-40 bg-white rounded-4xl px-10 flex flex-col items-center justify-center gap-14 lg:gap-10">
      <div className="flex flex-col text-center">
        <div className="text-3xl md:text-3xl lg:text-7xl font-black text-[#4D4D4D]">
          one app for creators<span className="text-primary">...</span>
        </div>
        <div className="text-xs md:text-base lg:text-3xl mt-6 font-light text-[#5E6C84]">
          "Empowering Creators with Limitless Possibilities - One Stop
          Destination for all your creators journey!
        </div>
      </div>
      <div className="text-base lg:text-4xl font-semibold text-primary">
        coming soon...
      </div>
    </div>
  );
};
const Section2 = () => {
  return (
    <div className="w-full max-w-screen-xl gap-3 lg:gap-6 grid grid-cols-2 md:grid-cols-3">
      <div className="row-span-1 md:row-span-3 col-span-full md:col-span-1 bg-white rounded-3xl p-4 md:p-8 flex md:flex-col order-1">
        <div className="text-lg md:text-4xl font-bold text-[#4D4D4D]">
          Get 100+ <span className="text-primary">customize</span> BioLink
        </div>
        <img
          src="/assets/svgs/know_more_1.svg"
          className="w-auto h-16 md:h-[200px]"
          alt="Get 100+ customize BioLink"
        />
      </div>
      <div className="row-span-1 md:row-span-4 col-span-full md:col-span-1 bg-white rounded-3xl p-4 md:p-8 flex md:flex-col order-2">
        <div className="text-lg md:text-4xl font-bold text-[#4D4D4D]">
          Make <span className="text-primary">money</span> from your bio
        </div>
        <img
          src="/assets/svgs/know_more_2.svg"
          className="w-auto h-16 md:h-[320px]"
          alt="Make money from your bio"
        />
      </div>
      <div className="row-span-1 md:row-span-3 col-span-1 bg-white rounded-3xl p-3 md:p-8 order-3">
        <div className="text-lg md:text-4xl font-bold text-[#4D4D4D]">
          Create custom <span className="text-primary">MediaKit</span>
        </div>
        <img
          src="/assets/svgs/know_more_3.svg"
          className="w-auto h-18 md:h-[200px]"
          alt="Create custom MediaKit"
        />
      </div>
      <div className="row-span-1 md:row-span-2 col-span-1 bg-white rounded-3xl p-3 md:p-8 order-5 md:order-4 flex flex-col justify-between">
        <div className="text-lg md:text-4xl font-bold text-[#4D4D4D]">
          <span className="text-primary">Collaborate</span> with Brands
        </div>
        <img
          src="/assets/svgs/know_more_4.svg"
          className="w-full h-18 md:h-[200px]"
          alt="Collaborate with Brands"
        />
      </div>

      <div className="row-span-2 col-span-1 bg-white rounded-3xl p-4 md:p-8 order-4 md:order-5 flex flex-col justify-between">
        <div className="text-lg md:text-4xl font-bold text-[#4D4D4D]">
          Hire <span className="text-primary">freelancers</span> for your
          creator journey
        </div>
        <img
          src="/assets/svgs/know_more_5.svg"
          className="w-full h-24 md:h-[200px]"
          alt="and many more features"
        />
      </div>
      <div className="row-span-1 md:row-span-1 col-span-full md:col-span-1 bg-white rounded-3xl p-4 md:p-8 flex md:flex-col justify-between order-6">
        <div className="text-lg md:text-4xl font-bold text-[#4D4D4D]">
          and many more <span className="text-primary">...</span>
        </div>
        <img
          src="/assets/svgs/know_more_6.svg"
          className="w-auto h-9 md:h-[165px]"
          alt="Hire freelancers for your creator journey"
        />
      </div>
    </div>
  );
};

const Section3 = () => {
  return (
    <div className="w-full max-w-screen-xl py-20 lg:py-40 bg-white rounded-4xl px-5 lg:px-10 flex flex-col items-center justify-center gap-6 lg:gap-14">
      <div className="flex flex-col text-center items-center gap-14">
        <div className="text-lg md:text-2xl lg:text-5xl font-bold text-[#4D4D4D]">
          Get updates in your inbox when we go{" "}
          <span className="text-primary">live!</span>
        </div>
        <div className="rounded-lg lg:rounded-2xl bg-gradient-to-b from-[#F30E6B] to-[#0140FF] w-full max-w-2xl overflow-clip p-[1px]">
          <div className="w-full rounded-lg lg:rounded-2xl flex p-2.5 gap-2 bg-white m-auto">
            <input
              type="email"
              className="w-full focus-within:outline-0"
              placeholder="Enter your mail id"
            />
            <button className="bg-primary text-white text-sm font-bold h-7 lg:h-12 w-28 rounded-md lg:rounded-xl">
              Send {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <>
      <div className="flex flex-col w-full items-center mt-6 lg:mt-14 px-6">
        <img
          src="/assets/svgs/logo_green.svg"
          className="w-full h-6 lg:h-10 mb-6"
          alt="dodo"
        />
        <Section1 />
        <div className="mt-14 lg:mt-24 mb-5 lg:mb-10 text-dark font-extrabold text-xl lg:text-5xl">
          Get to know more<span className="text-primary">...</span>
        </div>
        <Section2 />
        <div className="h-14 lg:h-24" />
        <Section3 />
        <div className="text-xs lg:text-2xl mt-24 text-dark-300">
          crafted by ❤️ in <span className="font-semibold">BHARAT</span>
        </div>
      </div>
      <img
        src="/assets/svgs/footer_banner.svg"
        className="w-full h-full md:mt-11 mt-18 lg:mt-20"
        alt="bottom-background-image"
      />
    </>
  );
};

export default App;
