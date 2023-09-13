import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DoneIcon from '@mui/icons-material/Done';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CloseIcon from '@mui/icons-material/Close';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import '../app/cards.css'

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
            <h2 className="title text-3xl font-bold">Title 1</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl">Map &nbsp;<p className="map_written_b">
            (মানচিত্র) </p></h3>
            <button className="circular-button">{<LocationOnIcon />}</button>
            </div>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl">Food Places &nbsp;<p className="map_written_b">
            (খাবারের জায়গা) </p></h3>
            <div className="badge-container">
              
            <span className="badge">Food</span>
            <span className="badge">Route</span>
            </div>
            </div>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl">Transits &nbsp;<p className="map_written_b">
            (গণপরিবহন) </p></h3>
            <div className="badge-container">
            <span className="badge">Food</span>
            <span className="badge">Foodz</span>
            <span className="badge">Foodzzzz</span>
            <span className="badge">Foodzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzzzzzzzzzzzzz</span>
            <span className="badge">Foodzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzz</span>
            <span className="badge">Foodzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzzzzzzzzzzzzzz zzzzzzzzzzzzzzzzzzzzz</span>
            <span className="badge">Route</span>
        </div>
            </div>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl pb-8">Prices &nbsp;<p className="map_written_b">
            (যাত্রা খরচ) </p></h3>
            <table className="fare_table border-collapse table-auto w-full text-sm">
  <thead>
    <tr>
      <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left font-bold text-xl">Medium</th>
      <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left font-bold text-xl">Fare</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Bus</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
      
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Hire</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
      
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Pool</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Go</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Xl</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Premier</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Local Taxi</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
  </tbody>
</table>

            </div>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl pb-8">Weather &nbsp;<p className="map_written_b">
            (আবহাওয়া) </p></h3>
            <div className="flex justify-between">
            <div className="flex flex-col">
				<span className="text-6xl font-bold">29°C</span>
				<span className="font-semibold mt-1 text-gray-500">Mudjimba, QLD</span>
        </div>
        {<WbSunnyIcon style={{ color: 'yellow', fontSize: '3em'}}/>}
			</div>
            </div>
          </div>
          
        </div>
        <div className="card">
          <div className="info">
            <div className="button_container">
              <button className="mark-right">{<DoneOutlineIcon/>}</button>
              <button className="mark-wrong">{<CloseIcon/>}</button>
            </div>
            <h2 className="title text-3xl font-bold">Title 2</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl">Map &nbsp;<p className="map_written_b">
            (মানচিত্র) </p></h3>
            <button className="circular-button">{<LocationOnIcon />}</button>
            </div>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl">Food Places &nbsp;<p className="map_written_b">
            (খাবারের জায়গা) </p></h3>
            <div className="badge-container">
            <span className="badge">Food</span>
            <span className="badge">Foodz</span>
            <span className="badge">Foodzzzz</span>
            <span className="badge">Foodzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzzzzzzzzzzzzz</span>
            <span className="badge">Foodzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzz</span>
            <span className="badge">Foodzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzzzzzzzzzzzzzz zzzzzzzzzzzzzzzzzzzzz</span>
            <span className="badge">Route</span>
        </div>
            </div>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl">Transits &nbsp;<p className="map_written_b">
            (গণপরিবহন) </p></h3>
            <div className="badge-container">
            <span className="badge">Food</span>
            <span className="badge">Route</span>
        </div>
            </div>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl pb-8">Prices &nbsp;<p className="map_written_b">
            (যাত্রা খরচ) </p></h3>
            <table className="fare_table border-collapse table-auto w-full text-sm">
  <thead>
    <tr>
      <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left font-bold text-xl">Medium</th>
      <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left font-bold text-xl">Fare</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Bus</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
      
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Hire</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
      
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Pool</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Go</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Xl</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Premier</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Local Taxi</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
  </tbody>
</table>

            </div>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl pb-8">Weather &nbsp;<p className="map_written_b">
            (আবহাওয়া) </p></h3>
            <div className="flex justify-between">
            <div className="flex flex-col">
				<span className="text-6xl font-bold">29°C</span>
				<span className="font-semibold mt-1 text-gray-500">Mudjimba, QLD</span>
        </div>
        {<WbSunnyIcon style={{ color: 'yellow', fontSize: '3em'}}/>}
			</div>
            </div>
          </div>
          
        </div>
        <div className="card">
          <div className="info">
            <div className="button_container">
              <button className="mark-right">{<DoneOutlineIcon/>}</button>
              <button className="mark-wrong">{<CloseIcon/>}</button>
            </div>
            <h2 className="title text-3xl font-bold">Title 3</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl">Map &nbsp;<p className="map_written_b">
            (মানচিত্র) </p></h3>
            <button className="circular-button">{<LocationOnIcon />}</button>
            </div>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl">Food Places &nbsp;<p className="map_written_b">
            (খাবারের জায়গা) </p></h3>
            <div className="badge-container">
            <span className="badge">Food</span>
            <span className="badge">Foodz</span>
            <span className="badge">Foodzzzz</span>
            <span className="badge">Foodzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzzzzzzzzzzzzz</span>
            <span className="badge">Foodzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzz</span>
            <span className="badge">Foodzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzzzzzzzzzzzzzz zzzzzzzzzzzzzzzzzzzzz</span>
            <span className="badge">Route</span>
        </div>
            </div>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl">Transits &nbsp;<p className="map_written_b">
            (গণপরিবহন) </p></h3>
            <div className="badge-container">
            <span className="badge">Food</span>
            <span className="badge">Route</span>
        </div>
            </div>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl pb-8">Prices &nbsp;<p className="map_written_b">
            (যাত্রা খরচ) </p></h3>
            <table className="fare_table border-collapse table-auto w-full text-sm">
  <thead>
    <tr>
      <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left font-bold text-xl">Medium</th>
      <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left font-bold text-xl">Fare</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Bus</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
      
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Hire</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
      
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Pool</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Go</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Xl</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Premier</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Local Taxi</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
  </tbody>
