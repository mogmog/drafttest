import {Popover, Icon, Tag} from 'antd';

const photoEntry = (props) => {
  const {
    mention,
    theme,
    isFocused, // eslint-disable-line no-unused-vars
    searchValue, // eslint-disable-line no-unused-vars
    ...parentProps
  } = props;

  return (
    <div {...parentProps} >
      <span> <img src={`https://via.placeholder.com/150`}/>   </span>
    </div>
  );
};

export default photoEntry;
