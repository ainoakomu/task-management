//DOM-hooks: Liitospinta user interfaceen
const titleInput = document.querySelector("#titleInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");
const statusElement = document.querySelector("#status");

//API-base URL: sama origin, koska backend ja frontend samassa palvelussa
const API_BASE = "";

//API-funktio: hakee tehtävät backendistä
async function apiGetTasks() {
  const res = await fetch(`${API_BASE}/tasks`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}
//API-funktio: luo uusi tehtävä backendissä
async function apiCreateTask(title) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, status: "todo" }),
  });

  if (!res.ok) {
    //Yritetään lukea virheviestintä backendiltä
    let msg = `POST /tasks failed: ${res.status}`;
    try {
      const errorData = await res.json();
      msg = errorData?.error || errorData?.message || msg;
    } catch {
      //Ei onnistuttu lukemaan JSON-virhettä, käytetään yleisempää viestintää
      throw new Error(msg);
    }
    return res.json();
  }
}
//API_funktio: poistaa tehtävä backendissä
async function apiDeleteTask(id) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: "DELETE",
  });
  //Yritetään lukea virheviestintä backendiltä
    if (!res.ok) {
    let msg = `DELETE /tasks/${id} failed: ${res.status}`;
    try {
      const errorData = await res.json();
      msg = errorData?.error || errorData?.message || msg;
    } catch {
      throw new Error(msg);
    }
    return true;
  }  
}
//API-funktio: päivittää tehtävän status backendissä
async function apiUpdateTask(id, patch) {
    const res= await fetch(`${API_BASE}/tasks/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(patch),
    });
    if (!res.ok) {
        let msg = `PATCH /tasks/${id} failed: ${res.status}`;
        try {
            const errorData = await res.json();
            msg = errorData?.error || errorData?.message || msg;
        } catch {
            throw new Error(msg);
        }
        return res.json();
    }
}

//UI-funktio: lataa tehtävät backendistä ja renderöi ne
async function loadTasks() {
  setStatus("Ladataan tehtäviä...");
  try {
    tasks = await apiGetTasks();
    setStatus(`Tehtävät ladattu (${tasks.length} kpl)`);
    render();
  } catch (err) {
    setStatus(`Virhe ladattaessa tehtäviä: ${err.message}`);
    console.error("Error loading tasks:", err); 
  }
}
//Local state: myöhemmin backend datasta haettava tehtävälista
let tasks = [];
let editingTaskId = null;
let editingTitle = "";

//UI-funktio: renderöi tehtävälista
function render() {
  taskList.innerHTML = "";

  for (const task of tasks) {
    const li = document.createElement("li");

    const left = document.createElement("div");
    left.className = "meta";

    const badge = document.createElement("span");
    badge.className = `badge ${task.status}`;
    badge.textContent = task.status.toUpperCase();

    // Inline edit: jos tämä task on edit-tilassa, näytä input + Save/Cancel.
    // Muuten näytä normaali teksti + Edit-nappi.
    if (editingTaskId === task.id) {
      const input = document.createElement("input");
      input.type = "text";
      input.value = editingTitle;
      input.style.marginRight = "8px";

      // Autofocus + kursori loppuun
      setTimeout(() => {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }, 0);

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.type = "button";
      saveBtn.style.marginLeft = "8px";

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.type = "button";
      cancelBtn.style.marginLeft = "8px";

      async function save() {
        const trimmed = editingTitle.trim();
        if (!trimmed) {
          setStatus("Virhe: title ei voi olla tyhjä.");
          return;
        }

        try {
          setStatus("Päivitetään title..");
          await apiUpdateTask(task.id, { title: trimmed });
          editingTaskId = null;
          editingTitle = "";
          await loadTasks();
          setStatus(`Title päivitetty: ${task.title} -> ${trimmed}`);
        } catch (err) {
          console.error(err);
          setStatus(`Virhe päivitettäessä title: ${err.message}`, true);
        }
      }

      input.addEventListener("input", (e) => {
        editingTitle = e.target.value;
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") save();
        if (e.key === "Escape") {
          editingTaskId = null;
          editingTitle = "";
          render();
          setStatus("Edit peruttu.");
        }
      });

      saveBtn.addEventListener("click", save);
      cancelBtn.addEventListener("click", () => {
        editingTaskId = null;
        editingTitle = "";
        render();
        setStatus("Edit peruttu.");
      });

      left.appendChild(input);
      left.appendChild(saveBtn);
      left.appendChild(cancelBtn);
    } else {
      const text = document.createElement("strong");
      text.textContent = task.title;

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.type = "button";
      editBtn.style.marginLeft = "8px";
      editBtn.addEventListener("click", () => {
        editingTaskId = task.id;
        editingTitle = task.title;
        render();
        setStatus(`Muokataan: ${task.title}`);
      });

      left.appendChild(text);
      left.appendChild(editBtn);
    }

    left.appendChild(badge);

    const right = document.createElement("div");
    right.className = "row";

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = task.status === "todo" ? "Mark done" : "Mark todo";
    toggleBtn.type = "button";
    toggleBtn.addEventListener("click", async () => {
      try {
        const newStatus = task.status === "todo" ? "done" : "todo";
        setStatus(`Päivitetään status → ${newStatus}...`);
        await apiUpdateTask(task.id, { status: newStatus });
        await loadTasks();
        setStatus(`Status päivitetty: ${task.title} → ${newStatus}`);
      } catch (err) {
        setStatus(`Virhe päivitettäessä status: ${err.message}`, true);
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.type = "button";
    deleteBtn.addEventListener("click", async () => {
      try {
        setStatus("Poistetaan tehtävä...");
        await apiDeleteTask(task.id);
        await loadTasks();
        setStatus("Tehtävä poistettu.");
      } catch (err) {
        setStatus(`Virhe poistossa: ${err.message}`, true);
      }
    });

    right.appendChild(toggleBtn);
    right.appendChild(deleteBtn);

    li.appendChild(left);
    li.appendChild(right);

    taskList.appendChild(li);
  }
}

//aseta status
function setStatus(text, isError = false) {
  statusElement.textContent = text;
  statusElement.classList.toggle("danger", isError);
}

//UI-funktio: lisää uusi tehtävä
addBtn.addEventListener("click", async () => {
  const title = titleInput.value.trim();

  if (!title) {
    setStatus("Virhe: title ei voi olla tyhjä.");
    return;
  }

  setStatus("Luodaan tehtävää...");

  try {
    await apiCreateTask(title);
    titleInput.value = "";
    await loadTasks();
    setStatus(`Lisätty: "${title}"`);
  } catch (err) {
    console.error(err);
    setStatus(`Virhe: ${err.message}`);
  }
});

//Enter-näppäin lisää tehtävän
titleInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});
//Alustetaan UI
loadTasks();
