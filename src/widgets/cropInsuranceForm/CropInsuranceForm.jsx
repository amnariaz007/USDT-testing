import React, { useEffect, useState } from 'react';
import { CROP_CONTRACT_ABI, CROP_CONTRACT_ADDRESS } from '../../constant';
import { ethers } from 'ethers';
import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers5/react';

const CropInsuranceForm = () => {
  

  const [formData, setFormData] = useState({
    policyNumber: '',
    premium: '',
    period: '',
    payoutAmount: '',
    agreedIndexLevel: ''
  });
  const { open } = useWeb3Modal()
  const { address } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
};


  const addCropInsurancee = async () => {
   
    try {

      if(!address){
        open()
      }

      const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
      console.log(ethersProvider,"ether");
      const signer = ethersProvider.getSigner()
      console.log(signer, "sinnger");

      const contract = new ethers.Contract(CROP_CONTRACT_ADDRESS, CROP_CONTRACT_ABI, signer)

    //  const payoutAmountInWei = ethers.utils.parseUnits(formData.payoutAmount, 18);


      let resp = await contract.addInsurancePolicy(
        ethers.BigNumber.from(formData.policyNumber),
        ethers.BigNumber.from(formData.premium),
        ethers.BigNumber.from(formData.period),
        ethers.BigNumber.from(formData.agreedIndexLevel),
        ethers.utils.parseUnits(formData.payoutAmount, 18)
      )
      await resp.wait()



  } catch (error) {
      console.log(error)
      
  }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your form submission logic here
  };
  return (
    <div className="flex flex-col items-center justify-center w-[600px] max-w-[100%] mx-auto bg-gray-100 p-4">
      {/* Policies Paragraph */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full mb-6 text-center">
        <p className="text-gray-700">
          At XYZ Insurance, we are committed to providing comprehensive crop insurance policies that protect against a variety of risks including weather damage, pest infestations, and other unpredictable events. Our policies are designed to ensure peace of mind for farmers, enabling them to focus on their agricultural activities with confidence.
        </p>
      </div>

      <div className="flex justify-center items-center w-[100%] bg-gray-100">
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-6 rounded-lg shadow-lg w-full"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Crop Insurance</h2>
      
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
        <div className="flex-1">
          <label className="block text-gray-700" htmlFor="policy Number">Policy Number</label>
          
          

<input
                        type="number"
                        name="policyNumber"
                        placeholder="Policy Number"
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                        value={formData.policyNumber}
                        onChange={handleChange}
                    />
        </div>

        <div className="flex-1 mt-4 md:mt-0">
          <label className="block text-gray-700" htmlFor="premium">Premium</label>
          <input 
            type="text" 
            id="premium" 
            name="premium" 
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={formData.premium}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
        <div className="flex-1">
          <label className="block text-gray-700" htmlFor="payoutAmount">payoutAmount</label>
          <input 
            type="number" 
            id="payoutAmount" 
            name="payoutAmount" 
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={formData.payoutAmount}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="flex-1 mt-4 md:mt-0">
          <label className="block text-gray-700" htmlFor="period">period</label>
          <input
                        type="number"
                        name="period"
                        placeholder="period"
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                        value={formData.period}
                        onChange={handleChange}
                    />
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700" htmlFor="agreedIndexLevel">Agreed Index Level</label>
        <input 
          type="text" 
          id="agreedIndexLevel" 
          name="agreedIndexLevel" 
          className="w-full p-2 border border-gray-300 rounded mt-2"
          value={formData.agreedIndexLevel}
          onChange={handleChange}
          required
        />
      </div>
      
       
      <button onClick={addCropInsurancee}
        type="submit" 
        className="w-full bg-[#424242] text-white p-2 rounded  transition"
      >
        Submit
      </button>
    </form>
  </div>


     
      {/* <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl ml-[100px] w-full text-center">
      <a
          href="https://othercompany.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Weather status
        </a>
      </div> */}
    </div>
  );
};

export default CropInsuranceForm;
