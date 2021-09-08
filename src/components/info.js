const Info = () => {
  return (
    <div id="intro">
      <h1>Lista zadań do wykonania</h1>
      <span>
        Lista przechowuje nazwę, opis zadania oraz datę którą użytkownik ustawi
        na termin wykonania.
      </span>
      <span>
        Po wykonaniu kliknij "wykonane" aby przesunąć zadanie do "zadania
        wykonane".
      </span>
      <span>
        Jeżeli chcesz usunąć zadania kliknij "x" a zniknie ono bez śladu!
      </span>
      <span>Opis zadania jest ograniczony do 100 znaków</span>
      <span>A nazwa do 50</span>
    </div>
  );
};

export default Info;
