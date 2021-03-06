// import React, { useState } from "react"
import CardCity from "./CardCity"
import imgSearch from "../assets/lupaMundo.png"
import notFoundimg from "../assets/notFound.png"
import { Link } from "react-router-dom"
import Logo from "../assets/astroLoad.gif"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import citiesActions from "../redux/actions/citiesActions"
import { ImSearch } from "react-icons/im"

const CitiesData = (props) => {
   const [loading, setLoading] = useState(true)
   useEffect(() => {
      props
         .getCities()
         .then((res) => {
            if (res.success) {
               setLoading(false)
            } else {
               props.history.push("/error")
            }
         })
         .catch((err) => {
            console.log(err)
            props.history.push("/error")
         })
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   if (loading) {
      return (
         <div className="container load d-flex flex-column justify-content-center align-items-center my-5">
            <h2 className="loading text-center col-11 mt-4 pt-5">Loading</h2>
            <img className="col-12 col-md-5" src={Logo} alt="Loader"></img>
            <h2 className="loading text-center col-11">Please wait</h2>
         </div>
      )
   }

   const searchHandler = (e) => {
      props.filterCities(e.target.value)
   }

   return (
      <section className="page-section" id="about">
         <div className="container px-3 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
               <div className="col-12 text-center">
                  <div className="d-flex flex-column justify-content-center align-items-center">
                     <h2 className="h2Cities">Find your destination ↓</h2>
                     <img
                        className="col-12 col-md-7"
                        src={imgSearch}
                        alt="imgSearch"
                     ></img>
                     <div className="search col-12 col-md-6 d-flex align-items-center">
                        <ImSearch className="iconsSign" />
                        <input
                           className="search2"
                           type="search"
                           placeholder="Search here ..."
                           onChange={searchHandler}
                        ></input>
                     </div>

                     <hr id="dividerCities" className="divider" />
                  </div>
               </div>
            </div>
         </div>
         <div className="backCard p-2 pt-5">
            {props.citiesSearch.length === 0 ? (
               <div className="container d-flex flex-column align-items-center justify-content-center">
                  <h2 className="h2Search col-12 col-md-9 text-center">
                     Sorry, it seems that what you are looking for cannot be
                     found.
                  </h2>
                  <img className="imgNF" src={notFoundimg} alt="notFound"></img>
                  <h2 className="searchB col-12 col-md-9 text-center">
                     Try another please...
                  </h2>
               </div>
            ) : (
               props.citiesSearch.map((city) => {
                  return <CardCity city={city} key={city.name} />
               })
            )}
         </div>
         <div className="d-flex mt-5 justify-content-center align-items-center">
            <Link
               id="botonCTA"
               className="btn btn-light btn-xl"
               to="/"
               onClick={() => window.scrollTo(0, 0)}
            >
               Back to Home
            </Link>
         </div>
      </section>
   )
}

const mapStateToProps = (state) => {
   return {
      citiesSearch: state.cities.citiesSearch,
      token: state.users.token,
   }
}

const mapDispatchToProps = {
   getCities: citiesActions.getCities,
   filterCities: citiesActions.filterCities,
}

export default connect(mapStateToProps, mapDispatchToProps)(CitiesData)
