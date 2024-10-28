import Table from '../components/Table';

const HomePage = () => {
  const sampleData = [
    {
      id: '001',
      date: '2023-07-01',
      a1c: 5.6,
      ldl: 120,
      vitaminD: 18,
      bloodPressure: '120/80',
      glucose: 98,
    },
    {
      id: '002',
      date: '2023-06-15',
      a1c: 6.1,
      ldl: 145,
      vitaminD: 25,
      bloodPressure: '130/85',
      glucose: 110,
    },
    {
      id: '003',
      date: '2023-05-10',
      a1c: 6.4,
      ldl: 160,
      vitaminD: 15,
      bloodPressure: '140/90',
      glucose: 126,
    },
  ];

  return <Table data={sampleData} />;
};

export default HomePage;
