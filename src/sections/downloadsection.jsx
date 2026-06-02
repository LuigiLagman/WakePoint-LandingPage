import React from 'react';
import container from "../assets/images/rocket_as_one.png";
import underlineImage from "../assets/images/underline_2.svg";

export default function CommuteBanner() {
  return (
    <div className="relative w-full my-36 overflow-visible">
      <div
        className="relative w-full overflow-visible rounded-3xl p-16 text-center"
      >
        <img 
          src={container}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[100%] max-w-none -translate-x-1/2 -translate-y-1/2"
        />

        <div className="relative z-10 flex flex-col items-center justify-center gap-6">
          <h2 className="text-2xl md:text-4xl font-semibold text-white tracking-wide drop-shadow-sm">
            Ready for{' '}
            <span className="relative inline-block">
              stress-free commuting?
              {/* Green underline element */}
              <img
                src={underlineImage}
                alt=""
                className="absolute left-0 -bottom-1 w-full h-1 object-cover overflow-visible"
              />
            </span>
          </h2>

          <button className="px-18 mt-4 py-3 bg-linear-to-b from-[#DAF3B6] to-[#84D716] hover:from-[#e2f2cc] hover:to-[#add677] text-slate-800 font-black uppercase tracking-wider rounded-lg shadow-[0_8px_0_0_#6CA126] active:translate-y-0.5 active:shadow-[0_3px_0_0_#6CA126] transition-all cursor-pointer">
            Download
          </button>
        </div>

      </div>
    </div>
  );
}