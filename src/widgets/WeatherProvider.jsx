import React, { useState } from 'react';
import { CROP_CONTRACT_ABI, CROP_CONTRACT_ADDRESS } from '../constant';
import { ethers } from 'ethers';
import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers5/react';

const WeatherProvider = () => {
  const [formData, setFormData] = useState({
    policyNumber: '',
    indexLevel: '',
  });

  const { open } = useWeb3Modal()
  const { address } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your form submission logic here
  };


  const weatherprovider = async () => {
    try {

      if(!address){
        open()
      }

      const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
      console.log(ethersProvider,"ether");
      const signer = ethersProvider.getSigner()
      console.log(signer, "sinnger");

      const contract = new ethers.Contract(CROP_CONTRACT_ADDRESS, CROP_CONTRACT_ABI, signer)


      let resp = await contract.reportWeatherStatus(
        ethers.BigNumber.from(formData.policyNumber),
        ethers.BigNumber.from(formData.indexLevel),
      )
      await resp.wait()



  } catch (error) {
      console.log(error)
      
  }
  }

  
  return (
    <div className="flex flex-col items-center justify-center  w-[600px] max-w-[100%] mx-auto bg-gray-100 p-4">
      {/* Policies Paragraph */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full mb-6 text-center">
        <p className="text-gray-700">
          At XYZ Insurance, we are committed to providing comprehensive crop insurance policies that protect against a variety of risks including weather damage, pest infestations, and other unpredictable events. Our policies are designed to ensure peace of mind for farmers, enabling them to focus on their agricultural activities with confidence.
        </p>
      </div>
      <div className="flex justify-center items-center pb-[50px] bg-gray-100">
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Weather</h2>
      
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
          <label className="block text-gray-700" htmlFor="indexLevel">Index Level</label>
          <input 
            type="number" 
            id="indexLevel" 
            name="indexLevel" 
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={formData.indexLevel}
            onChange={handleChange}
            required
          />
        </div>
      </div>   
      <button onClick={weatherprovider}
        type="submit" 
        className="w-full bg-[#424242] text-white p-2 rounded  transition"
      >
        Submit
      </button>
    </form>
  </div>
  

  

      {/* Link to Weather Status */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full text-center">
      <a
          href="https://othercompany.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black-600 hover:underline"
        >
          Weather status
        </a>
      </div>
    </div>
  );
};

export default WeatherProvider;
