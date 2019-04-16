import React, { Fragment, useState, useEffect } from 'react';
import toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css';
import NavBar from '../../components/NavBar';
import NumbersGrid from '../../components/NumbersGrid';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import Header from '../../components/Header';
import {
  getPhoneNumbers,
  generatePhoneNumbers,
  getNumberBatches,
} from '../../services';
import Helper from './Helper';
import './index.scss';

toastr.options = {
  positionClass: 'toast-top-center',
};
const Generator = () => {
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [minMaxNumbers, setMinMaxNumbers] = useState({});
  const [meta, setMeta] = useState({});
  const [batchID, setBatchID] = useState('');
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const updateStateData = (numbers, metaData, currentBatch, minMax) => {
    setPhoneNumbers(numbers);
    setLoading(true);
    setError('');
    setMeta(metaData);
    setBatchID(currentBatch);
    setMinMaxNumbers(minMax);
  };
  const getBatchPhoneNumbers = async (page = 1, batch = batchID) => {
    try {
      const {
        phoneNumbers: numbers, meta: metaData, minMaxPhoneNumbers, batchID: currentBatch,
      } = await getPhoneNumbers({ batch, page });
      updateStateData(numbers, metaData, currentBatch, minMaxPhoneNumbers);
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  const getBatchNumbers = async (batch) => {
    setBatchID(batch);
    getBatchPhoneNumbers(1, batch);
  };

  const generateNumbers = async () => {
    try {
      const {
        generatedNumbers, minMaxPhoneNumbers: minAndMax, meta: numbersMeta, batchID: currentBatch,
      } = await generatePhoneNumbers();
      updateStateData(generatedNumbers, numbersMeta, currentBatch, minAndMax);
      setBatches([currentBatch, ...batches]);
      Helper.saveNumbersToFile(generatedNumbers, currentBatch);
      toastr.success('New numbers generated successfully');
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };
  const getBatches = async () => {
    try {
      const { batchIDs } = await getNumberBatches();
      setBatches(batchIDs);
    } catch (err) {
      toastr.error(err);
    }
  };

  useEffect(() => {
    getBatchPhoneNumbers();
    getBatches();
  }, []);

  const renderChildren = () => {
    if (error) {
      return (
        <div className="loader">
          <p className="error">
            { error.includes('404') ? 'No numbers have been generated' : error }
          </p>
        </div>
      );
    }
    if (loading) {
      return (<div className="loader"><Loader /></div>);
    }
    return (
      <Fragment>
        <Header
          totalCount={meta.totalCount}
          minMaxNumbers={minMaxNumbers}
          batchID={batchID}
          batches={batches}
          getNumbers={getBatchNumbers}
        />
        <NumbersGrid phoneNumbers={phoneNumbers} />
        <Pagination metaData={meta} changePage={getBatchPhoneNumbers} />
      </Fragment>
    );
  };

  return (
    <Fragment>
      <NavBar generateNumbers={generateNumbers} loading={loading} />
      <div className="generator__container">
        { renderChildren() }
      </div>
    </Fragment>
  );
};

export default Generator;
