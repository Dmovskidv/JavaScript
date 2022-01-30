import React, { useEffect, useState } from 'react';
import ArrowIcon from '@mui/icons-material/ArrowUpward';
import FilesList from './FilesList';

import './FileManager.css';


const FileManager = () => {
  const host = 'http://localhost:8000';
  const defaultURL = 'file-manager/api/files';

  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [url, setURL] = useState('');
  const [checked, setChecked] = useState(false);

  const loadData = (path) => {
    fetch(`${host}/${defaultURL}?${path ? `path=${path}` : ''}`)
      .then(data => data.json())
      .then(filesInfo => setData(filesInfo))
      .catch(err => {
        console.log(err);
        setData([]);
      })
  }

  useEffect(loadData, []);

  const handleClick = (fileName) => {
    let path;
    if (fileName && typeof fileName === 'string') {
      path = query ? `${url ? `${url}/` : ''}${query}/${fileName}` : `${url ? `${url}/` : ''}${fileName}`;
      setQuery(prev => `${prev}/${fileName}`);
    } else {
      path = `${url ? `${url}/` : ''}${query.substring(0, query.lastIndexOf('/'))}`;
      setQuery(query.substring(0, query.lastIndexOf('/')));      
    }
    loadData(path);
  };

  const handleBlur = () => {
    const regexp = new RegExp(/^([a-z]:((\\|\/|\\\\|\/\/))|(\\\\|\/\/))[^<>:"|?*]+/i);
    if (url && regexp.test(url)) {
      loadData(url);
    }
  };

  const handleCheckBoxSelect = e => {
    setChecked(e.target.checked);
    if (!e.target.checked && url) {
      setURL('');
    }
  };

  return (
    <main>
      {query && <ArrowIcon fontSize='large' onClick={handleClick} />}
      <h1>File manager</h1>
      <input
        value={url || ''}
        type='text'
        onChange={e => setURL(e.target.value ? e.target.value : '')}
        onBlur={handleBlur}
        disabled={!checked}
      />
      <input
        type='checkbox'
        defaultChecked={checked}
        onChange={handleCheckBoxSelect}
      />
      <span>Use custom path</span>     
      <FilesList
        data={data}
        handleClick={handleClick}
        title={`Current directory: ${url || 'files'}${query}`}
      />      
    </main>
  );
};

export default FileManager;
