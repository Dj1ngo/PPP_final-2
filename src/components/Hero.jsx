import React from "react";
import Identicon from "react-identicons";
import { setGlobalState, useGlobalState, truncate } from "../store";
import { connected } from "process";

const imgHero =
  "https://nftevening.com/wp-content/uploads/2022/04/Project-PXN-NFT-collection.png.webp";
function Hero() {
  const [connectedAccount] = useGlobalState('connectedAccount')
  return (
    <div className="flex flex-col md:flex-row w-4/5 justify-between items-center mx-auto py-10">
      <div className="md:w-3/6 w-full">
        <div>
          <h1 className="text-white text-5xl font-bold">
            {" "}
            Buy and Sell <br /> Digital Arts, <br />
            <span className="text-gradient">NFTs</span> Collections
          </h1>
          <p className="text-gray-500 font-semibold text-sm mt-3">
            Mint and Collect the hottest NFTs around
          </p>
        </div>

        <div className="flex mt-5">
          <button
          onClick={() => setGlobalState('modal', 'scale-100')} 
          className="shadow-black shadow-xl text-white bg-[#043ea9] hover:bg-[#1257c5] md:text-xs p-2 rounded-full">
            Create NFT
          </button>
        </div>
        <div className="w-3/4 flex justify-between items-center mt-5">
          <div className="text-white">
            <p className="text-bold">123K</p>
            <small className="text-gray-300">Users</small>
          </div>
          <div className="text-white">
            <p className="text-bold">152K</p>
            <small className="text-gray-300">Artworks</small>
          </div>
          <div className="text-white">
            <p className="text-bold">200K</p>
            <small className="text-gray-300">Artists</small>
          </div>
        </div>
      </div>

      <div className="shadow-xl shadow-black md:w-2/5 w-full mt-10 md:mt-0  rounded-md overflow-hidden bg-gray-800 ">
        <img className="h-60 w-full object-cover" src={imgHero} alt="Hero" />
        <div className="flex justify-start items-center p-3">
          <Identicon
            className="h-10 w-10 object-contain rounded-full mr-3"
            string={connectedAccount}
            size={50}
          />
          <div>
            <p className="text-white font-semibold">{truncate(connectedAccount,4,4,11)}</p>
            <small className=" text-blue-600">@you</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
