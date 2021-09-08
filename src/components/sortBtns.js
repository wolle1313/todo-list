const Menu = (props) => {
  const { click } = props;
  return (
    <div className="menuSort">
      <div onClick={(e) => click("wszystko", e.target)}>Wszystko</div>
      <div onClick={(e) => click("osobiste", e.target)}>Osobiste</div>
      <div onClick={(e) => click("praca", e.target)}>Praca</div>
      <div onClick={(e) => click("dom", e.target)}>Dom</div>
    </div>
  );
};

const SortBtns = (props) => {
  return (
    <div className="sorts">
      <h3>filtry</h3>
      <button onClick={props.clickImportant}>!</button>
      <button className="sortBy">Kategoria</button>
      <Menu click={props.clickMenu} />
    </div>
  );
};

export default SortBtns;
