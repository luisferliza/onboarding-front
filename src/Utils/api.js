async function post(url = "", data = {}) {
  try {    
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const res = await response.json();    
    return res; // parses JSON response into native JavaScript objects
  } catch (error) {
    console.error(error);
  }
}

async function put(url = "", data = {}) {
  try {    
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const res = await response.json();    
    return res; // parses JSON response into native JavaScript objects
  } catch (error) {
    console.error(error);
  }
}

async function delBody(url = "", data = {}) {
  try {    
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url, {
      method: "DELETE",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const res = await response.json();    
    return res; // parses JSON response into native JavaScript objects
  } catch (error) {
    console.error(error);
  }
}

export { post, put, delBody };
