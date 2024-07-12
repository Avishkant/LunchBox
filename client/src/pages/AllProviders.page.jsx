import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { CircularProgress, Typography } from '@mui/material';
import HomeLayout from '../layouts/Home.layout';
import ProviderCard from '../components/ProviderCard';
import TopNavigation from '../components/TopNavigation';

function AllProvidersPage() {
  const provider = useSelector((state) => state.provider);
  const providers = useSelector((state) => state.provider.allProviders) || [];
  const breadcrumbs = [
    <Link to='/' underline="hover" key="1" className='text-blue-500 hover:underline'>
      Home
    </Link>,
    <Typography key="3" className='text-gray-800 font-semibold'>
      All Providers
    </Typography>
  ];
  const [searchedProviders, setSearchedProviders] = useState([]);
  const [allProviders, setAllProviders] = useState(providers);
  const [searchData, setSearchData] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    setAllProviders(providers);
  }, [providers]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
    if (searchData.length === 0) {
      setSearchedProviders([]);
      setIsSearch(false);
    }
  };

  const handleSearch = () => {
    let updatedSearchedProviders = [];
    setIsSearch(true);
    if (searchData.length === 0) {
      setSearchedProviders([]);
      setIsSearch(false);
    } else {
      updatedSearchedProviders = allProviders.filter((provider) =>
        provider.address.toLowerCase().includes(searchData.toLowerCase())
      );
      setSearchedProviders(updatedSearchedProviders);
    }
  };

  if (provider.loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-50 to-white'>
        <CircularProgress />
      </div>
    );
  }

  if (!provider.loading && providers.length === 0) {
    return (
      <p className='text-center text-lg font-semibold text-gray-500 py-4'>
        No Providers Found
      </p>
    );
  }

  return (
    <div className='bg-gradient-to-r from-teal-50 to-white min-h-screen py-10'>
      <div className='max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 bg-white shadow-lg rounded-xl overflow-hidden'>
        <TopNavigation breadcrumbs={breadcrumbs} />
        <div className='relative my-8'>
          <input
            type="text"
            onKeyDown={handleKeyDown}
            name="search"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            placeholder='Search Provider Near You'
            className='w-full py-3 px-4 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition-transform duration-300 ease-in-out hover:shadow-lg'
          />
          <button
            onClick={handleSearch}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-primary hover:text-white hover:bg-primary p-2 rounded-full shadow-md transition-transform duration-300 ease-in-out hover:shadow-lg'
          >
            <BiSearch size={24} />
          </button>
        </div>
        <h1 className='text-2xl font-bold text-center text-primary mb-6'>
          All Tiffin Providers
        </h1>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'>
          {(searchedProviders.length > 0 ? searchedProviders : providers).map((item, index) => (
            <ProviderCard
              name={item.name}
              key={index}
              providerLogo={item.providerLogo}
              address={item.address}
              rating={item.rating}
              id={item._id}
              className='transition-transform transform hover:scale-105 duration-300 ease-in-out shadow-lg p-4 bg-white rounded-lg hover:bg-gray-100'
            />
          ))}
        </div>
        {isSearch && searchData.length > 0 && searchedProviders.length === 0 && (
          <p className='text-center text-lg font-semibold text-gray-500 py-4'>
            No Providers Found
          </p>
        )}
      </div>
    </div>
  );
}

export default HomeLayout(AllProvidersPage);