</table>

            </div>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl pb-8">Weather &nbsp;<p className="map_written_b">
            (আবহাওয়া) </p></h3>
            <div className="flex justify-between">
            <div className="flex flex-col">
				<span className="text-6xl font-bold">29°C</span>
				<span className="font-semibold mt-1 text-gray-500">Mudjimba, QLD</span>
        </div>
        {<WbSunnyIcon style={{ color: 'yellow', fontSize: '3em'}}/>}
			</div>
            </div>
          </div>
          
        </div>
        <div className="card">
          <div className="info">
            <div className="button_container">
              <button className="mark-right">{<DoneOutlineIcon/>}</button>
              <button className="mark-wrong">{<CloseIcon/>}</button>
            </div>
            <h2 className="title text-3xl font-bold">Title 4</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl">Map &nbsp;<p className="map_written_b">
            (মানচিত্র) </p></h3>
            <button className="circular-button">{<LocationOnIcon />}</button>
            </div>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl">Food Places &nbsp;<p className="map_written_b">
            (খাবারের জায়গা) </p></h3>
            <div className="badge-container">
            <span className="badge">Food</span>
            <span className="badge">Foodz</span>
            <span className="badge">Foodzzzz</span>
            <span className="badge">Foodzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzzzzzzzzzzzzz</span>
            <span className="badge">Foodzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzz</span>
            <span className="badge">Foodzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzzzzzzzzzzzzzz zzzzzzzzzzzzzzzzzzzzz</span>
            <span className="badge">Route</span>
        </div>
            </div>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl">Transits &nbsp;<p className="map_written_b">
            (গণপরিবহন) </p></h3>
            <div className="badge-container">
            <span className="badge">Food</span>
            <span className="badge">Route</span>
        </div>
            </div>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl pb-8">Prices &nbsp;<p className="map_written_b">
            (যাত্রা খরচ) </p></h3>
            <table className="fare_table border-collapse table-auto w-full text-sm">
  <thead>
    <tr>
      <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left font-bold text-xl">Medium</th>
      <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left font-bold text-xl">Fare</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Bus</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
      
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Hire</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
      
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Pool</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Go</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Xl</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Premier</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Local Taxi</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
  </tbody>
</table>

            </div>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl pb-8">Weather &nbsp;<p className="map_written_b">
            (আবহাওয়া) </p></h3>
            <div className="flex justify-between">
            <div className="flex flex-col">
				<span className="text-6xl font-bold">29°C</span>
				<span className="font-semibold mt-1 text-gray-500">Mudjimba, QLD</span>
        </div>
        {<WbSunnyIcon style={{ color: 'yellow', fontSize: '3em'}}/>}
			</div>
            </div>
          </div>
          
        </div>
        <div className="card">
          <div className="info">
            <div className="button_container">
              <button className="mark-right">{<DoneOutlineIcon/>}</button>
              <button className="mark-wrong">{<CloseIcon/>}</button>
            </div>
            <h2 className="title text-3xl font-bold">Title 5</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl">Map &nbsp;<p className="map_written_b">
            (মানচিত্র) </p></h3>
            <button className="circular-button">{<LocationOnIcon />}</button>
            </div>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl">Food Places &nbsp;<p className="map_written_b">
            (খাবারের জায়গা) </p></h3>
            <div className="badge-container">
            <span className="badge">Food</span>
            <span className="badge">Foodz</span>
            <span className="badge">Foodzzzz</span>
            <span className="badge">Foodzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzzzzzzzzzzzzz</span>
            <span className="badge">Foodzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzz</span>
            <span className="badge">Foodzzzz</span>
            <span className="badge">Foodzzzzzzzzzzzzzzzzzzzzzzzz zzzzzzzzzzzzzzzzzzzzz</span>
            <span className="badge">Route</span>
        </div>
            </div>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl">Transits &nbsp;<p className="map_written_b">
            (গণপরিবহন) </p></h3>
            <div className="badge-container">
            <span className="badge">Food</span>
            <span className="badge">Route</span>
        </div>
            </div>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl pb-8">Prices &nbsp;<p className="map_written_b">
            (যাত্রা খরচ) </p></h3>
            <table className="fare_table border-collapse table-auto w-full text-sm">
  <thead>
    <tr>
      <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left font-bold text-xl">Medium</th>
      <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left font-bold text-xl">Fare</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Bus</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
      
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Hire</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
      
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Pool</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Go</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Xl</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Uber Premier</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
    <tr>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">Local Taxi</td>
      <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">₹ 100/-</td>
    </tr>
  </tbody>
</table>

            </div>
            <div className="map_info">
            <h3 className="map-written font-bold text-xl pb-8">Weather &nbsp;<p className="map_written_b">
            (আবহাওয়া) </p></h3>
            <div className="flex justify-between">
            <div className="flex flex-col">
				<span className="text-6xl font-bold">29°C</span>
				<span className="font-semibold mt-1 text-gray-500">Mudjimba, QLD</span>
        </div>
        {<WbSunnyIcon style={{ color: 'yellow', fontSize: '3em'}}/>}
			</div>
            </div>
          </div>
          
        </div>
      </div>
      </div>
    </div>
  );
}

export default Cards;
