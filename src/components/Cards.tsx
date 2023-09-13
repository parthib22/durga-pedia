import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DoneIcon from '@mui/icons-material/Done';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CloseIcon from '@mui/icons-material/Close';
import '../app/card.css'

function Cards() {
  return (
    <div className="timeline-bck">
    <div className="timeline">
      <div className="outer">
        <div className="card">
          <div className="info">
            <div className="button_container">
              <button className="mark-right">{<DoneOutlineIcon/>}</button>
              <button className="mark-wrong">{<CloseIcon/>}</button>
            </div>
            <h2 className="title">Title 1</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <h3 className="map-written">Map</h3>
            <button className="circular-button">{<LocationOnIcon />}</button>
            <div className="badge-container">
            <span className="badge">Food</span>
            <span className="badge">Route</span>
        </div>
          </div>
          
        </div>
        <div className="card">
          <div className="info">
            <div className="button_container">
              <button className="mark-right">{<DoneOutlineIcon/>}</button>
              <button className="mark-wrong">{<CloseIcon/>}</button>
            </div>
            <h2 className="title">Title 2</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <h3 className="map-written">Map</h3>
            <button className="circular-button">{<LocationOnIcon />}</button>
            <div className="badge-container">
            <span className="badge">Food</span>
            <span className="badge">Route</span>
        </div>
          </div>
          
        </div>
        <div className="card">
          <div className="info">
            <div className="button_container">
              <button className="mark-right">{<DoneOutlineIcon/>}</button>
              <button className="mark-wrong">{<CloseIcon/>}</button>
            </div>
            <h2 className="title">Title 3</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <h3 className="map-written">Map</h3>
            <button className="circular-button">{<LocationOnIcon />}</button>
            <div className="badge-container">
            <span className="badge">Food</span>
            <span className="badge">Route</span>
        </div>
          </div>
          
        </div>
        <div className="card">
          <div className="info">
            <div className="button_container">
              <button className="mark-right">{<DoneOutlineIcon/>}</button>
              <button className="mark-wrong">{<CloseIcon/>}</button>
            </div>
            <h2 className="title">Title 4</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <h3 className="map-written">Map</h3>
            <button className="circular-button">{<LocationOnIcon />}</button>
            <div className="badge-container">
            <span className="badge">Food</span>
            <span className="badge">Route</span>
        </div>
          </div>
          
        </div>
        <div className="card">
          <div className="info">
            <div className="button_container">
              <button className="mark-right">{<DoneOutlineIcon/>}</button>
              <button className="mark-wrong">{<CloseIcon/>}</button>
            </div>
            <h2 className="title">Title 5</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <h3 className="map-written">Map</h3>
            <button className="circular-button">{<LocationOnIcon />}</button>
            <div className="badge-container">
            <span className="badge">Food</span>
            <span className="badge">Route</span>
        </div>
          </div>
          
        </div>
      </div>
      </div>
    </div>
  );
}

export default Cards;
