import PropTypes from "prop-types";
import styles from "./character.module.scss";

const imagePath = (avatar) => {
  return `/characters/${avatar}`;
};

const Character = ({ avatar, name, category, description }) => {
  return (
    <div className={styles["Card"]}>
      <img className={styles["Card-img"]} src={imagePath(avatar)} alt={name} />
      <div className={styles["Card-content"]}>
        <p className={styles["Name"]}>{name}</p>
        <p className={styles["Category"]}>{category}</p>
        <p className={styles["Description"]}>{description}</p>
      </div>
    </div>
  );
};

Character.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string,
  description: PropTypes.string,
};

export default Character;
