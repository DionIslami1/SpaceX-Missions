import React from 'react'
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";


const GET_LAUNCHES = gql`
  {
    launchesPast ( limit: 10 ) {
      mission_name
      details
      id
      links {
        flickr_images
      }
      rocket {
        rocket_name
        second_stage {
          payloads {
            payload_type
            payload_mass_kg
            payload_mass_lbs
          }
        }
    }
    }
  }
`;
function Home() {
  const { errors, loading, data } = useQuery(GET_LAUNCHES);
  return (
    <>
      <h1>SpaceX Missions</h1>
      <div className='boxes'>

        {errors ? "Error!" : loading ? "Loading..." : data.launchesPast.map(({ mission_name, details, links, id, rocket, }) => (
          <Link className='box' to={{ pathname: `/Mission/${id}` }} key={id}>
            <h2>{mission_name}</h2>
            <p>{details}</p>
            <img className='img' src={links.flickr_images} alt="" />

          </Link>
        ))}
      </div>
    </>
  );
}

export default Home