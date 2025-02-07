const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000"

async function get_medicine_names(image: File, token?: string){
    const formData = new FormData();
    formData.append("image", image);
    if(token){
        formData.append("token", token);
    }
    try {
      const response = await fetch(`${SERVER_URL}/get_medicine_names`, {
        method: "POST",
        body: formData,
      });
      if (response.status !== 200) {
        throw new Error("File upload unsuccessful!");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Upload failed:", error)
      throw error;
    }
}

async function get_medicine_links(name: string){
  try{
    const formData = new FormData()
    formData.append("name", name);
    const response = await fetch(`${SERVER_URL}/get_medicine_links`, {
      method: "POST",
      body: formData
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch medicine links!");
    }
    const data = await response.json();
    return data;
  }catch(err){
    console.error(err);
    throw err;
  }
}

async function get_location(geoLocation: {latitude: number, longitude: number}){
  try{
    const formData = new FormData()
    formData.append("geoLocation", JSON.stringify(geoLocation));
    const response = await fetch(`${SERVER_URL}/get_location`, {
      method: "POST",
      body: formData
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch medical shop locations!");
    }
    const data = await response.json()
    return data;
  }catch(err){
    console.log(err);
    throw err;
  }
}

async function get_history(token: string){
  try{
    const formData = new FormData()
    formData.append("token", token);
    const response = await fetch(`${SERVER_URL}/history`, {
      method: "POST",
      body: formData
    })
    if(response.status !== 200){
      throw new Error("Failed to fetch history!");
    }
    const data = await response.json()
    return data;
  }catch(err){
    console.log(err);
    throw err;
  }
}

export {get_medicine_names, get_medicine_links, get_location, get_history}