import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Icons, IconButton, WithTooltip, TooltipMessage } from '@storybook/components';
import * as constants from './constants';

export default class DesigntimeTool extends Component {
  constructor(props) {
    super(props);
    this.api = props.api;
    this.channel = props.channel;
    this.state = {
      on: false
    };
  }

  change = args => {
    this.channel.emit(constants.EVENT_DESIGNTIME_TOGGLED, {
      on: args.on,
    });
    this.setState(args);
  };

  render() {
    return (
      <Fragment>
        <WithTooltip
          placement="top"
          trigger="hover"
          tooltip={<TooltipMessage desc="切换设计模式" />}
        >
          <IconButton key="designtime"
            title="设计模式"
            active={this.state.on}
            onClick={() => this.change({on: !this.state.on})}>
            <Icons icon="graphline" />
          </IconButton>
        </WithTooltip>
      </Fragment>
    )
  }
}

DesigntimeTool.propTypes = {
  api: PropTypes.shape({
    on: PropTypes.func,
  }).isRequired,
  channel: PropTypes.shape({
    emit: PropTypes.func,
    on: PropTypes.func,
    removeListener: PropTypes.func,
  }).isRequired,
};
