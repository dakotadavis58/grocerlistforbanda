import Form from "./Form";

const App = () => {
  return (
    <div className="container align-middle h-100 d-flex bg-info">
      <div className="col">
        <div className="row justify-content-center align-self-center">
          <h1 className="text-center m-3">
            Grocery List App for Aiden and Britt
          </h1>
        </div>
        <Form />
      </div>
    </div>
  );
};
export default App;
