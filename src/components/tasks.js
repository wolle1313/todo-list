const CurrentTask = (props) => {
  const { name, date, category, important, description } = props.task;
  const betterDate = `${date.slice(11, 13)}:${date.slice(14, 16)} ${date.slice(
    8,
    10
  )}-${date.slice(5, 7)}-${date.slice(0, 4)}`;
  return (
    <div className={important ? "task imp" : "task"}>
      <h1>{name}</h1>
      <h3>{description}</h3>
      <h2 className="todo">Termin ukończenia: {betterDate}</h2>
      <span className={"category " + category}>{category}</span>
      {important ? <h2 className="important">Ważne</h2> : null}
      <button
        className="finishTask"
        onClick={() => props.clickFinished(props.task)}
      >
        Zrobione!
      </button>
      <button
        className="removeTask"
        onClick={() => props.clickRemove(name, false)}
      >
        X
      </button>
    </div>
  );
};

const PastTask = (props) => {
  const { name, date, finishDate } = props.pastTask;
  const betterDate = `${date.slice(8, 10)}-${date.slice(5, 7)}-${date.slice(
    0,
    4
  )} ${date.slice(11, 13)}:${date.slice(14, 16)} `;
  return (
    <div className="task pastTask">
      <h1>{name}</h1>
      <h2>Termin ukończenia: {betterDate}</h2>
      <h2>Data wykonania: {finishDate}</h2>
      <button
        className="removeTask"
        onClick={() => props.clickRemove(name, true)}
      >
        X
      </button>
    </div>
  );
};

const Tasks = (props) => {
  function sortTasks(tasks) {
    let tasked = tasks.sort((a, b) => {
      const values = [a.date, b.date].map(
        (el) =>
          `${el.slice(0, 4)}${el.slice(5, 7)}${el.slice(8, 10)}${el.slice(
            11,
            13
          )}${el.slice(14, 16)}`
      );
      return values[0] - values[1];
    });
    if (props.currentSort !== "wszystko") {
      tasked = tasked.filter((el) => el.category === props.currentSort);
    }
    if (props.important === true) {
      tasked = tasked.filter((el) => el.important === true);
    }
    return tasked;
  }
  const sortedTasks = sortTasks(props.tasks);
  const renderTasks = sortedTasks.map((task) => (
    <CurrentTask
      key={task.id}
      task={task}
      clickRemove={props.clickRemove}
      clickFinished={props.clickFinished}
    />
  ));
  const renderPastTasks = props.pastTasks.map((pastTask) => (
    <PastTask
      clickRemove={props.clickRemove}
      key={pastTask.id}
      pastTask={pastTask}
    />
  ));
  return (
    <div className="tasks">
      <div className="currentTasks">
        <h1 className="taskTitle">Zdania do wykonania({props.tasks.length})</h1>
        {renderTasks.length ? (
          renderTasks
        ) : (
          <h2>Dodaj swoje pierwsze zadanie wyżej!</h2>
        )}
      </div>
      <div className="pastTasks">
        <h1 className="taskTitle">Zdania wykonane({props.pastTasks.length})</h1>
        {renderPastTasks.length ? (
          renderPastTasks
        ) : (
          <h2>Nie ukończono jeszcze żadnych zadań</h2>
        )}
      </div>
    </div>
  );
};

export default Tasks;
