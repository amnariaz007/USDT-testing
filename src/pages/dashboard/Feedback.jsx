import React, { useState } from 'react';
import { CROP_CONTRACT_ABI, CROP_CONTRACT_ADDRESS } from '../../constant';
import { ethers } from 'ethers';
import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers5/react';

export function Feedback() {
  const { open } = useWeb3Modal();
  const { address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [transactionSuccessful, setTransactionSuccessful] = useState(true);

  const Feedbackk = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      if (!address) {
        await open();
      }

      const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
      const signer = ethersProvider.getSigner();

      const contract = new ethers.Contract(CROP_CONTRACT_ADDRESS, CROP_CONTRACT_ABI, signer);

      let resp = await contract.giveFeedback(insuranceProvider, transactionSuccessful);
      await resp.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'transactionSuccessful') {
      setTransactionSuccessful(value === 'true'); // Convert string to boolean
    } else {
      setInsuranceProvider(value);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={Feedbackk} // Attach the form submission handler here
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Give your feedback</h2>

        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
          <div className="flex-1">
            <div className='flex justify-between items-center '>
              <label className="block text-gray-700" htmlFor="name">Feedback</label>
            </div>
            <div className="flex-1 mt-[20px]">
              <label className="block text-gray-700" htmlFor="insuranceProvider">Insurance Provider</label>
              <input
                type="text"
                id="insuranceProvider"
                name="insuranceProvider"
                className="w-full p-2 border border-gray-300 rounded mt-2"
                value={insuranceProvider}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <label>Transaction Successful
          <select
            name="transactionSuccessful"
            value={transactionSuccessful.toString()}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
            required
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>

        <button
          type="submit"
          className="w-full bg-[#424242] mt-[20px] text-white p-2 rounded  transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
