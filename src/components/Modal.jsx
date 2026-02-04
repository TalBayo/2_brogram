import ReactDOM from "react-dom";


export default function Modal(props) {
  const { showExerciseDescription, handleCloseModel } = props;
  const { name, description } = showExerciseDescription || {};

  return ReactDOM.createPortal(
    <div className="modal-container" onClick={handleCloseModel}>
      <button className="modal-underlay" onClick={handleCloseModel} />
      <div className="modal-content">
        <div>
          <h6>Name</h6>
          <h2 className="skill-name">{name.replaceAll("-", " ")}</h2>
        </div>
        <div>
          <h6>Description</h6>
          <p>{description}</p>
        </div>
      </div>
    </div>,
    document.getElementById("portal"),
  );
}
