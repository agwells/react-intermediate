import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clickFrogAction } from '../../actions/actions';

import holeMask from 'assets/img/hole-mask.svg';

import './hole.scss';

interface Props {
  id: number;
  active: boolean;
  dispatch: any;
}
export class Hole extends Component<Props> {
  constructor (props) {
    super(props);

    this.frogClick = this.frogClick.bind(this);
  }

  frogClick () {
    this.props.dispatch(clickFrogAction(this.props.id));
  }

  render () {
    let frogClass = 'frog';

    if (this.props.active) {
      frogClass = 'frog up';
    }

    return (
      <div className="hole-container">
        <div className="hole">
          <div className={frogClass} onClick={this.frogClick}></div>
          <img src={holeMask} className='hole-mask' />
        </div>
      </div>
    );
  }
}


const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(Hole);
