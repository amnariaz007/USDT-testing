import React, { useState, useContext } from 'react'
import { CROP_CONTRACT_ABI, CROP_CONTRACT_ADDRESS } from '../../constant';
import { ethers } from 'ethers';
import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers5/react';


export const Farmer = () => {

  const { open } = useWeb3Modal()
  const { address } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  const RegisterFarmer = async () => {
    try {

      if (!address) {
        open()
      }

      const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
      console.log(ethersProvider, "ether");
      const signer = ethersProvider.getSigner()
      console.log(signer, "sinnger");

      const contract = new ethers.Contract(CROP_CONTRACT_ADDRESS, CROP_CONTRACT_ABI, signer)

      let resp = await contract.registerFarmer()
      await resp.wait()
    } catch (error) {
      console.log(error)

    }
  }

  

  const RegisterInsuranceProvider = async () => {
    try {

      if (!address) {
        open()
      }

      const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
      console.log(ethersProvider, "ether");
      const signer = ethersProvider.getSigner()
      console.log(signer, "sinnger");

      const contract = new ethers.Contract(CROP_CONTRACT_ADDRESS, CROP_CONTRACT_ABI, signer)

      let resp = await contract.registerInsuranceProvider()
      await resp.wait()
    } catch (error) {
      console.log(error)

    }
  }

  const RegisterWeatherProvider = async () => {
    try {

      if (!address) {
        open()
      }

      const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
      console.log(ethersProvider, "ether");
      const signer = ethersProvider.getSigner()
      console.log(signer, "sinnger");

      const contract = new ethers.Contract(CROP_CONTRACT_ADDRESS, CROP_CONTRACT_ABI, signer)

      let resp = await contract.registerWeatherProvider()
      await resp.wait()
    } catch (error) {
      console.log(error)

    }
  }







  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <h2 className="text-2xl font-bold mb-6 text-center">Register  Farmer</h2>
      <button onClick={RegisterFarmer}
        type="submit"
        className="w-full bg-[#424242] text-white p-2 rounded  transition"
      >
        Register Farmer
      </button>

      <button onClick={RegisterInsuranceProvider}
        type="submit"
        className="w-full bg-[#424242] text-white p-2 rounded  transition"
      >
        Register Insurance Provider
      </button>

      <button onClick={RegisterWeatherProvider}
        type="submit"
        className="w-full bg-[#424242] text-white p-2 rounded  transition"
      >
        Register WeatherProvider
      </button>

    </div>
  )
}



