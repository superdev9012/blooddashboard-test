import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ data }) => {
  const getRiskLevel = (value, type) => {
    switch (type) {
      case 'a1c':
        if (value >= 6.5) return 'bg-red-500 text-white'; // high-risk
        if (value >= 5.7) return 'bg-yellow-300'; // borderline
        break;
      case 'ldl':
        if (value >= 160) return 'bg-red-500 text-white'; // high-risk
        if (value >= 139) return 'bg-yellow-300'; // borderline
        break;
      case 'vitaminD':
        if (value < 20) return 'bg-red-500 text-white'; // high-risk
        if (value <= 30) return 'bg-yellow-300'; // borderline
        break;
      case 'bloodPressure': {
        const [systolic, diastolic] = value.split('/').map(Number); // Split and convert to numbers
        if (systolic >= 140 || diastolic >= 90) return 'bg-red-500 text-white'; // high-risk
        if (systolic >= 130 || diastolic >= 80) return 'bg-yellow-300'; // borderline
        break;
      }
      case 'glucose':
        if (value >= 126) return 'bg-red-500 text-white'; // high-risk
        if (value >= 100) return 'bg-yellow-300'; // borderline
        break;
      default:
        return '';
    }

    return '';
  };

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white border border-gray-300'>
        <thead>
          <tr className='bg-blue-400 text-gray-900 uppercase text-sm leading-normal'>
            <th className='py-3 px-6 text-left'>ID</th>
            <th className='py-3 px-6 text-left'>Date</th>
            <th className='py-3 px-6 text-left'>A1C</th>
            <th className='py-3 px-6 text-left'>LDL</th>
            <th className='py-3 px-6 text-left'>Vitamin D</th>
            <th className='py-3 px-6 text-left'>Blood Pressure</th>
            <th className='py-3 px-6 text-left'>Glucose</th>
          </tr>
        </thead>
        <tbody className='text-gray-600 text-sm font-light'>
          {data.map((row) => (
            <tr key={row.id} className='border-b border-gray-300 hover:bg-gray-100'>
              <td className='py-3 px-6'>{row.id}</td>
              <td className='py-3 px-6'>{row.date}</td>
              <td className={`py-3 px-6 ${getRiskLevel(row.a1c, 'a1c')}`}>{row.a1c} %</td>
              <td className={`py-3 px-6 ${getRiskLevel(row.ldl, 'ldl')}`}>{row.ldl} mg/dL</td>
              <td className={`py-3 px-6 ${getRiskLevel(row.vitaminD, 'vitaminD')}`}>
                {row.vitaminD} ng/mL
              </td>
              <td className={`py-3 px-6 ${getRiskLevel(`${row.bloodPressure}`, 'bloodPressure')}`}>
                {row.bloodPressure} mmHg
              </td>
              <td className={`py-3 px-6 ${getRiskLevel(row.glucose, 'glucose')}`}>
                {row.glucose} mg/dL
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Add prop types validation
Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      // Updated to specify the shape of the array items
      id: PropTypes.number.isRequired, // Assuming id is a number
      date: PropTypes.string.isRequired, // Assuming date is a string
      a1c: PropTypes.number.isRequired, // Assuming a1c is a number
      ldl: PropTypes.number.isRequired, // Assuming ldl is a number
      vitaminD: PropTypes.number.isRequired, // Assuming vitaminD is a number
      bloodPressure: PropTypes.shape({
        systolic: PropTypes.number.isRequired,
        diastolic: PropTypes.number.isRequired,
      }).isRequired, // Assuming bloodPressure is an object with systolic and diastolic properties
      glucose: PropTypes.number.isRequired, // Assuming glucose is a number
    })
  ).isRequired, // Validate that data is an array of objects and is required
};

export default Table;
