import { useState } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  const {user, axios, fetchUser} = useAppContext();
  const location = useLocation();
  const [image, setImage] = useState("");
  const updateImage = async () => {
    try {
      const formData = new FormData()
      formData.append('image', image)
      const {data} = await axios.post('/api/owner/update-image', formData)
      if(data.success){
        fetchUser
        toast.success(data.message)
        setImage('')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };
  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm">
      <div className="group relative">
        <label htmlFor="image">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid"
            }
            alt="User Image"
            className="size-9 md:size-14 rounded-full mx-auto"

          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="absolute inset-0 hidden group-hover:flex items-center justify-center cursor-pointer rounded-full bg-black/10">
            <img src={assets.edit_icon} alt="Edit Icon" />
          </div>
        </label>
      </div>
      {image && (
        <button onClick={updateImage} className="absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer">
          <img
            src={assets.check_icon}
            alt="Check Icon"
            width={13}
          />
        </button>
      )}
      <p className="mt-2 text-base max-md:hidden">{user?.name}</p>
      <div className="w-full">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative py-3 pl-4 flex items-center gap-2 w-full first:mt-6 ${
              location.pathname === link.path
                ? "bg-primary/10 text-primary"
                : "text-gray-600"
            }`}
          >
            <img
              src={
                link.path === location.pathname ? link.coloredIcon : link.icon
              }
              alt="Menu Icon"
            />
            <span className="max-md:hidden">{link.name}</span>
            <div
              className={`${
                link.path === location.pathname && "bg-primary"
              } w-1.5 h-8 rounded-l right-0 absolute`}
            ></div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
