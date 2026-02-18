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
      msg = data?.error || data?.message || msg;
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
      msg = data?.error || data?.message || msg;
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
            msg = data?.error || data?.message || msg;
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

//UI-funktio: renderöi tehtävälista
function render() {
  //Tyhjennetään vanha lista
  taskList.innerHTML = "";
  //Käydään tehtävät läpi ja luodaan niistä DOM-elementit
  for (const task of tasks) {
    const li = document.createElement("li");

    //Näytetään tehtävän otsikko ja status
    const text = document.createElement("span");
    text.textContent = `${task.title} [${task.status}]`;
    text.style.marginRight = "12px";

    //toggle status napin luonti
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle Status";
    toggleBtn.type = "button";
    toggleBtn.addEventListener("click", async () => {
    try {
        const newStatus = task.status === "todo" ? "done" : "todo";
        setStatus(`Päivitetään status -> ${newStatus}...`);
        await apiUpdateTask(task.id, { status: newStatus });
        await loadTasks();
        setStatus(`Status päivitetty: ${task.title} -> ${newStatus}`);
    } catch (err) {
        console.error(err);
        setStatus(`Virhe päivitettäessä status: ${err.message}`);
    }
    });

    //delete napin luonti
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.type = "button";
    deleteBtn.style.marginLeft = "8px";
    deleteBtn.addEventListener("click", async () => {
        try {
            setStatus(`Poistetaan tehtävä...`);
            await apiDeleteTask(task.id);
            await loadTasks();
            setStatus(`Tehtävä poistettu: ${task.title}`);
        } catch (err) {
            console.error(err);
            setStatus(`Virhe poistaessa tehtävää: ${err.message}`);
        }
    });
    //edit napin luonti
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.type = "button";
    editBtn.style.marginLeft = "8px";
    editBtn.addEventListener("click", async () => {
        const newTitle = prompt("Uusi otsikko:", task.title);
        if (newTitle === null) return; // Käyttäjä peruutti
        const trimmedTitle = newTitle.trim();
        if (!trimmedTitle) {
            setStatus("Virhe: title ei voi olla tyhjä.");
            return;
        }


        try {
            setStatus("Päivitetään title..");
            await apiUpdateTask(task.id, { title: trimmedTitle });
            await loadTasks();
            setStatus(`Title päivitetty: ${task.title} -> ${trimmedTitle}`);    
        } catch (err) {
            console.error(err);
            setStatus(`Virhe päivitettäessä title: ${err.message}`);
        }
    });

    //Lisätään napit ja teksti listaelementtiin
    li.appendChild(text);
    li.appendChild(toggleBtn);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    //Lisätään tehtävä listaan
    taskList.appendChild(li);
  }
}

//aseta status
function setStatus(message) {
  statusElement.textContent = message;
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

//Alustetaan UI
loadTasks();
