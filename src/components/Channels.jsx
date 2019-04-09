import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { channels: { byId, allIds } } = state;
  const channels = allIds.map(id => byId[id]);
  return { channels };
};

const Channels = ({ channels }) => (
  <ul className="list-group col-3">
    {channels.map(({ id, name }) => (
      <li className="list-group-item list-group-item-action" key={id}>
        <button type="button" className="btn btn-link">{name}</button>
      </li>
    ))}
  </ul>
);

export default connect(mapStateToProps)(Channels);
