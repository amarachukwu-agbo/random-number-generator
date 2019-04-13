import React, { Fragment, useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import NumbersGrid from '../../components/NumbersGrid';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import Header from '../../components/Header';
import { getPhoneNumbers, getMinMaxNumbers } from '../../services';
import './index.scss';

const Generator = () => {
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [minMaxNumbers, setMinMaxNumbers] = useState([]);
  const [meta, setMeta] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);

  const getNumbers = async (page) => {
    try {
      const { phoneNumbers: numbers, meta: metaData } = await getPhoneNumbers(page);
      setPhoneNumbers(numbers);
      setError('');
      setMeta(metaData);
    } catch (err) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getMinMax = async () => {
    const { minMaxPhoneNumbers } = await getMinMaxNumbers();
    setMinMaxNumbers(minMaxPhoneNumbers);
  };

  useEffect(() => { getNumbers(); }, []);

  useEffect(() => { getMinMax(); }, []);

  return (
    <Fragment>
      <NavBar />
      <div className="generator__container">
        {
        loading ? (<div className="loader"><Loader /></div>) : (
          <Fragment>
            <Header meta={meta} minMaxNumbers={minMaxNumbers} />
            <NumbersGrid phoneNumbers={phoneNumbers} />
            <Pagination metaData={meta} changePage={getNumbers} />
          </Fragment>)
      }
      </div>
    </Fragment>
  );
};

export default Generator;
