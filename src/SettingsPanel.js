import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as events from '@storybook/core-events';
import { styled } from '@storybook/theming';
// https://github.com/storybooks/storybook/search?q=channel.on&unscoped_q=channel.on
// https://storybook.js.org/docs/addons/writing-addons/
import { EVENT_ID } from './events';


export default class SettingsPanel extends Component {
  state = { source: 'loading...' };

  componentDidMount() {
    this.mounted = true;
    const { channel } = this.props;
    channel.on(EVENT_ID, this.listener);
  }

  componentDidUpdate() {
    if (this.selectedStoryRef) {
      this.selectedStoryRef.scrollIntoView();
    }
  }

  componentWillUnmount() {
    const { channel } = this.props;
    channel.removeListener(EVENT_ID, this.listener);
  }

  listener = ({ source, currentLocation, locationsMap }) => {
    this.setState({
      source,
      currentLocation,
      locationsMap,
    });
  };

  render() {
    const { active } = this.props;
    const { source } = this.state;
    console.log('SettingsPanel++++++++++++++++++++++++++++', this.props)
    return active ? <div>Setings</div> : null;
  }
}

SettingsPanel.propTypes = {
  active: PropTypes.bool.isRequired,
  api: PropTypes.shape({
    selectStory: PropTypes.func.isRequired,
  }).isRequired,
  channel: PropTypes.shape({
    emit: PropTypes.func,
    on: PropTypes.func,
    removeListener: PropTypes.func,
  }).isRequired,
};
