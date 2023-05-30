import { useEffect, useState } from 'react'
import { setGlobalState, useGlobalState, truncate} from '../store'

const Artwork = () => {
  const [nfts] = useGlobalState('nfts')
  const [end, setEnd] = useState(4)
  const [count] = useState(4)
  const [collection, setCollection] = useState([])

  const getCollection = () => {
    return nfts.slice(0, end)
  }

  useEffect(() => {
    setCollection(getCollection())
  }, [nfts, end])


  return (
    <div className="bg-[#02074d] gradient-bg-artworks">
      <div className="w-4/5 py-10 mx-auto">
        <h4 className="text-white text-3xl font-bold uppercase">
          {collection.length > 0 ? 'Latest Artworks' : 'No Artworks Yet'}

        </h4>

        <div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gaps-4 lg:gaps-3 py-2.5
            "
        >
          {collection.map((nft, i) => (
              <Card key={i} className="text-white" nft={nft} />
            ))}
        </div>
        {collection.length > 0 && nfts.length > collection.length ? (
        <div className="text-center my-5">
          <button 
          onClick={() => setEnd(end + count)}
          className="rounded-full p-2 py-1 text-blue-600 bg-[#fefefe] hover:bg-[#1257c5] hover:text-white shadow-black text-sm">
            Load More
          </button>
        </div>
         ) : null}
      </div>
    </div>
  );}


  const Card = ({ nft }) => {
    const setNFT = () => {
      setGlobalState('nft', nft)
      setGlobalState('showModal', 'scale-100')
    } 
  return(
  <div className="w-full shadow-black shadow-xl rounded-md overflow-hidden bg-gray-900 my-2 p-3">
    <img
      className="h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3"
      src={nft.metadataURI}
      alt={nft.title}
    />
    <h4 className="text-white font-semibold">{nft.title}</h4>
    <p className="text-gray-400 text-sm my-1">
      {nft.description.substring(0,150) + "..."}
    </p>
    <div className="flex justify-between items-center mt-3 text-white">
      <div className="flex flex-col">
        <small className="text-xs">Current Price</small>
        <p className="text-sm font-semibold">{nft.cost} ETH</p>
      </div>
      <button 
      onClick={setNFT}
      className="rounded-full px-1.5 py-1 text-blue-600 bg-[#fefefe] hover:bg-[#1257c5] hover:text-white shadow-black text-sm">
        View Details
      </button>
    </div>
  </div>
);}

export default Artwork;
