import style from './index.module.css';

function Share(props) {
  return <div className={style.container}>{props.children}</div>;
}

export default Share;
