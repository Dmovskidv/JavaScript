import React from 'react';
import PropTypes from 'prop-types';
import { Folder as FolderIcon, Article as FileIcon } from '@mui/icons-material';

const FilesList = ({ data, title, handleClick }) => {
  return data.length ? (
    <div className="files-list-group">
      <div className='current-directory-label'>{title}</div>
      <ul className='list-items'>
        {data && data.map((file, id) => {
          return (
            <li key={id} className='item' onClick={() => handleClick(file.name)}>
                <span>{file.isDirectory ? <FolderIcon /> : <FileIcon />}</span>
                {file.name}
            </li>
          )
        })}
      </ul>
    </div>
  ) : <span>There is no directory or files</span>;
};

FilesList.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default FilesList;