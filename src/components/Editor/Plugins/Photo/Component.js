import {Icon} from 'antd';

const photoComponent = (showImage) => (mentionProps) => {

  return (
    <span className={'mention'} style={{ "userSelect": 'none'}}
          onClick={() => {
            showImage && showImage(mentionProps.mention);
          }}
    >

         image <Icon type={'camera'}/>
        </span>
  )
}

export default photoComponent;

