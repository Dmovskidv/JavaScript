import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';

const Main = ({ commands, actions }) => {
  return (
    <React.Fragment>
      <span>{`React application ${[commands] || ''}`}</span>
      <input type="text" onChange={e => actions.setData(e.target.value)} />
    </React.Fragment>
  );
};

Main.propTypes = {
  commands: ImmutablePropTypes.list
};

const mapStateToProps = state => ({
  commands: state.get('commands') || ''
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);