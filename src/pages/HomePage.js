import { Button, Modal, Spinner } from 'flowbite-react';
import { useState } from 'react';
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
  const [summarize, setSummarize] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSummarize = async (data) => {
    setOpenModal(true);
    setLoading(true);

    const prompt = `Please analyze the following medical metrics data: ${data}.
              From the given patient's health metrics: A1C, LDL, Vitamin D, Blood Pressure, and Glucose values, evaluate the risk level for each metric. 
              Base the evaluation on the following thresholds:
              A1C: Borderline Risk is ≥ 5.7%, High Risk is ≥ 6.5%.
              LDL: Borderline Risk is ≥ 130 mg/dL, High Risk is ≥ 160 mg/dL.
              Vitamin D: Borderline Risk is ≤ 30 ng/mL, High Risk is < 20 ng/mL.
              Blood Pressure: Borderline Risk is ≥ 130/80 mmHg, High Risk is ≥ 140/90 mmHg.
              Glucose: Borderline Risk is ≥ 100 mg/dL, High Risk is ≥ 126 mg/dL.
              
              As analysis data, it should be 3 sentences.`;

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2',
        prompt,
        options: { temperature: 0.8 },
      }),
    };

    const response = await fetch('http://127.0.0.1:11434/api/generate', requestOptions);

    const reader = response.body?.getReader();

    if (reader) {
      let serverResponse = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          setLoading(false);
          break;
        }

        const decodedValue = new TextDecoder('utf-8').decode(value);

        try {
          const { response, done, context } = JSON.parse(decodedValue);

          if (response) {
            serverResponse += response;
            tempHistory[tempIndex].prompt = serverResponse;
            setHistory([...tempHistory]);
          }

          if (done) {
            setSummarize(context);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  return (
    <div>
      <Table data={sampleData} onSummarize={(data) => onSummarize(data)} />
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Summarize</Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            {loading ? (
              <Spinner aria-label='Default status example' />
            ) : (
              <p className=' text-gray-500 dark:text-gray-400'>{summarize}</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className='flex justify-end'>
          <Button onClick={() => setOpenModal(false)}>Okay</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HomePage;
