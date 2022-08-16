import React from 'react'
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import Sidebar from './Sidebar';

const GET_LAUNCHES = gql`
 query Get_LaunchesPast {
    launchesPast {
        mission_name
        details
        id
        links {
            flickr_images
            video_link
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
        ships {
            name
            home_port
            image
          }
    }
  }
`;

function Mision() {
    let { urlid } = useParams();

    const { errors, loading, data } = useQuery(GET_LAUNCHES);
    if (loading) return 'Loading...';
    if (errors) return `Error!`;
    return (
        <div className='mission'>
            < Sidebar />
            <div className='mission-container'>
                <h1>SpaceX Mission</h1>
                <div className='boxes'>

                    {data.launchesPast.map(({ mission_name, details, id, links, rocket, }) => (
                        id === urlid ?
                            <div className='box' to={{ pathname: `/Mission/${id}` }} key={id}>
                                <h2>{mission_name}</h2>
                                <p>{details}</p>
                                <img className='img' src={links.flickr_images} alt="" />
                                <div className='rocket-details'>
                                    <div>Rocket Name: <b>{rocket.rocket_name}</b></div>
                                    <div>Youtube Link:  <b><a href={links.video_link}>{links.video_link}</a></b></div>
                                </div>
                            </div>
                            : ''
                    )
                    )}
                </div>
            </div>

        </div>
    );
}

export default Mision