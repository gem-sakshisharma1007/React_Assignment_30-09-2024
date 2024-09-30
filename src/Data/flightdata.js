import image1 from '../assets/images/spicejet-logo.png';
import image2 from '../assets/images/vistara-logo.jpg';

export const flightdata = [
    {
        id: 1,
        departure: {
            image: image2 ,
            name : 'Vistara',
            place: 'DEL New Delhi,India',
            time: '17: 45',
        },
        duration: '2h 20m',
        arrival: {
            place: 'BCM Mumbai,India',
            time: '20:05',
        },
        price: {
            rate: 6253,
            emi: '₹2085'
        }
    },
    {
        id: 2,
        departure: {
            image: image1,
            name : 'Spice jet',
            place: 'DEL New Delhi,India',
            time: '18:35',
        },
        duration: '2h 15m',
        arrival: {
            place: 'BCM Mumbai,India',
            time: '22:50',
        },
        price: {
            rate: 8776,
            emi: '₹2592'
        },
    },
    {
        id: 3,
        departure: {
            image: image1,
            name : 'Spice jet',
            place: 'DEL New Delhi,India',
            time: '19:45',
        },
        duration: '2h 20m',
        arrival: {
            place: 'BCM Mumbai,India',
            time: '22:05',
        },
        price: {
            rate: 7776,
            emi: '₹2593'
        }
    },
];