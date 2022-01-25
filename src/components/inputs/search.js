import PropTypes from "prop-types";
import styles from "./search.module.scss";

const Search = ({ data, onChange, title, id }) => {
  return (
    <div className={styles["search-input"]}>
      <label htmlFor={id}>{title}</label>
      <select className={styles["select-content"]} onChange={onChange} id={id}>
        {data.map((d) => (
          <option key={d.id} value={d.value}>
            {d.title}
          </option>
        ))}
      </select>
    </div>
  );
};

Search.propTypes = {
  onChange: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      value: PropTypes.string,
    })
  ),
};

export default Search;
