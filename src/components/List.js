const List = (props) => {
  return (
    <ul className="list-unstyled text-center m-4">
      {props.list.map((item, index) => (
        <li className="" key={index}>
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default List;
