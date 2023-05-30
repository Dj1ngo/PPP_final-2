import { connectWallet } from '../Blockchain.services'
import cryptologo from '../assets/logo.png'
import { truncate, useGlobalState } from '../store'

const Header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  return (
    <div className="w-4/5 flex justify-between md:justify-center items-center py-4 mx-auto">
        <div className="md:flex-[0.5] justify-center flex-initial items-center">
            <img className="cursor-pointer w-32" src={cryptologo} alt="logo" />
        </div>

        <ul className="md:flex-[0.5] text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
            <li className="mx-4 cursor-pointer">Market</li>
            <li className="mx-4 cursor-pointer">Artist</li>
            <li className="mx-4 cursor-pointer">Features</li>
            <li className="mx-4 cursor-pointer">Community</li>
        </ul>

        {connectedAccount ? (
          <button 
          onClick={connectWallet}
          className="shadow-xl shadow-black text-blue-600 bg-[#fefefe] hover:bg-[#1257c5] hover:text-white md:text-xs p-2 rounded-full">
              {truncate(connectedAccount, 4,4,11)}
          </button>
        ) : (
          <button 
        onClick={connectWallet}
        className="shadow-xl shadow-black text-blue-600 bg-[#fefefe] hover:bg-[#1257c5] hover:text-white md:text-xs p-2 rounded-full">
            Connect Wallet
        </button>
        ) }
    </div>
  )
}

export default Header