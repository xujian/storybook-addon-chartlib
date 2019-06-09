import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Icons, IconButton, WithTooltip, TooltipLinkList } from '@storybook/components';
import { SET_STORIES } from '@storybook/core-events';
import { INITIAL_THEMES, DEFAULT_THEME } from './defaults';
import * as constants from './constants';

const toList = items =>
  items ? Object.entries(items).map(([id, value]) => ({ ...value, id })) : [];

const createItem = (id, name, value, change) => ({
  id: id || name,
  title: name,
  onClick: () => {
    change({ selected: id, expanded: false });
  },
  right: ``,
  value,
});

const getState = (props, state, change) => {
  const data = props.api.getCurrentStoryData();
  const themes = data && data.parameters && data.parameters.themes;
  const list = toList(themes || INITIAL_THEMES);
  const selected =
    state.selected === 'dark' || list.find(i => i.id === state.selected)
      ? state.selected
      : list.find(i => i.default) || DEFAULT_THEME;
  const items = list.map(({ id, name, styles: value }) => createItem(id, name, value, change));
  return {
    items,
    selected,
  };
};

const IconButtonWithLabel = styled(IconButton)(() => ({
  display: 'inline-flex',
  alignItems: 'center',
}));

const IconButtonLabel = styled.div(({ theme }) => ({
  fontSize: theme.typography.size.s2 - 1,
  marginLeft: '10px',
}));

export default class ThemeTool extends Component {
  constructor(props) {
    super(props);
    this.api = props.api;
    this.channel = props.channel;
    this.state = {
      items: [],
      selected: 'dark',
      expanded: false,
    };
    this.listener = () => {
      this.setState({
        selected: null,
      });
    };
  }

  componentDidMount() {
    const { api } = this.props;
    api.on(SET_STORIES, this.listener);
  }

  componentWillUnmount() {
    const { api } = this.props;
    api.off(SET_STORIES, this.listener);
  }

  change = args => {
    this.channel.emit(constants.EVENT_THEME_CHANGED, {
      theme: args.selected,
    });
    this.setState(args);
  };

  render() {
    const { expanded } = this.state;
    const { items, selected } = getState(this.props, this.state, this.change);
    const item = items.find(i => i.id === selected);
    let buttonTitle = '';
    if (item) {
      buttonTitle = `${item.title}`;
    }

    return items.length ? (
      <Fragment>
        <WithTooltip
          placement="top"
          trigger="click"
          tooltipShown={expanded}
          onClick={s => this.setState({ expanded: s })}
          tooltip={<TooltipLinkList links={items} />}
          closeOnClick
        >
          <IconButtonWithLabel key="theme" title="色彩主题" active={!!item}>
            <Icons icon="chroma" />
            <IconButtonLabel>{buttonTitle}</IconButtonLabel>
          </IconButtonWithLabel>
        </WithTooltip>
      </Fragment>
    ) : null;
  }
}

ThemeTool.propTypes = {
  api: PropTypes.shape({
    on: PropTypes.func,
  }).isRequired,
  channel: PropTypes.shape({
    emit: PropTypes.func,
    on: PropTypes.func,
    removeListener: PropTypes.func,
  }).isRequired,
};
