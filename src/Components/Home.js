import React, { useState } from 'react';
import { flightdata } from '../Data/flightdata';
import './Home.css';
import image from '../assets/images/down-arrow.svg';
import upArrow from '../assets/images/up-long.png';
import downArrow from '../assets/images/down-long.png';

const Home = () => {
    const [flights, setFlights] = useState(flightdata);
    const [sortOrder, setSortOrder] = useState({
        price: 'asc',
        duration: 'asc',
    });
    const [appliedFilters, setAppliedFilters] = useState([]);


    const handleSort = (filterType) => {
        const isAscending = sortOrder[filterType] === 'asc';
        const sortedFlights = [...flights].sort((a, b) => {
            if (filterType === 'price') {
                return isAscending ? a.price.rate - b.price.rate : b.price.rate - a.price.rate;
            } else if (filterType === 'duration') {
                const timeA = convertDurationToMinutes(a.duration);
                const timeB = convertDurationToMinutes(b.duration);
                return isAscending ? timeA - timeB : timeB - timeA;
            } else if(filterType === 'departure'){
                const depTimeA = convertTimeToMinutes(a.departure.time);
                const depTimeB = convertTimeToMinutes(b.departure.time);
                return isAscending ? depTimeA - depTimeB : depTimeB - depTimeA;

            } else if(filterType === 'arrival'){
                const arrTimeA = convertTimeToMinutes(a.arrival.time);
                const arrTimeB = convertTimeToMinutes(b.arrival.time);
                return isAscending ? arrTimeA - arrTimeB : arrTimeB - arrTimeA;
            }
            return 0;
        });
        setFlights(sortedFlights);
        setSortOrder({
            price: filterType === 'price' ? (isAscending ? 'desc' : 'asc') : 'asc',
            duration: filterType === 'duration' ? (isAscending ? 'desc' : 'asc') : 'asc',
            departure: filterType === 'departure' ? (isAscending ? 'desc' : 'asc') : 'asc',
            arrival: filterType === 'arrival' ? (isAscending ? 'desc' : 'asc') : 'asc'
        });
        if (!appliedFilters.includes(filterType)) {
            setAppliedFilters((prev) => [...prev, filterType]);
        }
    };

    const convertDurationToMinutes = (duration) => {
        const [hours, minutes] = duration.split('h').map((part) => parseInt(part));
        return (hours || 0) * 60 + (minutes || 0);
    };
    const convertTimeToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map((part) => parseInt(part));
        return (hours * 60) + minutes;
    };
    const removeFilter = (filterType) => {
        setAppliedFilters((prev) => prev.filter(filter => filter !== filterType));
        // Optionally reset sort order or any additional logic
        setSortOrder({
            price: 'asc',
            duration: 'asc',
        });
    };
    return (
        <div>
            <h4>Sort By</h4>
            <table>
                <thead >
                    <tr className="card">
                        <th>Departure
                        <img
                                className='imgClass'
                                src={sortOrder['departure'] === 'asc' ? upArrow : downArrow}
                                onClick={() => handleSort('departure')}
                                alt="Sort"
                                style={{ cursor: 'pointer', marginLeft: '5px' }}
                            />
                               {appliedFilters.includes('departure') && (
                                <span title='Remove Filter' onClick={() => removeFilter('departure')} style={{ cursor: 'pointer', marginLeft: '5px' }}>
                                    &times;
                                </span>
                            )}
                        </th>
                        <th >Duration <img
                                className='imgClass'
                                src={sortOrder['duration'] === 'asc' ? upArrow : downArrow}
                                onClick={() => handleSort('duration')}
                                alt="Sort"
                                style={{ cursor: 'pointer', marginLeft: '5px' }}
                            />
                               {appliedFilters.includes('duration') && (
                                <span title='Remove Filter' onClick={() => removeFilter('duration')} style={{ cursor: 'pointer', marginLeft: '5px' }}>
                                    &times;
                                </span>
                            )}</th>
                        <th>Arrival<img
                                className='imgClass'
                                src={sortOrder['arrival'] === 'asc' ? upArrow : downArrow}
                                onClick={() => handleSort('arrival')}
                                alt="Sort"
                                style={{ cursor: 'pointer', marginLeft: '5px' }}
                            />
                               {appliedFilters.includes('arrival') && (
                                <span title='Remove Filter' onClick={() => removeFilter('arrival')} style={{ cursor: 'pointer', marginLeft: '5px' }}>
                                    &times;
                                </span>
                            )}

                        </th>
                        <th >Price<img
                                className='imgClass'
                                src={sortOrder['price'] === 'asc' ? upArrow : downArrow}
                                onClick={() => handleSort('price')}
                                alt="Sort"
                                style={{ cursor: 'pointer', marginLeft: '5px' }}
                            />     {appliedFilters.includes('price') && (
                                <span title='Remove Filter' onClick={() => removeFilter('price')} style={{ cursor: 'pointer', marginLeft: '5px' }}>
                                    &times;
                                </span>
                            )}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map((flight) => (
                        <tr key={flight.id}  className="card">
                            <td>
                                <div className='textGrey anchorClass'><img src={flight.departure.image} alt="Departure" className='imgClassLogo' /><span>{flight.departure.name}</span> </div>
                                <div className='textGrey'>{flight.departure.place}</div>
                                <div className='timeClass'>{flight.departure.time}</div>
                                <div className='textGrey'>Partially Refundable</div>
                            </td>
                            <td>{flight.duration}</td>
                            <td>
                                <div className='textGrey'>{flight.arrival.place}</div>
                                <div className='timeClass'>{flight.arrival.time}</div>
                            </td>
                            <td>
                                <div className='timeClass'>₹{flight.price.rate}</div>
                                <div className='textGrey'>No cost EMI from <span className='textBlack'>{flight.price.emi}</span></div>
                            </td>
                            <td>
                                <div >
                                <button className='btn bookbutton'>Book</button><br />
                                <a className='anchorClass' href={`/main`} style={{ textDecoration: 'none' }}>Flight Details <img className='imgClass' src={image} /></a>
                                </div>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          
        </div>
    );
};

export default Home;
