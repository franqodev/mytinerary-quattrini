import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import HeroItineraries from "../components/HeroItineraries"
import { Link } from "react-router-dom"
import Logo from "../assets/astroLoad.gif"
import Itinerary from "../components/Itinerary"
import { connect } from "react-redux"
import citiesActions from "../redux/actions/citiesActions"
import itinerariesActions from "../redux/actions/itinerariesActions"

const Itineraries = (props) => {
   const getCity = props.cities.find(
      (city) => city._id === props.match.params.id
   )
   if (!getCity) {
      props.history.push("/cities")
   }

   const [loading, setLoading] = useState(true)
   useEffect(() => {
      props
         .getItineraries(props.match.params.id)
         .then((res) => {
            if (res.success) {
               setLoading(false)
            } else {
               props.history.push("/error")
               return false
            }
         })
         .catch((err) => {
            console.log(err)
            props.history.push("/error")
         })
      // axios
      //    .get(`http://localhost:4000/api/itineraries`)
      //    .then((res) => {
      //       if (res.data.success && res.data.response) {
      //          setItineraries(res.data.response)
      //          // setLoading(false)
      //       }
      //    })
      //    .catch((err) => {
      //       console.log(err)
      //       props.history.push("/error")
      //    })

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   if (loading) {
      return (
         <div className="container load d-flex flex-column justify-content-center align-items-center m-5">
            <h2 className="loading text-center col-11 pt-5">Loading</h2>
            <img className="col-12 col-md-5" src={Logo} alt="Loader"></img>
            <h2 className="loading text-center col-11">Please wait</h2>
         </div>
      )
   }

   return (
      <>
         <Header></Header>
         <HeroItineraries
            getCity={getCity}
            history={props.history}
         ></HeroItineraries>

         <div className="underC container-fluid p-5 d-flex flex-column align-items-center justify-content-center">
            {props.itineraries.length === 0 ? (
               <h1>NO ITINERARIES</h1>
            ) : (
               props.itineraries.map((data) => {
                  return <Itinerary data={data} key={data.nameUser} />
               })
            )}

            <Link
               id="botonCTA"
               className="btn btn-light btn-xl mt-5"
               to="/cities"
               onClick={() => window.scrollTo(0, 0)}
            >
               Back To Cities
            </Link>
         </div>
         <Footer></Footer>
      </>
   )
}

const mapStateToProps = (state) => {
   return {
      city: state.cities.city,
      cities: state.cities.cities,
      itineraries: state.itineraries.itineraries,
   }
}

const mapDispatchToProps = {
   getCity: citiesActions.getCity,
   getItineraries: itinerariesActions.getItineraries,
}

export default connect(mapStateToProps, mapDispatchToProps)(Itineraries)
