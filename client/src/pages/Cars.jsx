import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import CarCard from "../components/CarCard";
import { useSearchParams } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { useAppContext } from './../context/AppContext';
import {motion} from 'motion/react'

const Cars = () => {
  const {axios, cars} = useAppContext()
  const [input, setInput] = useState('')
  const [searchParams] = useSearchParams()
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const isSearchData = pickupLocation && pickupDate && returnDate
  const [filteredCars, setFilteredCars] = useState([])

  const applyFilter = () => {
    if(input === ''){
      setFilteredCars(cars)
      return null
    }

    const filtered = cars.filter(car => {
      return car.brand.toLowerCase().includes(input.toLowerCase())
      || car.model.toLowerCase().includes(input.toLowerCase())
      || car.category.toLowerCase().includes(input.toLowerCase())
      || car.transmission.toLowerCase().includes(input.toLowerCase())
    })
    setFilteredCars(filtered)
  }

  const searchCarAvailability = async () => {
    try {
      const {data} = await axios.post('/api/bookings/check-availability', {location: pickupLocation, pickupDate, returnDate})
      if(data.success){
        setFilteredCars(data.availableCars)
        data.availableCars.length === 0 && toast('No cars available')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    isSearchData && searchCarAvailability()
  }, [])

  useEffect(() => {
    cars.length > 0 && !isSearchData && applyFilter()
  }, [input, cars])
  return (
    <div>
      <motion.div
      initial={{opacity: 0, y:30}}
      animate={{opacity: 1, y:0}}
      transition={{duration: .6, ease: 'easeOut'}}
      className="flex flex-col items-center py-20 bg-light max-md:px-4">
        <Title title='Available Cars' subTitle='Browse our selection of premium vehicles available for your next adventure' />
        <motion.div
        initial={{opacity: 0, y:20}}
        animate={{opacity: 1, y:0}}
        transition={{duration: .5, delay:.3}}
        className="flex items-center bg-white px-4 mt-6 w-full max-w-140 h-12 rounded-full shadow">
          <img src={assets.search_icon} alt="Search Icon" className="size-4.5 mr-2" />
          <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Search by make, model, or features" className="h-full w-full outline-none text-gray-500" />
          <img src={assets.filter_icon} alt="Search Icon" className="size-4.5 ml-2" />
        </motion.div>
      </motion.div>
      <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: .5, delay:.6}}
      className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto ">Showing {filteredCars.length} Cars</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 xl:px-20 max-w-7xl mx-auto">
          {filteredCars.map((car, index) => (
            <motion.div 
             initial={{opacity: 0, y:20}}
            animate={{opacity: 1, y:0}}
            transition={{duration: .4, delay:.1 * index}}
            key={index}>
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Cars;
