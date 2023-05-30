import { FaTimes } from 'react-icons/fa'
import Identicon from 'react-identicons'
import { useState } from 'react';
import { setGlobalState, useGlobalState, truncate, setAlert } from '../store';
import { buyNFT } from '../Blockchain.services'

const imgHero =
  "https://nftevening.com/wp-content/uploads/2022/04/Project-PXN-NFT-collection.png.webp";
const ShowNFT = () => {
    const [modal] = useGlobalState('showModal')
    const [nft] = useGlobalState('nft')
    const [connectedAccount] = useGlobalState('connectedAccount')

   

    const closeModal = () => {
        setGlobalState('showModal', 'scale-0')
       
    }

    const onChangePrice = () => {
        setGlobalState('showModal','scale-0')
        setGlobalState('updateModal','scale-100')

    }

    const handleNFTPurchase = async () => {
        setGlobalState('showModal', 'scale-0')
        setGlobalState('loading', {
          show: true,
          msg: 'Initializing NFT transfer...',
        })
    
        try {
          await buyNFT(nft)
          setAlert('Transfer completed...', 'green')
          window.location.reload()
        } catch (error) {
          console.log('Error transfering NFT: ', error)
          setAlert('Purchase failed...', 'red')
        }
      }
    

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal}`}>
        <div className="bg-[#151c25] shadow-xl shadow-[#2967c3] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
            <div o className="flex flex-col">
                <div className="flex justify-between items-center text-gray-400">
                    <p className="font-semibold ">Buy NFT</p>
                    <button onClick={closeModal} type="button" className="border-0 bg-transparent focus:outline-none">
                        
                        <FaTimes />
                    </button>
                </div>
                <div className="flex justify-center items-center rounded-xl mt-5">
                    <div className="shrink-8 rounded-xl overflow-hidden h-40 w-40">
                        <img  className="h-full w-full object-cover cursor-pointer"
                         src={nft?.metadataURI} alt={nft?.title} />
                    </div>
                </div>
                
               <div className="flex flex-col justify-start rounded-xl mt-5">
                <h4 className="text-white font-semibold">{nft?.title}</h4>
                <p className="text-gray-400 text-xs my-1">
                {nft?.description}
                </p>
                
                <div className='flex justify-between items-center mt-3 text-white '>
                    <div className='flex justify-start items-center'>
                        <Identicon
                        className="h-10 w-10 object-contain rounded-full mr-3" 
                        string={'dkfsjhsdfj'} size={50} />

                        <div className='flex flex-col justify-center items-start'>
                            <small className="text-white font-bold">@owner</small>
                            <small className="text-blue-400 font-semibold">{nft?.owner ? truncate(nft.owner, 4, 4, 11) : '...'}</small>
                        </div>
                    </div>

                    <div className='flex flex-col items-start'>
                            <small className="text-white font-xs">current Price</small>
                            <small className="text-blue-400 font-semibold text-sm">{nft?.cost} ETH</small>
                    </div>                
                </div>
               </div>


                <div className="flex justify-between items-center space-x-2">
                {connectedAccount == nft?.owner ? (
                    <button 
                    onClick={onChangePrice}
                    className="w-full flex justify-center items-center rounded-full p-2 mt-5 text-blue-600 bg-[#fefefe] hover:bg-[#2967c3] hover:text-white shadow-black text-sm">
                        Change Price
                    </button>
                      ) : (
                    <button 
                    onClick={ handleNFTPurchase }
                    className="w-full flex justify-center items-center rounded-full p-2 mt-5 text-blue-600 bg-[#fefefe] hover:bg-[#2967c3] hover:text-white shadow-black text-sm">
                    Purchase
                    </button>
                )}
                </div>
                    
 

            </div>
        
        </div>

    </div>
  )
}

export default ShowNFT
