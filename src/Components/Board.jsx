import { Link } from "react-router-dom";

const Board = ({ board }) => {
  return (
    <Link to={`/${board.id}`} className="remove-text-decoration">
      <div className="boards">{board.name}</div>
    </Link>
  );
};

export default Board;
