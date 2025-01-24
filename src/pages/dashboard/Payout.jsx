import React, { useState } from 'react';
import { CROP_CONTRACT_ABI, CROP_CONTRACT_ADDRESS } from '../../constant';
import { ethers } from 'ethers';
import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers5/react';

export const Payout = () => {
  const [formData, setFormData] = useState({
    policyNumber: '',
    Farmer: '',
    payoutAmount: '',
  });

  const { open } = useWeb3Modal();
  const { address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const payoutAmount = async (e) => {
    e.preventDefault();

    try {
      if (!address) {
        await open();
      }

      const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
      const signer = ethersProvider.getSigner();
      const contract = new ethers.Contract(CROP_CONTRACT_ADDRESS, CROP_CONTRACT_ABI, signer);

      const policyNumberBN = ethers.BigNumber.from(formData.policyNumber);
      const payoutAmountInWei = ethers.utils.parseUnits(formData.payoutAmount, 'ether');
      const farmerAddress = formData.Farmer;

      // Validate farmer address
      if (!ethers.utils.isAddress(farmerAddress)) {
        throw new Error('Invalid farmer address');
      }

      // Call the contract function without overrides
      const transaction = await contract.issuePayout(
        policyNumberBN,
        farmerAddress,
        {
          value: payoutAmountInWei
        }
      );

      await transaction.wait();

      console.log('Payout issued successfully');
    } catch (error) {
      console.error('Error issuing payout:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={payoutAmount} className="bg-white p-6 rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Payout Form</h2>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
          <div className="flex-1">
            <label className="block text-gray-700" htmlFor="policyNumber">Policy Number</label>
            <input
              type="number"
              id="policyNumber"
              name="policyNumber"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={formData.policyNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex-1 mt-4 md:mt-0">
            <label className="block text-gray-700" htmlFor="Farmer">Farmer</label>
            <input
              type="text"
              id="Farmer"
              name="Farmer"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={formData.Farmer}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex-1 mt-4 md:mt-0">
            <label className="block text-gray-700" htmlFor="payoutAmount">Payout Amount (ETH)</label>
            <input
              type="text"
              id="payoutAmount"
              name="payoutAmount"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={formData.payoutAmount}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#424242] text-white p-2 rounded transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
