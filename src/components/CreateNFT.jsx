import { FaTimes } from 'react-icons/fa'
import { useState } from 'react';
import { setAlert, setGlobalState, setLoadingMsg, useGlobalState } from '../store';
import  axios  from "axios";
import { mintNFT } from '../Blockchain.services'

const imgHero =
  "https://nftevening.com/wp-content/uploads/2022/04/Project-PXN-NFT-collection.png.webp";






  const CreateNFT = () => {
    const [modal] = useGlobalState('modal')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [fileUrl, setFileUrl] = useState('')
    const [imgBase64, setImgBase64] = useState('null')
    const jwt = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNWExMzAwOS0yNjc1LTQxYWYtOTJhNi0wMWM3YTJlYzljOTgiLCJlbWFpbCI6ImF6aXoubWVyaGJlbjIwMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjE4YjYwYTVhMDE4NGEyNmM0NzM5Iiwic2NvcGVkS2V5U2VjcmV0IjoiYWNiOWQ1ZGIzYjgyMzA1MDk0M2VkYmM0MzhkMmZjMTlmYTVjMjk4NzQ1ZDYwZWExMzAyYzQyOTY3YjU3Y2RlZiIsImlhdCI6MTY4NTM1Mjg4N30.Hk7rfjDgVFqozudMzAoaonxcgYz_enfoIq1-gxJvZOw"

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!title || !price || !description) return;
    
        setGlobalState('modal', 'scale-0');
        setGlobalState('loading', { show: true, msg: 'Uploading IPFS data...' });
    
        try {
          const formData = new FormData();
          formData.append('file', fileUrl);
    
          const metadata = JSON.stringify({
            name: title,
            description: description,
          });
    
          const options = JSON.stringify({
            cidVersion: 0,
          });
    
          formData.append('pinataMetadata', metadata);
          formData.append('pinataOptions', options);
    
          const response = await axios.post(
            'https://api.pinata.cloud/pinning/pinFileToIPFS',
            formData,
            {
              maxContentLength: Infinity,
              headers: {
                'Content-Type':  `multipart/form-data; boundary=${formData._boundary}`,
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhNWExMzAwOS0yNjc1LTQxYWYtOTJhNi0wMWM3YTJlYzljOTgiLCJlbWFpbCI6ImF6aXoubWVyaGJlbjIwMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjE4YjYwYTVhMDE4NGEyNmM0NzM5Iiwic2NvcGVkS2V5U2VjcmV0IjoiYWNiOWQ1ZGIzYjgyMzA1MDk0M2VkYmM0MzhkMmZjMTlmYTVjMjk4NzQ1ZDYwZWExMzAyYzQyOTY3YjU3Y2RlZiIsImlhdCI6MTY4NTM1Mjg4N30.Hk7rfjDgVFqozudMzAoaonxcgYz_enfoIq1-gxJvZOw',
              },
            }
          );
          console.log(response.data)
    
          const created = response.data;
          const metadataURI = `https://ipfs.io/ipfs/${created.IpfsHash}`;
          const nft = { title, price, description, metadataURI }
    
          setLoadingMsg('Intializing transaction...');
          setFileUrl(metadataURI);
          await mintNFT(nft);
    
          resetForm();
          setAlert('Minting completed...', 'green');
          window.location.reload();
        } catch (error) {
          console.log('Error uploading file: ', error);
          setAlert('Minting failed...', 'red');
        }
      };

    const changeImage = async (e) => {
        const reader = new FileReader();
        if(e.target.files[0]) reader.readAsDataURL(e.target.files[0])

        reader.onload = (readerEvent) => {
            const file = readerEvent.target.result
            setImgBase64(file)
            setFileUrl(e.target.files[0])
        }
    }

    const closeModal = () => {
        setGlobalState('modal', 'scale-0')
        resetForm()
    }

    const resetForm = () => {
        setFileUrl('null')
        setImgBase64('null')
        setPrice('null')
        setDescription('null')
        setTitle('null')
    }

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${modal}`}>
        <div className="bg-[#151c25] shadow-xl shadow-[#2967c3] rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="flex justify-between items-center text-gray-400">
                    <p className="font-semibold ">Add NFT</p>
                    <button onClick={closeModal} type="button" className="border-0 bg-transparent focus:outline-none">
                        
                        <FaTimes />
                    </button>
                </div>
                <div className="flex justify-center items-center rounded-xl mt-5">
                    <div className="shrink-8 rounded-xl overflow-hidden h-20 w-20">
                        <img  className="h-full w-full object-cover cursor-pointer"
                         src={imgBase64 || imgHero} alt="NFT" />
                    </div>
                </div>
                
                <div className='flex justify-between items-center bg-gray-800 rounded-xl mt-5'>
                    <label className='block'>
                        <span className='sr-only'> Choose Profile Photo</span>
                        <input 
                        type='file' 
                        accept='image/png, image/gif, image/jpeg, image/jpg, image/webp' 
                        className='block w-full text-sm text-slate-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold  hover:file:bg-[#1d2631] file:mr-4 focus:outline-none cursor-pointer focus:ring-0'
                        required
                        onChange={ changeImage }
                        />
                    </label>
                </div>
                
                <div className='flex justify-between items-center bg-gray-800 rounded-xl mt-5'>
                        <input 
                        type='text' 
                        name='title'
                        placeholder='Title' 
                        className='bg-transparent border-0 block w-full text-sm text-slate-500  focus:outline-none cursor-pointer focus:ring-0'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                        /> 
                </div>

                <div className='flex justify-between items-center bg-gray-800 rounded-xl mt-5'>
                        <input 
                        type='number' 
                        name='price'
                        placeholder='price (ETH)' 
                        className='block bg-transparent border-0 w-full text-sm text-slate-500  focus:outline-none cursor-pointer focus:ring-0'
                        min={0.01}
                        step={0.01}
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        required
                        /> 
                </div>

                <div className='flex justify-between items-center bg-gray-800 rounded-xl mt-5'>
                        <textarea
                        type='text' 
                        name='description'
                        placeholder='Description' 
                        className='block bg-transparent border-0 w-full text-sm text-slate-500  focus:outline-none cursor-pointer focus:ring-0 h-20 resize-none'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        required
                        ></textarea> 
                </div>

                
                    <button className="w-full flex justify-center items-center rounded-full p-2 mt-5 text-blue-600 bg-[#fefefe] hover:bg-[#2967c3] hover:text-white shadow-black text-sm">
                    Mint Now
                    </button>
 

            </form>
        
        </div>

    </div>
  )
}

export default CreateNFT
