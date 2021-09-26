import React, {useContext} from "react";
import { useForm } from "react-hook-form";
import {UserContext} from "../../App";
import "./Shipment.css"

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
      console.log(data);
  }

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="ship_form" onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue={loggedInUser.name} {...register("nameRequired", { required: true })} placeholder="your name" />
      {errors.nameRequired && <span className="error">Name is required</span>}
      
      <input name="email" defaultValue={loggedInUser.email} {...register("emailRequired", { required: true })} placeholder="your Email"/>
      {errors.emailRequired && <span className="error">Email is required</span>}

      <input name="address" {...register("addressRequired", { required: true })} placeholder="your address"/>
      {errors.addressRequired && <span className="error">address is required</span>}
     
      <input name="phone" {...register("phoneNumberRequired", { required: true })} placeholder="your phone number"/>
      {errors.phoneNumberRequired && <span className="error">Phone numer is required</span>}

      <input type="submit" />
    </form>
  );
};

export default Shipment;
