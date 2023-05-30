import { BiTransfer } from "react-icons/bi";
import { MdOpenInNew } from "react-icons/md";
import { useGlobalState, truncate } from "../store";
import { useEffect, useState } from 'react'

const Transactions = () => {
  const [transactions] = useGlobalState("transactions")
  const [end, setEnd] = useState(1)
  const [count] = useState(1)
  const [collection, setCollection] = useState([])

  const getCollection = () => {
    return transactions.slice(0, end)
  }

  useEffect(() => {
    setCollection(getCollection())
  }, [transactions, end])
  
  return (
    <div className="bg-[#02074d]">
      <div className="w-4/5 py-10 mx-auto">
        <h4 className="text-gradient text-white text-3xl font-bold uppercase">
        {collection.length > 0 ? 'Latest Transactions' : 'No Transaction Yet'}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gaps-4 lg:gaps-2 py-2.5">
          {collection
            .map((tx, i) => (
              <Transaction key={i} tx={tx} />
            ))}
        </div>

        {collection.length > 0 && transactions.length > collection.length ? (
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
  );
};

const Transaction = ({ tx }) => (
  <div className="flex justify-between items-center border border-gray-900 text-gray-300 w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3">
    <div className="rounded-md shadow-sm shadow-blue-500 p-2">
      <BiTransfer />
    </div>
    <div>
      <h4 className="text-sm"> NFT Transferred</h4>
      <small className="flex justify-start items-center">
        <span className="mr-1">Received By</span>
        <a className="text-blue-400 mr-2" href="#" target="_blank">
          {tx?.owner ? truncate(tx.owner, 4, 4, 11) : '...'}
        </a>
        <MdOpenInNew />
      </small>
    </div>
    <p className="text-sm font-medium">{tx.cost} ETH</p>
  </div>
);

export default Transactions;
