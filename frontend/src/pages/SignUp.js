import Header from "../components/Header"
import Footer from "../components/Footer"
import Back from "../assets/travel.jpg"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { connect } from "react-redux"
import usersActions from "../redux/actions/usersActions"

const SignUp = (props) => {
   const [countries, setCountries] = useState([])
   const [newUser, setNewUser] = useState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      picture: "",
      country: "",
   })
   useEffect(() => {
      axios
         .get("https://restcountries.eu/rest/v2/all?fields=name")
         .then((res) => setCountries(res.data))
      return false
   }, [])

   const inputHandler = (e) => {
      setNewUser({
         ...newUser,
         [e.target.name]: e.target.value,
      })
   }
   const submitForm = () => {
      if (Object.values(newUser).some((value) => value === "")) {
         Swal.fire({
            text: "All the fields are required",
            icon: "warning",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
         })
      } else {
         props
            .postUser(newUser)
            .then((res) => {
               if (res.success) {
                  Swal.fire({
                     icon: "success",
                     title: "Account created successfully",
                     showConfirmButton: false,
                     timer: 2500,
                     timerProgressBar: true,
                  })
                  setNewUser({
                     firstname: "",
                     lastname: "",
                     email: "",
                     password: "",
                     picture: "",
                     country: "",
                  })
               } else {
                  Swal.fire({
                     icon: "error",
                     text: "There is already an account with this email",
                     showConfirmButton: false,
                     timer: 2500,
                     timerProgressBar: true,
                  })
               }
            })
            .catch((err) => {
               console.log(err)
            })
      }
   }

   return (
      <>
         <Header />
         <section
            className="bg-image backSignUp d-flex justify-content-center align-items-center"
            style={{ backgroundImage: `url(${Back})` }}
         >
            <div className="container form-contain d-flex flex-column p-3">
               <h1 className="text-center text-white">Create Account!</h1>
               <form className="row g-3 d-flex justify-content-center p-3">
                  <div className="col-md-7">
                     <input
                        type="text"
                        className="form-control"
                        name="firstname"
                        value={newUser.firstname}
                        placeholder="FirstName"
                        onChange={inputHandler}
                        autoComplete="none"
                     ></input>
                  </div>
                  <div className="col-md-7">
                     <input
                        type="text"
                        className="form-control"
                        name="lastname"
                        value={newUser.lastname}
                        placeholder="LastName"
                        onChange={inputHandler}
                        autoComplete="none"
                     ></input>
                  </div>
                  <div className="col-md-7">
                     <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={newUser.email}
                        placeholder="Email"
                        onChange={inputHandler}
                        autoComplete="none"
                     ></input>
                  </div>
                  <div className="col-md-7">
                     <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={newUser.password}
                        placeholder="Password"
                        onChange={inputHandler}
                        autoComplete="none"
                     ></input>
                     <div className="form-text text-white ps-2">
                        You need a minimum of 6 characters.
                     </div>
                  </div>
                  <div className="col-md-7">
                     <input
                        type="url"
                        className="form-control"
                        name="picture"
                        value={newUser.picture}
                        placeholder="URL picture profile"
                        onChange={inputHandler}
                        autoComplete="none"
                     ></input>
                  </div>
                  <div className="col-md-7">
                     <select
                        id="inputState"
                        name="country"
                        value={newUser.select}
                        className="form-select"
                        onChange={inputHandler}
                     >
                        <option defaultValue>Choose your country:</option>
                        {countries.map((country, index) => (
                           <option value={country.name} key={index}>
                              {country.name}
                           </option>
                        ))}
                     </select>
                  </div>
               </form>
               <div className="col-12 text-center">
                  <button
                     type="submit"
                     className="btn btn-success btn-lg px-2 mt-1"
                     onClick={submitForm}
                  >
                     Sign Up
                  </button>
               </div>
               <div className="col-12 text-center">
                  <h4 className="text-white pt-3">Already have an account?</h4>
                  <Link to="/login" className="text-white">
                     Log In here!
                  </Link>
               </div>
            </div>
         </section>
         <Footer />
      </>
   )
}

const mapDispatchToProps = {
   postUser: usersActions.postUser,
}

export default connect(null, mapDispatchToProps)(SignUp)
