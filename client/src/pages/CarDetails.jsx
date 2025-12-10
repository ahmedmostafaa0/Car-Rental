import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const CarDetails = () => {
  const {
    axios,
    cars,
    pickupDate,
    returnDate,
    setPickupDate,
    setReturnDate,
    currency,
    navigate,
  } = useAppContext();
  const { id } = useParams();
  const [car, setCar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/bookings/create", {
        car: id,
        pickupDate,
        returnDate,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setCar(cars.find((car) => car._id === id));
  }, [cars, id]);

  return car ? (
    <div className="mt-16 px-6 md:px-16 lg:px-24 xl:px-32">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 cursor-pointer mb-6"
      >
        <img
          src={assets.arrow_icon}
          alt="Arrow Icon"
          className="size-4.5 rotate-180 opacity-65"
        />
        Back to all cars
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <motion.img
                initial={{opacity: 0, scale:.98}}
      animate={{opacity: 1, scale:1}}
      transition={{duration: .5}}
            src={car.image}
            alt="Car"
            className="rounded-xl object-cover w-full h-auto md:max-h-100 mb-6 shadow-md"
          />
          <motion.div 
                initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: .5, delay:.2}}
          className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-500 text-lg">
                {car.category} • {car.year}
              </p>
            </div>
            <hr className="border-borderColor" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: assets.users_icon,
                  text: `${car.seating_capacity} Seats`,
                },
                { icon: assets.fuel_icon, text: car.fuel_type },
                { icon: assets.car_icon, text: car.transmission },
                { icon: assets.location_icon, text: car.location },
              ].map(({ icon, text }) => (
                <motion.div
                      initial={{opacity: 0, y:10}}
      animate={{opacity: 1, y:0}}
      transition={{duration: .4}}
                  key={text}
                  className="flex flex-col items-center bg-light p-4 rounded-lg"
                >
                  <img src={icon} alt={text} className="h-5 mb-2" />
                  {text}
                </motion.div>
              ))}
            </div>
            <div>
              <h1 className="text-xl font-medium mb-3">Description</h1>
              <p className="text-gray-500">{car.description}</p>
            </div>
            <div>
              <h1 className="text-xl font-medium mb-3">Features</h1>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "360 Camera",
                  "Bluetooth",
                  "GPS",
                  "Heated Seats",
                  "Rear View Model",
                ].map((item) => (
                  <li key={item} className="flex items-center text-gray-500">
                    <img
                      src={assets.check_icon}
                      alt="Check Icon"
                      className="h-4 mr-2"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
        <motion.form
              initial={{opacity: 0, y:30}}
      animate={{opacity: 1, y:0}}
      transition={{duration: .6, delay:.3}}
          onSubmit={handleSubmit}
          className="shadow-lg rounded-xl p-6 space-y-6 sticky h-max top-18 text-gray-600"
        >
          <p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
            {currency} {car.pricePerDay}{" "}
            <span className="text-base text-gray-400 font-normal">per day</span>
          </p>
          <hr className="border-borderColor" />
          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date">Pickup Date</label>
            <input
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              type="date"
              id="pickup-date"
              required
              min={new Date().toISOString().split("T")[0]}
              className="border border-borderColor px-3 py-2 rounded-lg outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="return-date">Return Date</label>
            <input
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              type="date"
              id="return-date"
              required
              min={new Date().toISOString().split("T")[0]}
              className="border border-borderColor px-3 py-2 rounded-lg outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dull  transition-all py-3 font-medium text-white rounded-xl cursor-pointer"
          >
            Book Now
          </button>
          <p className="text-center text-sm">
            No credit card required to reserve
          </p>
        </motion.form>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default CarDetails;
